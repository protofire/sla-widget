import { SubgraphStatus } from './types';

/**
 * Creates a fallback SubgraphStatus object for failed API requests.
 *
 * This is used when a request to fetch subgraph status fails due to timeout,
 * bad response, or network error. It marks the subgraph as `failed: true`
 * and assigns default values (0 latency, unknown health, now as timestamp).
 *
 * @param subgraphId - ID of the subgraph that failed
 * @returns SubgraphStatus object marked as failed
 */
export function createFailedSubgraphStatus(subgraphId: string): SubgraphStatus {
  return {
    subgraphId,
    latencyTime: 0,
    latencyBlocks: 0,
    health: 'unknown',
    lastUpdated: Date.now(),
    failed: true,
  };
}
