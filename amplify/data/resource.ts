import {a, type ClientSchema, defineData} from '@aws-amplify/backend';

const schema = a.schema({
    Stats: a
        .model({
            totalVisitors: a.integer(),
            uniqueVisitors: a.integer(),
        })
        .authorization((allow) => [allow.guest(), allow.authenticated()]),

    // This model tracks currently active visitors. Note: TTL is not currently exposed in the @aws-amplify/backend schema typings.
    Visitor: a
        .model({
            visitorId: a.id().required(),
            lastSeen: a.timestamp().required(),
            // Keep an explicit expiration field; cleanup logic can enforce expiry at runtime or via a scheduled job.
            expirationTime: a.timestamp().required(),
        })
        .identifier(['visitorId'])
        // .ttl('expirationTime') // Not available in current typings; leaving field for future support.
        .authorization((allow) => [allow.guest(), allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'identityPool',
        // @ts-expect-error: not yet in published typings
        identityPoolConfig: {
            unauthenticatedAccessAllowed: true,
        },
    },
});
