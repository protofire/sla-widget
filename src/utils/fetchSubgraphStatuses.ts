import { runWithConcurrencyLimit } from './runWithConcurrencyLimit';
import { mapRawToSubgraph } from './mapRawToSubgraph';
import { RawStatus, SubgraphStatus } from './types';
import { createFailedSubgraphStatus } from './createFailedSubgraphStatus';

export async function fetchSubgraphStatuses(
  statusEndpoint: string,
  subgraphIds: string[],
  concurrencyLimit = 5,
): Promise<SubgraphStatus[]> {
  const tasks = subgraphIds.map((id) => async () => {
    try {
      const response = await fetch(`${statusEndpoint}/${id}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const rawStatus: RawStatus = await response.json();
      return mapRawToSubgraph(rawStatus);
    } catch (error) {
      console.error(`Failed to fetch status for ${id}`, error);

      return createFailedSubgraphStatus(id);
    }
  });

  const { successes } = await runWithConcurrencyLimit(tasks, concurrencyLimit);

  return successes;
}
