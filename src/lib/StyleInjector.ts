import { baseStyles } from '../styles/base';
import * as styleModules from '../styles';

export class WidgetStyleInjector {
  private sheet: CSSStyleSheet | null = null;

  inject(target: ShadowRoot) {
    const fullCss = [baseStyles, ...Object.values(styleModules)].join('\n');

    if (
      'adoptedStyleSheets' in Document.prototype &&
      'replaceSync' in CSSStyleSheet.prototype
    ) {
      if (!this.sheet) {
        this.sheet = new CSSStyleSheet();
        this.sheet.replaceSync(fullCss);
      }
      target.adoptedStyleSheets = [this.sheet];
    } else {
      if (!target.querySelector('style#monitor-widget-styles')) {
        const style = document.createElement('style');
        style.id = 'monitor-widget-styles';
        style.textContent = fullCss;
        target.appendChild(style);
      }
    }
  }
}
