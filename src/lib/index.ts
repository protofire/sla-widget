import { WidgetRenderer } from './Renderer';
import { WidgetStyleInjector } from './StyleInjector';
import { ThemeMode, WidgetAppOptions } from '../utils/types';
import { ThemeManager } from './ThemeManager';
import { DEFAULT_MESSAGES } from '../utils/constants';

export class SLAWidget {
  private shadowRoot: ShadowRoot | null = null;
  private readonly renderer: WidgetRenderer;
  private readonly theming: ThemeManager;
  private readonly styleInjector = new WidgetStyleInjector();
  private options: WidgetAppOptions;
  private scrollListener?: () => void;

  constructor(options: WidgetAppOptions) {
    this.options = this.setOptions(options);
    this.theming = new ThemeManager(this.options.theme);
    this.renderer = new WidgetRenderer(this);
  }

  private setOptions(options: WidgetAppOptions) {
    return {
      ...options,
      pinned: options.pinned ?? 'slide',
      theme: options.theme || 'auto',
      position: options.position || 'banner',
      details: options.details || 'problemsOnly',
      mode: options.mode || 'simple',
      customMessages: {
        ...DEFAULT_MESSAGES,
        ...options.customMessages,
      },
    };
  }

  async render(host: HTMLElement) {
    this.shadowRoot = host.attachShadow({ mode: 'open' });
    this.styleInjector.inject(this.shadowRoot);
    this.theming.applyTheme(this.shadowRoot);
    await this.renderer.loadAndRender(this.shadowRoot);
    this.theming.setupAutoMode(this.shadowRoot);

    if (this.options.position === 'banner') {
      this.applyPinnedMode(host);
    }
  }

  private enablePinnedFixed(host: HTMLElement) {
    host.style.position = 'fixed';
    host.style.top = '0';
    host.style.left = '0';
    host.style.width = '100%';
    host.style.zIndex = '9999';
    host.style.transform = 'translateY(0)';

    this.updateBodyPadding(host);
  }

  private enablePinnedSlide(host: HTMLElement) {
    host.style.position = 'fixed';
    host.style.top = '0';
    host.style.left = '0';
    host.style.width = '100%';
    host.style.zIndex = '9999';

    this.updateBodyPadding(host);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const height = host.offsetHeight;
          const scrollY = Math.min(window.scrollY, height);
          host.style.transform = `translateY(-${scrollY}px)`;
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    this.scrollListener = () => window.removeEventListener('scroll', onScroll);
  }

  private applyPinnedMode(host: HTMLElement) {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = undefined;
    }

    host.style.position = 'fixed';
    host.style.left = '0';
    host.style.width = '100%';
    host.style.zIndex = '9999';

    const { pinned } = this.options;
    if (pinned === 'fixed') {
      this.enablePinnedFixed(host);
    } else {
      this.enablePinnedSlide(host);
    }
  }

  public updateBodyPadding(host: HTMLElement) {
    const height = host.offsetHeight;
    document.body.style.paddingTop = height ? `${height}px` : '';
  }

  update(options: WidgetAppOptions) {
    const prevPinned = this.options.pinned;
    this.options = this.setOptions(options);

    if (this.shadowRoot) {
      this.renderer.loadAndRender(this.shadowRoot);

      if (
        prevPinned !== this.options.pinned &&
        this.options.position === 'banner'
      ) {
        this.applyPinnedMode(this.shadowRoot.host as HTMLElement);
      }
    }
  }

  setTheme(theme: ThemeMode) {
    if (this.shadowRoot) {
      this.theming.setMode(theme, this.shadowRoot);
    }
  }

  destroy() {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = undefined;
    }

    document.body.style.paddingTop = '';
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
