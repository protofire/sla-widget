import { createElement } from '../utils/createElement';
import { fmtAgo } from '../utils/fmtAgo';
import { truncate } from '../utils/truncate';
import { fmtLatency } from '../utils/fmtLatency';
import { HealthEnum, ServiceStatus, SummaryData } from '../utils/types';
import { CopyIcon } from '../utils/icons';
import { WidgetTooltip } from './Tooltip';
import { TOOLTIP_TEXT } from '../utils/healthTextTooltip';

export class WidgetCards {
  private tooltip: WidgetTooltip;
  constructor(tooltip: WidgetTooltip) {
    this.tooltip = tooltip;
  }
  create(statuses: ServiceStatus[], activeIndex: number) {
    if (statuses.length === 1) {
      return this.createSingleCard(statuses[0]);
    }
    return activeIndex === -1
      ? this.createSummaryCard(this.summarize(statuses))
      : this.createSingleCard(statuses[activeIndex]);
  }

  private createSingleCard(status: ServiceStatus) {
    return status.failed
      ? this.createFailedCard(status)
      : this.createNormalCard(status);
  }

  private createSummaryCard(summary: SummaryData) {
    if (
      summary[HealthEnum.UP] === 0 &&
      summary[HealthEnum.LATENCY] === 0 &&
      (summary[HealthEnum.DOWN] !== 0 || summary[HealthEnum.UNKNOWN] !== 0)
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

  private createNormalCard(status: ServiceStatus) {
    return createElement('div', { className: 'card' }, [
      this.createHeader(
        status.health,
        'single',
        status.health,
        status.lastUpdated,
      ),
      status.health !== 'UNKNOWN' ? this.createBodyNormal(status) : '',
    ]);
  }

  private createFailedCard(status: ServiceStatus) {
    return createElement('div', { className: 'card card-failed' }, [
      createElement(
        'div',
        { className: 'failed-title' },
        'Subgraph Load Failed',
      ),
      createElement('div', { className: 'card-subgraph' }, [
        `Subgraph: ${truncate(status.serviceId)}`,
        this.createCopyButton(status.serviceId),
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
    health: HealthEnum,
    mode: 'single' | 'summary',
    aria: HealthEnum,
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
    health: HealthEnum,
    mode: 'single' | 'summary',
    summary?: SummaryData,
  ): HTMLElement {
    return mode === 'summary' && summary
      ? TOOLTIP_TEXT[health].summary(summary)
      : TOOLTIP_TEXT[health].single();
  }

  private createParticipantsBlock(count: number, tooltip: string) {
    return createElement('div', { className: 'card-submitters' }, [
      `Consensus Participants:`,
      createElement('span', {}, `${count} `),
      this.tooltip.createTrigger(createElement('div', {}, ` ⓘ`), tooltip),
    ]);
  }

  private createBodySummary(summary: SummaryData) {
    return createElement('div', { className: 'card-body' }, [
      this.createParticipantsBlock(
        summary.submittersCount,
        'Average Number of unique participants who submitted proofs for this round.',
      ),

      createElement(
        'div',
        { className: 'card-latency' },
        `Avg Latency: ${fmtLatency(summary.avgLatencyTime)} | ${summary.avgLatencyBlocks} blocks`,
      ),
      createElement(
        'div',
        { className: 'card-subgraph' },
        `${summary[HealthEnum.UP]} ok, ${summary[HealthEnum.LATENCY]} warning, ${summary[HealthEnum.DOWN]} down${summary[HealthEnum.UNKNOWN] ? `, ${summary[HealthEnum.UNKNOWN]} n/a` : ''}`,
      ),
    ]);
  }

  private createBodyNormal(status: ServiceStatus) {
    return createElement('div', { className: 'card-body' }, [
      this.createParticipantsBlock(
        status.liveVerifiers,
        'Number of unique Participants who submitted proofs for this round.',
      ),

      createElement('div', { className: 'card-subgraph' }, [
        `Subgraph: ${truncate(status.serviceId)}`,
        this.createCopyButton(status.serviceId),
      ]),
      createElement(
        'div',
        { className: 'card-latency' },
        `Latency: ${fmtLatency(status.avgTimeLatency)} | ${status.avgBlocksLatency} blocks behind`,
      ),
    ]);
  }

  summarize(statuses: ServiceStatus[]): SummaryData {
    let up = 0,
      latency = 0,
      down = 0,
      unknown = 0;
    let totalLatencyTime = 0,
      totalLatencyBlocks = 0;
    let worst: HealthEnum = HealthEnum.UP;
    let lastUpdated = 0;
    let submittersCount = 0;

    statuses.forEach((s) => {
      totalLatencyTime += s.avgTimeLatency;
      totalLatencyBlocks += s.avgBlocksLatency;
      submittersCount += s.liveVerifiers;

      if (s.health === HealthEnum.UP) up++;
      else if (s.health === HealthEnum.LATENCY) latency++;
      else if (s.health === HealthEnum.DOWN) down++;
      else unknown++;

      if (this.isWorse(s.health, worst)) worst = s.health;

      if (!s.failed && s.lastUpdated > lastUpdated) {
        lastUpdated = s.lastUpdated;
      }
    });

    return {
      [HealthEnum.UP]: up,
      [HealthEnum.LATENCY]: latency,
      [HealthEnum.DOWN]: down,
      [HealthEnum.UNKNOWN]: unknown,
      avgLatencyTime: Math.round(totalLatencyTime / statuses.length),
      avgLatencyBlocks: Math.round(totalLatencyBlocks / statuses.length),
      worst,
      lastUpdated,
      submittersCount: Math.round(submittersCount / statuses.length),
    };
  }

  private getOverallHealth(summary: SummaryData): HealthEnum {
    const { LATENCY, DOWN, UNKNOWN } = summary;
    if (UNKNOWN > 0) return HealthEnum.UNKNOWN;
    if (DOWN > 0) return HealthEnum.DOWN;
    if (LATENCY > 0) return HealthEnum.LATENCY;
    return HealthEnum.UP;
  }

  private getTitle(health: HealthEnum, mode: 'single' | 'summary') {
    const titles: Record<HealthEnum, { single: string; summary: string }> = {
      [HealthEnum.UP]: {
        single: 'Service is Active',
        summary: 'All Services are Active',
      },
      [HealthEnum.LATENCY]: {
        single: 'Increased Latency',
        summary: 'Some Services - Latency',
      },
      [HealthEnum.DOWN]: {
        single: 'Service is Down',
        summary: 'Some Services - Down',
      },
      [HealthEnum.UNKNOWN]: {
        single: 'Monitoring Unavailable',
        summary: 'Some Services - Down',
      },
    };
    return titles[health][mode];
  }

  private isWorse(a: HealthEnum, b: HealthEnum) {
    const priority: Record<HealthEnum, number> = {
      [HealthEnum.UP]: 3,
      [HealthEnum.LATENCY]: 2,
      [HealthEnum.DOWN]: 1,
      [HealthEnum.UNKNOWN]: 0,
    };
    return priority[a] < priority[b];
  }
}

export const cardsStyles = /* css */ `
  .sla-dismiss {
    cursor: pointer;
    position: absolute;
    top: 8px;
    right: 5px;
    background-color: transparent;
    border: none;
    color: var(--monitor-text);
  }

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
    gap: 20px;
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
