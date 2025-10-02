import { HealthEnum, ServiceStatus } from './types';

/**
 * Creates a fallback SubgraphStatus object for failed API requests.
 *
 * This is used when a request to fetch subgraph status fails due to timeout,
 * bad response, or network error. It marks the subgraph as `failed: true`
 * and assigns default values (0 latency, unknown health, now as timestamp).
 *
 * @param serviceId - ID of the service that failed
 * @returns ServiceStatus object marked as failed
 */
export function createFailedServiceStatus(serviceId: string): ServiceStatus {
  return {
    serviceId,
    avgTimeLatency: 0,
    avgBlocksLatency: 0,
    health: HealthEnum.UNKNOWN,
    lastUpdated: Date.now(),
    failed: true,
    liveVerifiers: 0,
  };
}
