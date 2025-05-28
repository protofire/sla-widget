import { ThemeMode, Position, Details, Mode, Health } from '../../utils/types';

import { WidgetApp } from '../../lib';

class MonitorWidgetElement extends HTMLElement {
  private app: WidgetApp | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    const rawIds = this.getAttribute('subgraph-ids');
    const statusEndpoint = this.getAttribute('status-endpoint') ?? '';
    const refreshIntervalMs = this.num(
      this.getAttribute('refresh-interval-ms'),
    );
    const theme = this.getAttribute('theme') as ThemeMode;
    const position = this.getAttribute('position') as Position;
    const details = this.getAttribute('details') as Details;
    const mode = this.getAttribute('mode') as Mode;
    const rawCustomMessages = this.getAttribute('custom-messages');

    if (!rawIds) {
      console.error('sla-widget: attribute "subgraph-ids" is required.');
      return;
    }

    const subgraphIds = rawIds
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);

    let customMessages: Partial<Record<Health, string>> | undefined;
    if (rawCustomMessages) {
      try {
        customMessages = JSON.parse(rawCustomMessages);
      } catch (err) {
        console.warn(
          'sla-widget: failed to parse "custom-messages", ignoring.',
          err,
        );
      }
    }

    this.app = new WidgetApp({
      subgraphIds,
      statusEndpoint,
      refreshIntervalMs,
      theme,
      position,
      details,
      mode,
      customMessages,
    });

    this.app.render(this);
  }

  disconnectedCallback() {
    this.app?.destroy();
  }

  /* ——————————————————————————— helpers —————————————————————————— */
  private num(value: string | null): number | undefined {
    return value ? Number.parseInt(value, 10) : undefined;
  }
}

if (!customElements.get('monitor-widget')) {
  customElements.define('monitor-widget', MonitorWidgetElement);
}

if (typeof window !== 'undefined') {
  (window as any).MonitorWidget = { WidgetApp };
}
