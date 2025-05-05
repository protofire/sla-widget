import { runWithConcurrencyLimit } from './runWithConcurrencyLimit';
import { mapRawToSubgraph } from './mapRawToSubgraph';
import { RawStatus, SubgraphStatus } from './types';
import { createFailedSubgraphStatus } from './createFailedSubgraphStatus';

/**
 * Fetches the health status of a list of subgraphs from a monitoring endpoint.
 *
 * Each subgraph is queried individually via `${statusEndpoint}/{subgraphId}`.
 * Responses are parsed into SubgraphStatus objects; failures are captured with fallback values.
 * Uses concurrency limit to avoid overwhelming the API.
 *
 * @param statusEndpoint - Base URL of the status API (e.g., https://api.xyz/status)
 * @param subgraphIds - List of subgraph identifiers to check
 * @param concurrencyLimit - Max number of simultaneous requests (default is 5)
 * @returns Promise resolving to an array of SubgraphStatus objects
 */
export async function fetchSubgraphStatuses(
  statusEndpoint: string,
  subgraphIds: string[],
  concurrencyLimit = 5,
): Promise<SubgraphStatus[]> {
  const tasks = subgraphIds.map((id) => async () => {
    try {
      const response = await fetch(`${statusEndpoint}/${id}`);

      if (!response.ok) {
        return createFailedSubgraphStatus(id);
      }

      const rawStatus: RawStatus = await response.json();
      return mapRawToSubgraph(rawStatus);
    } catch {
      return createFailedSubgraphStatus(id);
    }
  });

  const { successes } = await runWithConcurrencyLimit(tasks, concurrencyLimit);

  return successes;
}
