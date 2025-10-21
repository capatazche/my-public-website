import {useEffect, useState} from 'react';
import {generateClient} from 'aws-amplify/data';
import type {Schema} from '../../amplify/data/resource';

// 1. Define a key for localStorage
const VISITOR_ID_KEY = 'bernardos_website_visitor_id';

/**
 * A custom hook to track unique visitors.
 * - Runs once on component mount.
 * - Gets/sets a unique ID in localStorage.
 * - Calls the 'recordVisit' mutation to log the visit.
 */
export const useVisitorTracking = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Define the async function to perform the tracking
        const trackVisitor = async () => {
            try {
                // 1. Get or create the visitor ID
                let visitorId = localStorage.getItem(VISITOR_ID_KEY);
                if (!visitorId) {
                    visitorId = crypto.randomUUID();
                    localStorage.setItem(VISITOR_ID_KEY, visitorId);
                }

                // 2. Create the client after Amplify has been configured (main.tsx)
                const client = generateClient<Schema>();

                // 3. Call our mutation
                const { data, errors } = await client.mutations.recordVisit({
                    visitorId,
                });

                if (errors) {
                    console.error('Error recording visit:', errors);
                    throw errors[0]; // Throw the first error
                }

                console.log('Visit recorded:', data);

            } catch (e) {
                console.error('Failed to track visitor:', e);
                setError(e as Error);
            } finally {
                setIsLoading(false);
            }
        };

        // 4. Call the tracking function
        trackVisitor();

    }, []);

    return { isLoading, error };
};
