import { defineFunction } from '@aws-amplify/backend';
import { data } from '../../data/resource';

// Note on typings:
// The current @aws-amplify/backend typings expose `data` as a ConstructFactory
// that may not include the `resources` property at type-check time, even though
// it exists at deploy-time. To keep strong typing elsewhere without fighting the
// SDK’s evolving types, we localize a minimal `any` cast for resource access.
// This keeps the IDE happy while preserving the intended behavior.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resources = (data as any).resources;

// Define the Lambda function and bind model resources
export const trackVisitFn = defineFunction({
  name: 'track-visit',
  entry: './handler.ts',
  environment: {
    // tableName is resolved at synth/deploy time; see note above
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    VISITOR_TABLE_NAME: resources.Visitor.tableName,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    STATS_TABLE_NAME: resources.Stats.tableName,
  },
});

// Grant the function permissions to read/write both tables
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
resources.Visitor.grantReadWrite(trackVisitFn);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
resources.Stats.grantReadWrite(trackVisitFn);
