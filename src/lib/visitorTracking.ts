import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

function getOrCreateVisitorId(): string {
  const key = 'visitorId';
  let id = localStorage.getItem(key);
  if (!id) {
    // Simple UUID v4 generator
    id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    localStorage.setItem(key, id);
  }
  return id;
}

export async function initVisitorTracking(): Promise<void> {
  try {
    const visitorId = getOrCreateVisitorId();
    // Fire and forget; no UI dependency
    await client.mutations.trackVisit({ visitorId });
  } catch (e) {
    // Swallow errors to avoid impacting UI; optionally log
    // eslint-disable-next-line no-console
    console.warn('Visitor tracking failed', e);
  }
}
