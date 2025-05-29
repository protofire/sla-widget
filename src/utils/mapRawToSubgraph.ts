import { RawStatus, SubgraphStatus, Health } from './types';

/**
 * Maps a raw API response to a standardized SubgraphStatus object.
 *
 * Converts `syncStatus` number into a `Health` status label:
 *   - 0 → 'ok'
 *   - 1 → 'warning'
 *   - 2 → 'error'
 *   - other → 'unknown'
 *
 * @param raw - RawStatus object from API
 * @returns Formatted SubgraphStatus object
 */
const syncMap: Record<0 | 1 | 2, Health> = {
  0: 'ok',
  1: 'warning',
  2: 'error',
};

export function mapRawToSubgraph(raw: RawStatus): SubgraphStatus {
  return {
    subgraphId: raw.subgraphId,
    subgraphCid: raw.subgraphCid,
    latencyBlocks: raw.latencyBlocks,
    latencyTime: raw.latencyTime,
    health: syncMap[raw.syncStatus] ?? 'unknown',
    lastUpdated: new Date(Number(raw.timestamp) * 1000).getTime(),
    submittersCount: raw.submittersCount,
  };
}
