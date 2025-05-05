import { SubgraphStatus } from './types';

export function createFailedSubgraphStatus(id: string): SubgraphStatus {
  return {
    subgraphId: id,
    latencyTime: 0,
    latencyBlocks: 0,
    health: 'unknown',
    lastUpdated: Date.now(),
    failed: true,
  };
}
