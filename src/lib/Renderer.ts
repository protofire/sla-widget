import { WidgetControls } from './Controls';
import { WidgetCards } from './Cards';
import { WidgetCopyHandler } from './CopyHandler';
import { WidgetFooter } from './Footer';
import { WidgetSkeleton } from './Skeleton';
import { fetchSubgraphStatuses } from '../utils/fetchSubgraphStatuses';
import { SubgraphStatus } from '../utils/types';
import { WidgetApp } from '.';
import { WidgetTooltip } from './Tooltip';

export class WidgetRenderer {
  private app: WidgetApp;
  private controls: WidgetControls;
  private cards: WidgetCards;
  private copyHandler: WidgetCopyHandler;
  private footer: WidgetFooter;
  private skeleton: WidgetSkeleton;
  private tooltip: WidgetTooltip;

  private latestStatuses: SubgraphStatus[] | null = null;
  private refreshIntervalId: number | null = null;
  private activeIndex: number = -1;
  private error: string | null = null;
  private articleEl: HTMLElement | null = null;
  private onDataUpdated?: (statuses: SubgraphStatus[]) => void;

  constructor(app: WidgetApp) {
    this.app = app;
    this.tooltip = new WidgetTooltip();
    this.controls = new WidgetControls(this);
    this.cards = new WidgetCards(this.tooltip);
    this.footer = new WidgetFooter();
    this.copyHandler = new WidgetCopyHandler();
    this.skeleton = new WidgetSkeleton();
  }

  setOnDataUpdated(callback: (statuses: SubgraphStatus[]) => void) {
    this.onDataUpdated = callback;
  }

  async loadAndRender(root: ShadowRoot) {
    const options = this.app.getOptions();
    this.showSkeleton(root, options.subgraphIds.length);

    try {
      const statuses = await fetchSubgraphStatuses(
        options.statusEndpoint,
        options.subgraphIds,
      );
      this.latestStatuses = statuses;
      this.error = null;
      if (this.onDataUpdated) this.onDataUpdated(statuses);
    } catch (err) {
      console.error('Failed to load statuses', err);
      this.error = 'Failed to load data';
      this.latestStatuses = [];
    }

    this.renderFull(root);
    this.setupAutoRefresh(root);
  }

  renderFull(root: ShadowRoot) {
    root.innerHTML = '';
    const content = this.renderMainContent();
    root.appendChild(content);
    this.setupHandlers(root);
  }

  renderContent(root: ShadowRoot) {
    if (!this.articleEl) return;

    this.articleEl.innerHTML = '';

    const controls = this.controls.create(this.latestStatuses?.length || 0);
    const card = this.cards.create(this.latestStatuses ?? [], this.activeIndex);
    const footer = this.footer.create();

    this.articleEl.append(controls, card, footer);
    this.tooltip.setup(this.articleEl);
    this.copyHandler.setup(root);
    this.controls.setup(root);
  }

  private renderMainContent(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'monitor-widget-content';

    if (this.error) {
      wrapper.textContent = 'Error loading data';
      return wrapper;
    }

    if (!this.latestStatuses?.length) {
      wrapper.textContent = 'No data available';
      return wrapper;
    }

    this.articleEl = document.createElement('article');
    this.articleEl.className = 'sla-card';
    this.articleEl.append(
      this.controls.create(this.latestStatuses.length),
      this.cards.create(this.latestStatuses, this.activeIndex),
      this.footer.create(),
    );
    wrapper.appendChild(this.articleEl);
    this.tooltip.setup(wrapper);
    return wrapper;
  }

  private setupHandlers(root: ShadowRoot) {
    this.copyHandler.setup(root);
    this.controls.setup(root);
  }

  showSkeleton(root: ShadowRoot, subgraphIdsLength: number) {
    this.skeleton.render(root, subgraphIdsLength);
  }

  private setupAutoRefresh(root: ShadowRoot) {
    this.clearAutoRefresh();

    const refreshInterval = this.app.getOptions().refreshIntervalMs;
    if (!refreshInterval || isNaN(refreshInterval)) return;

    this.refreshIntervalId = window.setInterval(() => {
      this.refreshStatuses(root);
    }, refreshInterval);
  }

  private async refreshStatuses(root: ShadowRoot) {
    const options = this.app.getOptions();
    try {
      const statuses = await fetchSubgraphStatuses(
        options.statusEndpoint,
        options.subgraphIds,
      );
      this.latestStatuses = statuses;
      this.renderContent(root);
      if (this.onDataUpdated) this.onDataUpdated(statuses);
    } catch (err) {
      console.error('Failed to refresh statuses', err);
    }
  }

  clearAutoRefresh() {
    if (this.refreshIntervalId !== null) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
  }

  setActiveIndex(index: number) {
    this.activeIndex = index;
  }

  getActiveIndex() {
    return this.activeIndex;
  }

  getStatuses() {
    return this.latestStatuses ?? [];
  }

  getApp() {
    return this.app;
  }
}
