import { createElement } from '../utils/createElement';
import { defaultLogoBase64 } from '../assets/logoBase64';

export class WidgetFooter {
  create() {
    return createElement('footer', { className: 'footer' }, [
      createElement('div', { className: 'footer-content' }, [
        createElement('img', {
          className: 'footer-logo',
          src: defaultLogoBase64,
          alt: 'SLA Layer logo',
          loading: 'lazy',
        }),
        createElement(
          'span',
          { className: 'footer-text' },
          'Powered by SLALayer',
        ),
      ]),
    ]);
  }
}

export const footerStyles = /* css */ `
  .footer {
    display: flex;
    justify-content: center;
  }

  .footer-content {
    display: flex;
    align-items: center;
    gap: 8px;

    color: var(--monitor-text);
    opacity: 0.8;
  }

  .footer-logo {
    height: 20px;
    width: auto;
  }

  .footer-text {
    font-size: 12px;
  }
`;
