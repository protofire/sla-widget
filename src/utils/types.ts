export type ThemeVariant = 'light' | 'dark' | 'highContrast';

export type ThemeMode = ThemeVariant | 'auto';

export type Health = 'ok' | 'warning' | 'error' | 'unknown';

export type Position = 'banner' | 'embedded';
export type Details = 'full' | 'problemsOnly';
export type Mode = 'dev' | 'simple';

export interface WidgetAppOptions {
  subgraphIds: string[];
  statusEndpoint?: string;
  refreshIntervalMs?: number;
  theme?: ThemeMode;
  position?: Position;
  details?: Details;
  mode?: Mode;
  customMessages?: {
    [key in Health]?: string;
  };
}

export interface RawStatus {
  indexer: string;
  timestamp: string; // bigint
  subgraphId: string;
  latencyBlocks: number;
  latencyTime: number;
  syncStatus: 0 | 1 | 2;
  submittersCount: number;
}

export interface SubgraphStatus {
  subgraphId: string;
  latencyBlocks: number;
  latencyTime: number;
  health: Health;
  lastUpdated: number;
  failed?: boolean;
  submittersCount: number;
}

export interface ElementProps {
  className?: string;
  id?: string;
  [key: string]: any;
}

export interface SummaryData {
  ok: number;
  warning: number;
  error: number;
  unknown: number;
  avgLatencyTime: number;
  avgLatencyBlocks: number;
  worst: Health;
  lastUpdated: number;
  submittersCount: number;
}
