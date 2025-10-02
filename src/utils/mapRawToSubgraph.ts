import { RawStatus, SubgraphStatus, Health, Decision } from './types';

/**
 * Maps a raw API response to a standardized SubgraphStatus object.
 *
 * Converts `syncStatus` number into a `Health` status label:
 *   - UP → 'ok' - Uptime
 *   - DOWN → 'error' - Downtime
 *   - LATENCY → 'warning' - Latency
 *   - UNKNOWN → 'unknown'
 * @param raw - RawStatus object from API
 * @returns Formatted SubgraphStatus object
 */
const syncMap: Record<Decision, Health> = {
  UP: 'ok',
  DOWN: 'error',
  LATENCY: 'warning',
  UNKNOWN: 'unknown',
};

export function mapRawToSubgraph(raw: RawStatus): SubgraphStatus {
  return {
    serviceId: raw.serviceId,
    avgBlocksLatency: raw.avgBlocksLatency,
    avgTimeLatency: raw.avgTimeLatency,
    health: syncMap[raw.decision],
    lastUpdated: new Date(Number(raw.timestamp) * 1000).getTime(),
    liveVerifiers: raw.liveVerifiers,
  };
}
