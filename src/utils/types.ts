export type ThemeVariant = 'light' | 'dark' | 'highContrast';

export type ThemeMode = ThemeVariant | 'auto';

export type Health = 'ok' | 'warning' | 'error' | 'unknown';
export type Decision = 'UNKNOWN' | 'UP' | 'DOWN' | 'LATENCY';

export type Position = 'banner' | 'embedded';
export type Details = 'full' | 'problemsOnly';
export type Mode = 'dev' | 'simple';
export type Pinned = 'fixed' | 'slide';

export interface WidgetAppOptions {
  serviceIds: string[];
  statusEndpoint?: string;
  refreshIntervalMs?: number;
  theme?: ThemeMode;
  position?: Position;
  details?: Details;
  mode?: Mode;
  pinned?: Pinned;
  customMessages?: {
    [key in Health]?: string;
  };
}

export interface RawStatus {
  serviceId: string;
  avgBlocksLatency: number;
  avgTimeLatency: number;
  decision: Decision;
  liveVerifiers: number;
  timestamp: string; // bigint
}

export interface SubgraphStatus {
  serviceId: string;
  avgBlocksLatency: number;
  avgTimeLatency: number;
  health: Health;
  lastUpdated: number;
  failed?: boolean;
  liveVerifiers: number;
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
