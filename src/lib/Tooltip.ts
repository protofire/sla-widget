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
      this.tooltipEl.style.position = 'absolute';
      this.tooltipEl.style.zIndex = '9999';
    }
  }

  createTrigger(
    triggerEl: HTMLElement,
    content: string | HTMLElement,
    position: 'top' | 'bottom' | 'left' | 'right' = 'top',
    offsetPx = 2,
  ): HTMLElement {
    triggerEl.style.cursor = 'pointer';

    triggerEl.addEventListener('mouseenter', () => {
      if (this.hideTimeout) clearTimeout(this.hideTimeout);
      this.showTooltip(triggerEl, content, position, offsetPx);
    });

    triggerEl.addEventListener('mouseleave', (evt: MouseEvent) => {
      const related = evt.relatedTarget as Node | null;
      if (
        related &&
        (this.tooltipEl.contains(related) ||
          (this.activeTarget && this.activeTarget.contains(related)))
      )
        return;
      this.scheduleHide();
    });

    return triggerEl;
  }

  private showTooltip(
    target: HTMLElement,
    content: string | HTMLElement,
    position: 'top' | 'bottom' | 'left' | 'right',
    offset = 2,
  ) {
    this.activeTarget = target;
    this.tooltipEl.innerHTML = '';
    typeof content === 'string'
      ? (this.tooltipEl.textContent = content)
      : this.tooltipEl.appendChild(content);

    this.tooltipEl.classList.remove('hidden');
    this.tooltipEl.classList.add('visible');
    this.tooltipEl.style.visibility = 'hidden';
    this.tooltipEl.style.display = 'block';

    requestAnimationFrame(() => {
      const tRect = target.getBoundingClientRect();
      const tipRect = this.tooltipEl.getBoundingClientRect();

      let top = 0,
        left = 0;

      switch (position) {
        case 'bottom':
          top = tRect.bottom + offset + window.scrollY;
          left =
            tRect.left + tRect.width / 2 - tipRect.width / 2 + window.scrollX;
          break;
        case 'left':
          top =
            tRect.top + tRect.height / 2 - tipRect.height / 2 + window.scrollY;
          left = tRect.left - tipRect.width - offset + window.scrollX;
          break;
        case 'right':
          top =
            tRect.top + tRect.height / 2 - tipRect.height / 2 + window.scrollY;
          left = tRect.right + offset + window.scrollX;
          break;
        case 'top':
        default:
          top = tRect.top - tipRect.height - offset + window.scrollY;
          left =
            tRect.left + tRect.width / 2 - tipRect.width / 2 + window.scrollX;
      }

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
    this.tooltipEl.addEventListener('mouseleave', () => this.scheduleHide());
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
