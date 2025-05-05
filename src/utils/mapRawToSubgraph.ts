import { RawStatus, SubgraphStatus, Health } from './types';

export function mapRawToSubgraph(raw: RawStatus): SubgraphStatus {
  let health: Health = 'unknown';

  if (raw.syncStatus === 0) health = 'ok';
  else if (raw.syncStatus === 1) health = 'warning';
  else if (raw.syncStatus === 2) health = 'error';

  return {
    subgraphId: raw.subgraphId,
    latencyBlocks: raw.latencyBlocks,
    latencyTime: raw.latencyTime,
    health,
    lastUpdated: raw.timestamp,
  };
}
