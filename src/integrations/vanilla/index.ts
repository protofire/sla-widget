import { ThemeMode } from 'src/utils/types';
import { WidgetApp } from '../../lib';

class MonitorWidgetElement extends HTMLElement {
  private app: WidgetApp | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    const subgraphIdsAttr = this.getAttribute('subgraph-ids');
    const statusEndpoint = this.getAttribute('status-endpoint');
    const refreshIntervalMsAttr = this.getAttribute('refresh-interval-ms');
    const themeAttr = this.getAttribute('theme');

    if (!subgraphIdsAttr || !statusEndpoint) {
      console.error('Missing required attributes');
      return;
    }

    const subgraphIds = subgraphIdsAttr.split(',');
    const refreshIntervalMs = refreshIntervalMsAttr
      ? parseInt(refreshIntervalMsAttr, 10)
      : undefined;

    const theme = (themeAttr as ThemeMode) || 'auto';

    this.app = new WidgetApp({
      subgraphIds,
      statusEndpoint,
      refreshIntervalMs,
      theme,
    });

    this.app.render(this);
  }

  disconnectedCallback() {
    this.app?.destroy();
  }
}

if (!customElements.get('monitor-widget')) {
  customElements.define('monitor-widget', MonitorWidgetElement);
}

if (typeof window !== 'undefined') {
  (window as any).MonitorWidget = { WidgetApp };
}
