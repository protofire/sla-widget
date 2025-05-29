import { WidgetControls } from './Controls';
import { WidgetCards } from './Cards';
import { WidgetCopyHandler } from './CopyHandler';
import { WidgetFooter } from './Footer';
import { WidgetSkeleton } from './Skeleton';
import { fetchSubgraphStatuses } from '../utils/fetchSubgraphStatuses';
import { SubgraphStatus } from '../utils/types';
import { WidgetApp } from '.';
import { WidgetTooltip } from './Tooltip';
import { createElement } from '../utils/createElement';

export class WidgetRenderer {
  private app: WidgetApp;
  private controls = new WidgetControls(this);
  private cards: WidgetCards;
  private copyHandler = new WidgetCopyHandler();
  private footer = new WidgetFooter();
  private skeleton = new WidgetSkeleton();
  private tooltip = new WidgetTooltip();
  private latestStatuses: SubgraphStatus[] | null = null;
  private refreshIntervalId: number | null = null;
  private activeIndex = -1;
  private error: string | null = null;
  private articleEl: HTMLElement | null = null;
  private onDataUpdated?: (statuses: SubgraphStatus[]) => void;

  constructor(app: WidgetApp) {
    this.app = app;
    this.cards = new WidgetCards(this.tooltip);
  }

  setOnDataUpdated(callback: (statuses: SubgraphStatus[]) => void) {
    this.onDataUpdated = callback;
  }

  async loadAndRender(root: ShadowRoot) {
    const { subgraphIds, details } = this.app.getOptions();
    if (details !== 'problemsOnly') {
      this.showSkeleton(root, subgraphIds.length);
    }
    await this.updateStatuses(root);
    this.setupAutoRefresh(root);
  }

  async updateStatuses(root: ShadowRoot, silent = false) {
    const { subgraphIds, statusEndpoint, details } = this.app.getOptions();
    try {
      const statuses = await fetchSubgraphStatuses(subgraphIds, statusEndpoint);
      this.latestStatuses =
        details === 'problemsOnly'
          ? statuses.filter((s) => s.health !== 'ok')
          : statuses;
      this.error = null;
      if (!this.latestStatuses?.length && details !== 'problemsOnly') {
        return;
      }
      if (!silent) this.renderContent(root);
      this.onDataUpdated?.(statuses);
    } catch (err) {
      console.error('Failed to load statuses', err);
      this.error = 'Failed to load data';
      this.latestStatuses = [];
      if (!silent) this.renderContent(root);
    }
    this.renderFull(root);
    this.setupAutoRefresh(root);
  }

  private renderFull(root: ShadowRoot) {
    root.innerHTML = '';
    const content = this.renderMainContent();
    root.appendChild(content);
    const { mode } = this.app.getOptions();
    if (mode !== 'simple') {
      this.copyHandler.setup(root);
      this.controls.setup(root);
    }
  }

  renderContent(root: ShadowRoot) {
    if (!this.articleEl) return;
    this.articleEl.innerHTML = '';
    const newArticle = this.renderArticleContent();
    while (newArticle.firstChild) {
      this.articleEl.appendChild(newArticle.firstChild);
    }
    const { mode } = this.app.getOptions();
    if (mode !== 'simple') {
      this.copyHandler.setup(root);
      this.controls.setup(root);
    }
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
    this.articleEl = this.renderArticleContent();
    wrapper.appendChild(this.articleEl);
    return wrapper;
  }

  private buildSummaryMessage(): string {
    const statuses = this.latestStatuses ?? [];
    const { warning, error, unknown } = this.cards.summarize(statuses);
    const messages = this.app.getOptions().customMessages ?? {};
    if (warning > 0 || (warning > error && warning > unknown))
      return messages.warning ?? '';
    if (error > 0 || (error > warning && error > unknown))
      return messages.error ?? '';
    if (unknown > 0 || (unknown > warning && unknown > error))
      return messages.unknown ?? '';
    return '';
  }

  private renderArticleContent(): HTMLElement {
    const { mode } = this.app.getOptions();
    if (mode === 'simple') {
      return createElement('article', {}, [
        createElement('p', {}, this.buildSummaryMessage()),
        this.footer.create(),
      ]);
    }
    const article = document.createElement('article');
    article.className = 'sla-card';
    article.append(
      this.controls.create(this.latestStatuses?.length || 0),
      this.cards.create(this.latestStatuses ?? [], this.activeIndex),
      this.footer.create(),
    );
    this.tooltip.setup(article);
    return article;
  }

  private showSkeleton(root: ShadowRoot, count: number) {
    this.skeleton.render(root, count);
  }

  private setupAutoRefresh(root: ShadowRoot) {
    this.clearAutoRefresh();
    const interval = this.app.getOptions().refreshIntervalMs;
    if (!interval || isNaN(interval)) return;
    this.refreshIntervalId = window.setInterval(() => {
      this.updateStatuses(root, true);
    }, interval);
  }

  private clearAutoRefresh() {
    if (this.refreshIntervalId !== null) {
      clearInterval(this.refreshIntervalId);
      this.refreshIntervalId = null;
    }
  }

  destroy() {
    this.clearAutoRefresh();
    this.latestStatuses = null;
    this.activeIndex = -1;
    this.articleEl = null;
    this.onDataUpdated = undefined;
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
