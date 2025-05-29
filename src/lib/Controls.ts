import { WidgetRenderer } from './Renderer';
import { createElement } from '../utils/createElement';
import { truncate } from '../utils/truncate';
import { createChevronLeftIcon, createChevronRightIcon } from '../utils/icons';

export class WidgetControls {
  constructor(private renderer: WidgetRenderer) {}

  create(totalSubgraphs: number) {
    if (totalSubgraphs <= 1) return '';

    const ids = this.renderer.getStatuses().map((s) => s.subgraphCid);

    return createElement('div', { className: 'controls' }, [
      createElement(
        'select',
        {
          className: 'controls-select',
          'aria-label': 'Select Subgraph',
        },
        [
          createElement('option', { value: '-1' }, 'All'),
          ...ids.map((id, idx) =>
            createElement(
              'option',
              { value: idx.toString() },
              truncate(id, 16, 4),
            ),
          ),
        ],
      ),
      createElement(
        'button',
        {
          className: 'controls-btn',
          'data-action': 'prev',
          'aria-label': 'Previous Subgraph',
        },
        createChevronLeftIcon(),
      ),
      createElement(
        'button',
        {
          className: 'controls-btn',
          'data-action': 'next',
          'aria-label': 'Next Subgraph',
        },
        createChevronRightIcon(),
      ),
    ]);
  }

  setup(root: ShadowRoot) {
    const select = root.querySelector<HTMLSelectElement>('.controls-select');
    const buttons = root.querySelectorAll<HTMLButtonElement>('.controls-btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const action = target.dataset.action;
        const total = this.renderer.getStatuses().length;

        let idx = this.renderer.getActiveIndex();

        if (action === 'prev') {
          idx = idx <= -1 ? total - 1 : idx - 1;
          if (idx < -1) idx = total - 1;
        } else if (action === 'next') {
          idx = idx >= total - 1 ? -1 : idx + 1;
        }

        this.renderer.setActiveIndex(idx);
        this.renderer.renderContent(root);
        this.syncSelect(root);
      });
    });

    if (select) {
      select.addEventListener('change', (e) => {
        const value = parseInt((e.target as HTMLSelectElement).value, 10);
        this.renderer.setActiveIndex(value);
        this.renderer.renderContent(root);
        this.syncSelect(root);
      });
    }
    this.syncSelect(root);
  }

  private syncSelect(root: ShadowRoot) {
    const select = root.querySelector<HTMLSelectElement>('.controls-select');
    if (select) {
      select.value = this.renderer.getActiveIndex().toString();
    }
  }
}

export const controlsStyles = /* css */ `
  .controls {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .controls-select {
    flex: 1;
    padding: 8px 12px;
    font-size: var(--monitor-font-size);
    border-radius: var(--monitor-border-radius);
    background: var(--monitor-select-background);
    color: var(--monitor-text);
    border: 1px solid var(--monitor-border, #ccc);
    transition:
      background 0.3s,
      border-color 0.3s,
      background-image 0.3s;
    appearance: none;

    background-image: url('data:image/svg+xml;utf8,<svg fill="%23818181" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px;
  }

  .controls-select:hover {
    border-color: var(--monitor-border-hover, #888);
  }

  .controls-select:focus {
    border-color: var(--monitor-border-focus, #5555ff);
    box-shadow: 0 0 0 3px rgba(85, 85, 255, 0.2);
    outline: none;
  }

  .controls-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: var(--monitor-select-background);
    color: var(--monitor-text);
    border: none;
    border-radius: var(--monitor-border-radius);
    cursor: pointer;
    transition:
      background 0.3s,
      transform 0.2s;
    padding: 4px 6px;
  }

  .controls-btn:hover {
    background: var(--monitor-border-hover, #888);
    transform: scale(1.1);
  }
`;
