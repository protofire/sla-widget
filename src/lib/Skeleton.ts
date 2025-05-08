import { createElement } from '../utils/createElement';

export class WidgetSkeleton {
  render(root: ShadowRoot, subgraphCount: number) {
    root.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'monitor-widget-content';

    const article = document.createElement('article');
    article.className = 'sla-card loading-skeleton';

    if (subgraphCount > 1) {
      article.appendChild(this.createControlsPlaceholder());
    }

    article.appendChild(this.createCardPlaceholder());
    article.appendChild(this.createFooterPlaceholder());

    wrapper.appendChild(article);
    root.appendChild(wrapper);
  }

  private createSkeletonLine(className: string) {
    return createElement('div', { className: `skeleton ${className}` });
  }

  private createCardPlaceholder() {
    return createElement('div', { className: 'skeleton-card' }, [
      this.createSkeletonLine('skeleton-header'),
      this.createSkeletonLine('skeleton-line'),
      this.createSkeletonLine('skeleton-line short'),
    ]);
  }

  private createControlsPlaceholder() {
    return createElement('div', { className: 'skeleton-controls' }, [
      this.createSkeletonLine('skeleton-select'),
      this.createSkeletonLine('skeleton-button'),
      this.createSkeletonLine('skeleton-button'),
    ]);
  }

  private createFooterPlaceholder() {
    return createElement('div', { className: 'skeleton skeleton-line footer' });
  }
}

export const skeletonStyles = /* css */ `
  .loading-skeleton {
    animation: skeleton-pulse 1.5s infinite ease-in-out;
  }

  .skeleton {
    background: var(--monitor-skeleton-color, #9c9ca0);
    border-radius: 8px;
  }

  .skeleton-controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .skeleton-select {
    flex: 1;
    height: 30px;
  }

  .skeleton-button {
    width: 24px;
    height: 24px;
  }

  .skeleton-header {
    width: 60%;
    height: 20px;
    margin-bottom: 16px;
  }

  .skeleton-line {
    width: 100%;
    height: 14px;
    margin-bottom: 10px;
  }

  .skeleton-line.short {
    width: 70%;
    margin-bottom: 12px;
  }

  .skeleton-line.footer {
    width: 60%;
    height: 16px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
  }

  @keyframes skeleton-pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }
`;
