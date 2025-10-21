import {a, type ClientSchema, defineData} from '@aws-amplify/backend';
import { trackVisitFn } from '../functions/track-visit/resource';

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

    // Custom mutation to track a visit and update stats atomically via a Lambda resolver
    trackVisit: a
        .mutation()
        .arguments({
            visitorId: a.id().required(),
        })
        .returns(
            a.customType({
                isNew: a.boolean(),
                totalVisitors: a.integer(),
                uniqueVisitors: a.integer(),
                lastSeen: a.timestamp(),
            })
        )
        .authorization((allow) => [allow.guest(), allow.authenticated()])
        .handler(a.handler.function(trackVisitFn)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'identityPool',
    },
});

// Post-definition wiring to avoid circular imports at synth time.
// The `resources` bag exists at deploy-time but isn't fully typed; cast to any locally.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resources = (data as any).resources;

// Grant the function permissions to read/write both tables
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
resources.Visitor.grantReadWrite(trackVisitFn);
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
resources.Stats.grantReadWrite(trackVisitFn);
