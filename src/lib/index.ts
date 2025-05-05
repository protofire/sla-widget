import { WidgetRenderer } from './Renderer';
import { WidgetStyleInjector } from './StyleInjector';
import { ThemeMode, WidgetAppOptions } from '../utils/types';
import { ThemeManager } from './ThemeManager';

export class WidgetApp {
  private shadowRoot: ShadowRoot | null = null;
  private readonly renderer: WidgetRenderer;
  private readonly theming: ThemeManager;
  private readonly styleInjector = new WidgetStyleInjector();
  private options: WidgetAppOptions;

  constructor(options: WidgetAppOptions) {
    this.options = options;
    this.theming = new ThemeManager(options.theme);
    this.renderer = new WidgetRenderer(this);
  }

  async render(host: HTMLElement) {
    this.shadowRoot = host.attachShadow({ mode: 'open' });

    this.injectStyles();
    this.applyTheme();

    await this.renderer.loadAndRender(this.shadowRoot);
    this.theming.setupAutoMode(this.shadowRoot);
  }

  update(options: WidgetAppOptions) {
    this.options = options;
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
    this.renderer.clearAutoRefresh();
  }

  getOptions() {
    return this.options;
  }

  getTheming() {
    return this.theming;
  }

  private injectStyles() {
    if (this.shadowRoot) {
      this.styleInjector.inject(this.shadowRoot);
    }
  }

  private applyTheme() {
    if (this.shadowRoot) {
      this.theming.applyTheme(this.shadowRoot);
    }
  }
}
