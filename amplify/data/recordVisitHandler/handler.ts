import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocumentClient, GetCommand, TransactWriteCommand,} from '@aws-sdk/lib-dynamodb';

// Define the arguments we expect, typed from our schema
type HandlerEvent = {
    arguments: {
        visitorId: string;
    };
};

// Use a static, known ID for the single row in our Stats table
const STATS_ID = 'GLOBAL_STATS';

// 1. Get table names from environment variables
const { STATS_TABLE_NAME, VISITOR_TABLE_NAME } = process.env;

if (!STATS_TABLE_NAME || !VISITOR_TABLE_NAME) {
    throw new Error('Table name environment variables are not set.');
}

// 2. Create the DynamoDB Document Client
// This is the modern, recommended way (AWS SDK v3)
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// 3. Define the handler function
export const handler = async (event: HandlerEvent): Promise<string> => {
    try {
        const { visitorId } = event.arguments;
        if (!visitorId) {
            throw new Error('visitorId is required');
        }

        console.log(`Processing visit for visitorId: ${visitorId}`);

        // 4. Check if this is a new visitor
        let isNewVisitor = false;
        try {
            const getCommand = new GetCommand({
                TableName: VISITOR_TABLE_NAME,
                Key: { visitorId },
            });
            const response = await docClient.send(getCommand);

            if (!response.Item) {
                isNewVisitor = true;
                console.log(`New unique visitor detected: ${visitorId}`);
            }
        } catch (e) {
            console.error('Error checking visitor:', e);
            throw e;
        }

        // 5. Prepare data for the updates
        const now = new Date();
        const nowIso = now.toISOString();
        // Set expiration 30 days from now (store as ISO string to match schema timestamp type)
        const expirationIso = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString();

        // 6. Build the atomic transaction
        const addExpressions: string[] = ['totalVisitors :inc'];
        if (isNewVisitor) {
            // Only increment uniqueVisitors if this is their first visit
            addExpressions.push('uniqueVisitors :inc');
        }
        const updateExpression = `ADD ${addExpressions.join(', ')} SET #typename = :typename`;

        const expressionValues: Record<string, any> = {
            ':inc': 1,
            ':typename': 'Stats'
        };
        const expressionNames = {
            '#typename': '__typename'
        };

        const transaction = new TransactWriteCommand({
            TransactItems: [
                {
                    // Transaction Item 1: Create or Update the Visitor item
                    Put: {
                        TableName: VISITOR_TABLE_NAME,
                        Item: {
                            visitorId: visitorId,
                            lastSeen: nowIso,
                            expirationTime: expirationIso,
                            __typename: 'Visitor', // Manually set the type for AppSync
                        },
                    },
                },
                {
                    // Transaction Item 2: Update the Stats item atomically
                    Update: {
                        TableName: STATS_TABLE_NAME,
                        Key: {
                            id: STATS_ID, // Update our single, global row
                        },
                        UpdateExpression: updateExpression,
                        ExpressionAttributeValues: expressionValues,
                        ExpressionAttributeNames: expressionNames,
                    },
                },
            ],
        });

        // 7. Execute the transaction
        try {
            await docClient.send(transaction);
            console.log('Transaction successful.');
            return 'Visit recorded successfully';
        } catch (e) {
            console.error(`Transaction failed: ${e}`);
            // Handle potential transaction conflicts
            if ((e as Error).name === 'TransactionCanceledException') {
                console.warn('Transaction was cancelled, possibly due to a conflict.');
            }
            throw e;
        }
    } catch (e) {
        console.error(`An unexpected error occurred: ${e}`);
        throw new Error(`Failed to record visit: ${(e as Error).message}`);
    }
};
