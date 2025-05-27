import { WidgetRenderer } from './Renderer';
import { WidgetStyleInjector } from './StyleInjector';
import { ThemeMode, WidgetAppOptions } from '../utils/types';
import { ThemeManager } from './ThemeManager';
import { DEFAULT_MESSAGES } from '../utils/constants';

export class WidgetApp {
  private shadowRoot: ShadowRoot | null = null;
  private readonly renderer: WidgetRenderer;
  private readonly theming: ThemeManager;
  private readonly styleInjector = new WidgetStyleInjector();
  private options: WidgetAppOptions;

  constructor(options: WidgetAppOptions) {
    this.options = {
      ...options,
      theme: options.theme || 'auto',
      position: options.position || 'banner',
      details: options.details || 'problemsOnly',
      mode: options.mode || 'simple',
      customMessages: {
        ...DEFAULT_MESSAGES,
        ...options.customMessages,
      },
    };
    this.theming = new ThemeManager(this.options.theme);
    this.renderer = new WidgetRenderer(this);
  }

  async render(host: HTMLElement) {
    const { position } = this.options;
    if (
      position === 'banner' &&
      typeof document !== 'undefined' &&
      host.parentNode !== document.body
    ) {
      document.body.insertBefore(host, document.body.firstChild);
    }
    this.shadowRoot = host.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.styleInjector.inject(this.shadowRoot);
      this.theming.applyTheme(this.shadowRoot);
    }
    await this.renderer.loadAndRender(this.shadowRoot);
    this.theming.setupAutoMode(this.shadowRoot);
  }

  update(options: WidgetAppOptions) {
    this.options = {
      ...this.options,
      ...options,
    };
    if (this.shadowRoot) {
      this.renderer.loadAndRender(this.shadowRoot);
    }
  }

  setTheme(theme: ThemeMode) {
    if (this.shadowRoot) {
      this.theming.setMode(theme, this.shadowRoot);
    }
  }

  destroy() {
    this.shadowRoot?.replaceChildren();
    this.theming.cleanup();
    this.renderer.destroy();
  }

  getOptions() {
    return this.options;
  }

  getTheming() {
    return this.theming;
  }
}
