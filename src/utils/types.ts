export type ThemeVariant = 'light' | 'dark' | 'highContrast';

export type ThemeMode = ThemeVariant | 'auto';

export enum HealthEnum {
  UNKNOWN = 'UNKNOWN',
  UP = 'UP',
  DOWN = 'DOWN',
  LATENCY = 'LATENCY',
}

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
    [key in HealthEnum]?: string;
  };
}

export interface RawStatus {
  serviceId: string;
  avgBlocksLatency: number;
  avgTimeLatency: number;
  decision: HealthEnum;
  liveVerifiers: number;
  timestamp: string; // bigint
}

export interface ServiceStatus {
  serviceId: string;
  avgBlocksLatency: number;
  avgTimeLatency: number;
  health: HealthEnum;
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
  [HealthEnum.UP]: number;
  [HealthEnum.LATENCY]: number;
  [HealthEnum.DOWN]: number;
  [HealthEnum.UNKNOWN]: number;
  avgLatencyTime: number;
  avgLatencyBlocks: number;
  worst: HealthEnum;
  lastUpdated: number;
  submittersCount: number;
}
