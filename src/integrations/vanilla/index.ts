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

    if (!subgraphIdsAttr || !statusEndpoint) {
      console.error('Missing required attributes');
      return;
    }

    const subgraphIds = subgraphIdsAttr.split(',');
    const refreshIntervalMs = refreshIntervalMsAttr
      ? parseInt(refreshIntervalMsAttr, 10)
      : undefined;

    this.app = new WidgetApp({
      subgraphIds,
      statusEndpoint,
      refreshIntervalMs,
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
