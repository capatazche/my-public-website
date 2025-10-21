import { defineFunction } from '@aws-amplify/backend';

// Define the Lambda function. Environment and permissions are wired from data/resource.ts
// to avoid circular imports during backend synthesis.
export const trackVisitFn = defineFunction({
  name: 'track-visit',
  entry: './handler.ts',
});
