import { createElement } from '../utils/createElement';
import { fmtAgo } from '../utils/fmtAgo';
import { truncate } from '../utils/truncate';
import { fmtLatency } from '../utils/fmtLatency';
import { Health, SubgraphStatus, SummaryData } from '../utils/types';
import { CopyIcon } from '../utils/icons';
import { WidgetTooltip } from './Tooltip';

export class WidgetCards {
  private tooltip: WidgetTooltip;
  constructor(tooltip: WidgetTooltip) {
    this.tooltip = tooltip;
  }
  create(statuses: SubgraphStatus[], activeIndex: number) {
    if (statuses.length === 1) {
      return this.createSingleCard(statuses[0]);
    }
    return activeIndex === -1
      ? this.createSummaryCard(this.summarize(statuses))
      : this.createSingleCard(statuses[activeIndex]);
  }

  private createSingleCard(status: SubgraphStatus) {
    return status.failed
      ? this.createFailedCard(status)
      : this.createNormalCard(status);
  }

  private createSummaryCard(summary: SummaryData) {
    if (
      summary.ok === 0 &&
      summary.warning === 0 &&
      (summary.error !== 0 || summary.unknown !== 0)
    ) {
      return createElement(
        'h2',
        {},
        'Monitoring Unavailable or all subgraphs are down',
      );
    }

    return createElement('div', { className: 'card' }, [
      this.createHeader(
        this.getOverallHealth(summary),
        'summary',
        summary.worst,
        summary.lastUpdated,
        summary,
      ),
      this.createBodySummary(summary),
    ]);
  }

  private createNormalCard(status: SubgraphStatus) {
    return createElement('div', { className: 'card' }, [
      this.createHeader(
        status.health,
        'single',
        status.health,
        status.lastUpdated,
      ),
      status.health !== 'unknown' ? this.createBodyNormal(status) : '',
    ]);
  }

  private createFailedCard(status: SubgraphStatus) {
    return createElement('div', { className: 'card card-failed' }, [
      createElement(
        'div',
        { className: 'failed-title' },
        'Subgraph Load Failed',
      ),
      createElement('div', { className: 'card-subgraph' }, [
        `Subgraph: ${truncate(status.subgraphId)}`,
        this.createCopyButton(status.subgraphId),
      ]),
      createElement(
        'div',
        { className: 'failed-timestamp' },
        `Attempted: ${fmtAgo(status.lastUpdated)}`,
      ),
    ]);
  }

  private createCopyButton(cid: string) {
    return createElement(
      'button',
      {
        className: 'card-copy',
        'aria-label': 'Copy subgraph CID',
        'data-cid': cid,
      },
      CopyIcon(),
    );
  }

  private createHeader(
    health: Health,
    mode: 'single' | 'summary',
    aria: Health,
    lastUpdated: number,
    summary?: SummaryData,
  ) {
    return createElement('header', { className: 'card-header' }, [
      createElement('h2', {}, this.getTitle(health, mode)),
      createElement('div', { className: 'card-status', 'aria-label': aria }, [
        this.tooltip.createTrigger(
          createElement('span', { className: `status-dot ${health}` }),
          this.statusTooltipText(health, mode, summary),
        ),
        this.tooltip.createTrigger(
          createElement(
            'span',
            { className: 'status-updated' },
            fmtAgo(lastUpdated),
          ),
          'Timestamp of the last successful health check',
        ),
      ]),
    ]);
  }

  private statusTooltipText(
    health: Health,
    mode: 'single' | 'summary',
    summary?: SummaryData,
  ): HTMLElement {
    const total =
      summary && summary.ok + summary.warning + summary.error + summary.unknown;

    const tooltips: Record<
      Health,
      { single: HTMLElement; summary: HTMLElement }
    > = {
      ok: {
        single: createElement('div', {}, [
          createElement('strong', {}, '✅ OK:'),
          'Everything is running smoothly.',
        ]),
        summary: createElement('div', {}, [
          createElement('strong', {}, '✅ OK:'),
          `All ${summary && summary.ok} subgraphs are active.`,
        ]),
      },
      warning: {
        single: createElement('div', {}, [
          createElement('strong', {}, '⚠️ Warning:'),
          'Increased latency detected.',
        ]),
        summary: createElement('div', {}, [
          createElement('strong', {}, '⚠️ Warning:'),
          `${summary ? summary.warning + ' of ' + total : 'Some '} subgraphs have latency.`,
        ]),
      },
      error: {
        single: createElement('div', {}, [
          createElement('strong', {}, '❌ Error:'),
          'Subgraph is down.',
        ]),
        summary: createElement('div', {}, [
          createElement('strong', {}, '⚠️'),

          `${summary ? summary.error + ' of ' + total : 'Some '} subgraphs are down.`,
        ]),
      },
      unknown: {
        single: createElement('div', {}, [
          createElement('strong', {}, '❓ Unknown:'),
          'Health status is unavailable.',
        ]),
        summary: createElement('div', {}, [
          createElement('strong', {}, '❓'),
          `${summary ? summary.unknown + ' of ' + total : 'Some '} subgraphs are unavailable.`,
        ]),
      },
    };
    return tooltips[health][mode];
  }

  private createBodySummary(summary: SummaryData) {
    return createElement('div', { className: 'card-body' }, [
      createElement('div', { className: 'card-submitters' }, [
        `Consensus Participants:`,
        createElement('span', {}, `${summary.submittersCount} `),
        this.tooltip.createTrigger(
          createElement('div', {}, ` ⓘ`),

          'Average Number of unique participants who submitted proofs for this round.',
        ),
      ]),

      createElement(
        'div',
        { className: 'card-latency' },
        `Avg Latency: ${fmtLatency(summary.avgLatencyTime)} | ${summary.avgLatencyBlocks} blocks`,
      ),
      createElement(
        'div',
        { className: 'card-subgraph' },
        `${summary.ok} ok, ${summary.warning} warning, ${summary.error} down${summary.unknown ? `, ${summary.unknown} n/a` : ''}`,
      ),
    ]);
  }

  private createBodyNormal(status: SubgraphStatus) {
    return createElement('div', { className: 'card-body' }, [
      createElement('div', { className: 'card-submitters' }, [
        `Consensus Participants:`,
        createElement('span', {}, `${status.submittersCount} `),

        this.tooltip.createTrigger(
          createElement('div', {}, ` ⓘ`),

          'Number of unique Participants who submitted proofs for this round.',
        ),
      ]),

      createElement('div', { className: 'card-subgraph' }, [
        `Subgraph: ${truncate(status.subgraphId)}`,
        this.createCopyButton(status.subgraphId),
      ]),
      createElement(
        'div',
        { className: 'card-latency' },
        `Latency: ${fmtLatency(status.latencyTime)} | ${status.latencyBlocks} blocks behind`,
      ),
    ]);
  }

  private summarize(statuses: SubgraphStatus[]): SummaryData {
    let ok = 0,
      warning = 0,
      error = 0,
      unknown = 0;
    let totalLatencyTime = 0,
      totalLatencyBlocks = 0;
    let worst: Health = 'ok';
    let lastUpdated = 0;
    let submittersCount = 0;

    statuses.forEach((s) => {
      totalLatencyTime += s.latencyTime;
      totalLatencyBlocks += s.latencyBlocks;
      submittersCount += s.submittersCount || 0;

      if (s.health === 'ok') ok++;
      else if (s.health === 'warning') warning++;
      else if (s.health === 'error') error++;
      else unknown++;

      if (this.isWorse(s.health, worst)) worst = s.health;

      if (!s.failed && s.lastUpdated > lastUpdated) {
        lastUpdated = s.lastUpdated;
      }
    });

    return {
      ok,
      warning,
      error,
      unknown,
      avgLatencyTime: Math.round(totalLatencyTime / statuses.length),
      avgLatencyBlocks: Math.round(totalLatencyBlocks / statuses.length),
      worst,
      lastUpdated,
      submittersCount: Math.round(submittersCount / statuses.length),
    };
  }

  private getOverallHealth(summary: SummaryData): Health {
    const { warning, error, unknown } = summary;
    if (unknown > 0) return 'unknown';
    if (error > 0) return 'error';
    if (warning > 0) return 'warning';
    return 'ok';
  }

  private getTitle(health: Health, mode: 'single' | 'summary') {
    const titles: Record<Health, { single: string; summary: string }> = {
      ok: { single: 'Service is Active', summary: 'All subgraphs are Active' },
      warning: {
        single: 'Increased Latency',
        summary: 'Some subgraphs - Latency',
      },
      error: { single: 'Service is Down', summary: 'Some subgraphs - Down' },
      unknown: {
        single: 'Monitoring Unavailable',
        summary: 'Some subgraphs - Down',
      },
    };
    return titles[health][mode];
  }

  private isWorse(a: Health, b: Health) {
    const priority: Record<Health, number> = {
      ok: 3,
      warning: 2,
      error: 1,
      unknown: 0,
    };
    return priority[a] < priority[b];
  }
}

export const cardsStyles = /* css */ `
  .card-failed {
    color: var(--monitor-error-color);
    font-size: var(--monitor-font-size);
  }

  .failed-title {
    font-weight: bold;
    font-size: 16px;
    margin: 0;
    margin-bottom: 6px;
  }

  .failed-timestamp {
    font-size: 12px;
    opacity: 0.7;
  }

  .card {
    min-height: 68px;
    text-align: left;
    background: var(--monitor-background);
    margin-bottom: 8px;
    transition:
      background 0.3s,
      color 0.3s;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .card-header h2 {
    font-size: 20px;
    max-width: 262px;
    margin: 0;
  }

  .card-status {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .status-updated {
    font-size: var(--monitor-font-size);
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--monitor-unknown-color);
  }

  .status-dot.ok {
    background: var(--monitor-primary-color);
  }

  .status-dot.warning {
    background: var(--monitor-warning-color);
  }

  .status-dot.error {
    background: var(--monitor-error-color);
  }

  .status-dot.unknown {
    background: var(--monitor-unknown-color);
  }

  .card-body {
    font-size: var(--monitor-font-size);
  }

  .card-submitters {
    display: flex;
    gap: 4px;
    margin-bottom: 2px;
  }

  .card-submitters span {
    font-weight: bold;
  }

  .card-subgraph {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2px;
  }

  .card-latency {
    margin-bottom: 2px;
  }

  .card-copy {
    background: transparent;
    border: none;
    color: var(--monitor-text);
    cursor: pointer;
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.2s,
      opacity 0.2s;
  }

  .card-copy svg {
    width: 16px;
    height: 16px;
    transition:
      transform 0.2s,
      opacity 0.2s;
  }

  .card-copy:hover {
    transform: scale(1.2);
  }

  .card-copy.copied svg {
    transform: scale(1.3);
    opacity: 0.7;
  }

  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(2px);
    }
    75% {
      transform: translateX(-2px);
    }
    100% {
      transform: translateX(0);
    }
  }

  .card-copy.copied {
    animation: shake 0.4s;
  }
`;
