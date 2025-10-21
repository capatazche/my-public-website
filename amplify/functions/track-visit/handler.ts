import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const VISITOR_TABLE_NAME = process.env.VISITOR_TABLE_NAME as string;
const STATS_TABLE_NAME = process.env.STATS_TABLE_NAME as string;

// 30 days in seconds
const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60;

interface EventArguments {
  visitorId: string;
}

interface HandlerEvent {
  arguments: EventArguments;
}

export const handler = async (event: HandlerEvent) => {
  const now = new Date();
  const nowIso = now.toISOString();
  const expiration = new Date(now.getTime() + THIRTY_DAYS_SECONDS * 1000).toISOString();

  const visitorId = event.arguments?.visitorId;
  if (!visitorId) {
    throw new Error('visitorId is required');
  }

  let isNew = false;

  // 1) Check if visitor exists
  const existing = await ddb.send(
    new GetCommand({
      TableName: VISITOR_TABLE_NAME,
      Key: { visitorId },
    })
  );

  if (!existing.Item) {
    // 2a) Create visitor (idempotent with condition)
    try {
      await ddb.send(
        new PutCommand({
          TableName: VISITOR_TABLE_NAME,
          Item: {
            visitorId,
            lastSeen: nowIso,
            expirationTime: expiration,
          },
          ConditionExpression: 'attribute_not_exists(visitorId)',
        })
      );
      isNew = true;
    } catch (err) {
      // If condition fails concurrently, treat as existing afterwards
    }
  } else {
    // 2b) Update lastSeen and extend expiration
    await ddb.send(
      new UpdateCommand({
        TableName: VISITOR_TABLE_NAME,
        Key: { visitorId },
        UpdateExpression: 'SET lastSeen = :ls, expirationTime = :exp',
        ExpressionAttributeValues: {
          ':ls': nowIso,
          ':exp': expiration,
        },
      })
    );
  }

  // 3) Update stats: increment totalVisitors always, uniqueVisitors only if new
  // Ensure a singleton stats item exists (we'll use a fixed primary key)
  const statsPk = 'global';

  // Initialize stats row if it doesn't exist
  try {
    await ddb.send(
      new PutCommand({
        TableName: STATS_TABLE_NAME,
        Item: {
          id: statsPk,
          totalVisitors: 0,
          uniqueVisitors: 0,
        },
        ConditionExpression: 'attribute_not_exists(id)'
      })
    );
  } catch {
    // already exists
  }

  const updateExpr = isNew
    ? 'ADD totalVisitors :one, uniqueVisitors :one'
    : 'ADD totalVisitors :one';

  await ddb.send(
    new UpdateCommand({
      TableName: STATS_TABLE_NAME,
      Key: { id: statsPk },
      UpdateExpression: updateExpr,
      ExpressionAttributeValues: { ':one': 1 },
      ReturnValues: 'ALL_NEW',
    })
  );

  // Read the latest stats to return
  const stats = await ddb.send(
    new GetCommand({ TableName: STATS_TABLE_NAME, Key: { id: statsPk } })
  );

  return {
    isNew,
    totalVisitors: stats.Item?.totalVisitors ?? 0,
    uniqueVisitors: stats.Item?.uniqueVisitors ?? 0,
    lastSeen: nowIso,
  };
};
