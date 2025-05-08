export class WidgetTooltip {
  private tooltipEl: HTMLElement;
  private activeTarget: HTMLElement | null = null;
  private hideTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.id = 'monitor-tooltip';
    this.tooltipEl.className = 'tooltip-container hidden';
    this.attachTooltipListeners();
  }

  setup(root: HTMLElement) {
    if (!root.contains(this.tooltipEl)) {
      root.appendChild(this.tooltipEl);
      this.tooltipEl.style.visibility = 'hidden';
      this.tooltipEl.style.position = 'absolute';
      this.tooltipEl.style.zIndex = '9999';
    }
  }

  createTrigger(
    triggerEl: HTMLElement,
    content: string | HTMLElement,
  ): HTMLElement {
    triggerEl.style.cursor = 'pointer';
    triggerEl.addEventListener('mouseenter', () => {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
      this.showTooltip(triggerEl, content);
    });

    triggerEl.addEventListener('mouseleave', (event: MouseEvent) => {
      const related = event.relatedTarget as Node | null;
      if (
        related &&
        (this.tooltipEl.contains(related) ||
          (this.activeTarget && this.activeTarget.contains(related)))
      ) {
        return;
      }
      this.scheduleHide();
    });

    return triggerEl;
  }

  private showTooltip(target: HTMLElement, content: string | HTMLElement) {
    this.activeTarget = target;
    this.tooltipEl.innerHTML = '';

    if (typeof content === 'string') {
      this.tooltipEl.textContent = content;
    } else {
      this.tooltipEl.appendChild(content);
    }

    this.tooltipEl.classList.remove('hidden');
    this.tooltipEl.classList.add('visible');
    this.tooltipEl.style.visibility = 'hidden';
    this.tooltipEl.style.display = 'block';

    requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      const tooltipRect = this.tooltipEl.getBoundingClientRect();
      const top = rect.top - tooltipRect.height - 8 + window.scrollY;
      const left =
        rect.left + rect.width / 2 - tooltipRect.width / 2 + window.scrollX;

      this.tooltipEl.style.top = `${Math.max(top, 4)}px`;
      this.tooltipEl.style.left = `${Math.max(left, 4)}px`;
      this.tooltipEl.style.visibility = 'visible';
    });
  }

  private scheduleHide() {
    this.hideTimeout = setTimeout(() => {
      this.tooltipEl.classList.remove('visible');
      this.tooltipEl.classList.add('hidden');
      this.activeTarget = null;
    }, 300);
  }

  private attachTooltipListeners() {
    this.tooltipEl.addEventListener('mouseleave', () => {
      this.scheduleHide();
    });

    this.tooltipEl.addEventListener('mouseenter', () => {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
    });
  }
}

export const tooltipStyles = /* css */ `
  .tooltip-container {
    background: var(--tooltip-bg);
    color: var(--tooltip-text);
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 12px;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(4px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    border: var(--tooltip-border);
  }

  .tooltip-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tooltip-container.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;
