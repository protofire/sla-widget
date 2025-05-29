import {
  ThemeMode,
  Position,
  Details,
  Mode,
  Health,
  Pinned,
} from '../../utils/types';

import { SLAWidget } from '../../lib';

class MonitorWidgetElement extends HTMLElement {
  private app: SLAWidget | null = null;

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
    const pinned = this.getAttribute('pinned') as Pinned;
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

    this.app = new SLAWidget({
      subgraphIds,
      statusEndpoint,
      refreshIntervalMs,
      theme,
      position,
      details,
      mode,
      pinned,
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
  (window as any).MonitorWidget = { SLAWidget };
}
