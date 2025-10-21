import os
import boto3
import datetime
from botocore.exceptions import ClientError
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Use a static, known ID for the single row in our Stats table
STATS_ID = 'GLOBAL_STATS'

dynamodb = boto3.resource('dynamodb')

# Get table names from environment variables set by Amplify
try:
    STATS_TABLE_NAME = os.environ['AMPLIFY_DATA_STATS_TABLE_NAME']
    VISITOR_TABLE_NAME = os.environ['AMPLIFY_DATA_VISITOR_TABLE_NAME']
except KeyError:
    logger.error("Failed to get table names from environment variables.")
    raise

def handler(event, context):
    """
    Handles the 'recordVisit' mutation.
    Updates visitor lastSeen time and increments stats atomically.
    """
    try:
        visitor_id = event['arguments']['visitorId']
        if not visitor_id:
            raise ValueError("visitorId is required")

        logger.info(f"Processing visit for visitorId: {visitor_id}")

        visitor_table = dynamodb.Table(VISITOR_TABLE_NAME)

        # 1. Check if this is a new visitor
        is_new_visitor = False
        try:
            response = visitor_table.get_item(Key={'visitorId': visitor_id})
            if 'Item' not in response:
                is_new_visitor = True
                logger.info(f"New unique visitor detected: {visitor_id}")
        except ClientError as e:
            logger.error(f"Error checking visitor: {e.response['Error']['Message']}")
            raise

        # 2. Prepare data for the updates
        now = datetime.datetime.now(datetime.timezone.utc)
        now_iso = now.isoformat()
        # Set expiration 30 days from now
        expiration_timestamp = int((now + datetime.timedelta(days=30)).timestamp())

        # 3. Build an atomic transaction
        # This ensures BOTH updates succeed or BOTH fail together.
        # Transaction Item 1: Create or Update the Visitor item
        # We use PutItem as it creates or completely replaces the item.
        transact_items = [{
            'Put': {
                'TableName': VISITOR_TABLE_NAME,
                'Item': {
                    'visitorId': visitor_id,
                    'lastSeen': now_iso,
                    'expirationTime': expiration_timestamp,
                    '__typename': 'Visitor'  # Manually set the type for AppSync
                }
            }
        }]

        # Transaction Item 1: Create or Update the Visitor item
        # We use PutItem as it creates or completely replaces the item.

        # Transaction Item 2: Update the Stats item atomically
        # This will create the stats row if it doesn't exist.
        update_expression = 'ADD totalVisitors :inc SET __typename = :typename'
        expression_values = {
            ':inc': 1,
            ':typename': 'Stats'
        }

        if is_new_visitor:
            # Only increment uniqueVisitors if this is their first visit
            update_expression += ', uniqueVisitors :inc'

        transact_items.append({
            'Update': {
                'TableName': STATS_TABLE_NAME,
                'Key': {
                    'statsId': STATS_ID # Update our single, global row
                },
                'UpdateExpression': update_expression,
                'ExpressionAttributeValues': expression_values
            }
        })

        # 4. Execute the transaction
        try:
            boto3.client('dynamodb').transact_write_items(
                TransactItems=transact_items
            )
            logger.info("Transaction successful.")
            return "Visit recorded successfully"

        except ClientError as e:
            logger.error(f"Transaction failed: {e.response['Error']['Message']}")
            # Handle potential transaction conflicts, e.g., if stats are updated simultaneously
            if e.response['Error']['Code'] == 'TransactionCanceledException':
                logger.warning("Transaction was cancelled, possibly due to a conflict.")
                # Could retry here, but for a simple visitor counter, failing silently might be acceptable.
            raise

    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        raise Exception(f"Failed to record visit: {str(e)}")
