import { createElement } from './createElement';
import { SummaryData } from './types';

export const TOOLTIP_TEXT = {
  ok: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '✅ OK:'),
        'Everything is running smoothly.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '✅ OK:'),
        `All ${s.ok} subgraphs are active.`,
      ]),
  },
  warning: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '⚠️ Warning:'),
        'Increased latency detected.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '⚠️ Warning:'),
        `${s.warning} of ${s.ok + s.warning + s.error + s.unknown} subgraphs have latency.`,
      ]),
  },
  error: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '❌ Error:'),
        'Subgraph is down.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '⚠️'),
        `${s.error} of ${s.ok + s.warning + s.error + s.unknown} subgraphs are down.`,
      ]),
  },
  unknown: {
    single: () =>
      createElement('div', {}, [
        createElement('strong', {}, '❓ Unknown:'),
        'Health status is unavailable.',
      ]),
    summary: (s: SummaryData) =>
      createElement('div', {}, [
        createElement('strong', {}, '❓'),
        `${s.unknown} of ${s.ok + s.warning + s.error + s.unknown} subgraphs are unavailable.`,
      ]),
  },
};
