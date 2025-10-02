import { runWithConcurrencyLimit } from './runWithConcurrencyLimit';

import { RawStatus, ServiceStatus } from './types';

import { STATUS_API_URL } from './constants';
import { createFailedServiceStatus } from './createFailedServiseStatus';
import { mapRawToService } from './mapRawToService';

/**
 * Fetches the health status of a list of subgraphs from a monitoring endpoint.
 *
 * Each subgraph is queried individually via `${statusEndpoint}/{subgraphId}`.
 * Responses are parsed into SubgraphStatus objects; failures are captured with fallback values.
 * Uses concurrency limit to avoid overwhelming the API.
 *
 * @param statusEndpoint - Base URL of the status API (e.g., https://api.xyz/status)
 * @param serviceIds - List of service identifiers to check
 * @param concurrencyLimit - Max number of simultaneous requests (default is 5)
 * @returns Promise resolving to an array of ServiceStatus objects
 */
export async function fetchServiceStatuses(
  serviceIds: string[],
  statusEndpoint = STATUS_API_URL,
  concurrencyLimit = 5,
): Promise<ServiceStatus[]> {
  const tasks = serviceIds.map((id) => async () => {
    try {
      const response = await fetch(`${statusEndpoint}/${id}`);

      if (!response.ok) {
        return createFailedServiceStatus(id);
      }

      const rawStatus: { result: RawStatus } = await response.json();

      return mapRawToService(rawStatus);
    } catch {
      return createFailedServiceStatus(id);
    }
  });

  const { successes } = await runWithConcurrencyLimit(tasks, concurrencyLimit);

  return successes;
}
