import { RawStatus, ServiceStatus } from './types';

/**
 * Maps a raw API response to a standardized ServiceStatus object.
 *
 * Converts `syncStatus` number into a `Health` status label:
 *   - UP →  - Uptime
 *   - DOWN →  - Downtime
 *   - LATENCY →  - Latency
 *   - UNKNOWN →  - Unknown
 * @param raw - RawStatus object from API
 * @returns Formatted ServiceStatus object
 */

export function mapRawToService(raw: { result: RawStatus }): ServiceStatus {
  return {
    serviceId: raw.result.serviceId,
    avgBlocksLatency: raw.result.avgBlocksLatency,
    avgTimeLatency: raw.result.avgTimeLatency,
    health: raw.result.decision,
    lastUpdated: new Date(Number(raw.result.timestamp) * 1000).getTime(),
    liveVerifiers: raw.result.liveVerifiers,
  };
}
