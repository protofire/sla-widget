import { createElement } from './createElement';
import { HealthEnum, SummaryData } from './types';

export const TOOLTIP_TEXT = {
  UP: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '✅ OK:'),
        'Everything is running smoothly.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '✅ OK:'),
        `All ${s[HealthEnum.UP]} subgraphs are active.`,
      ]),
  },
  LATENCY: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '⚠️ Warning:'),
        'Increased latency detected.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '⚠️ Warning:'),
        `${s[HealthEnum.LATENCY]} of ${s[HealthEnum.UP] + s[HealthEnum.LATENCY] + s[HealthEnum.DOWN] + s[HealthEnum.UNKNOWN]} subgraphs have latency.`,
      ]),
  },
  DOWN: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '❌ Error:'),
        'Subgraph is down.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '⚠️'),
        `${s[HealthEnum.DOWN]} of ${s[HealthEnum.UP] + s[HealthEnum.LATENCY] + s[HealthEnum.DOWN] + s[HealthEnum.UNKNOWN]} subgraphs are down.`,
      ]),
  },
  UNKNOWN: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '❓ Unknown:'),
        'Health status is unavailable.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '❓'),
        `${s[HealthEnum.UNKNOWN]} of ${s[HealthEnum.UP] + s[HealthEnum.LATENCY] + s[HealthEnum.DOWN] + s[HealthEnum.UNKNOWN]} subgraphs are unavailable.`,
      ]),
  },
};
