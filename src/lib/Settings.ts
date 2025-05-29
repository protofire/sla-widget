import { SettingsIcon } from '../utils/icons';
import { createElement } from '../utils/createElement';
import { WidgetRenderer } from './Renderer';

export class WidgetSettings {
  constructor(private renderer: WidgetRenderer) {}

  create(root: ShadowRoot) {
    const opts = this.renderer.getApp().getOptions();

    const modeLabel = createElement('label', {}, 'Mode:');
    const modeSel = createElement('select', { className: 'select' }, [
      createElement('option', { value: 'simple' }, 'Minimal UI'),
      createElement('option', { value: 'dev' }, 'Developer UI'),
    ]) as HTMLSelectElement;

    const detLabel = createElement('label', {}, 'Details:');
    const detSel = createElement('select', { className: 'select' }, [
      createElement('option', { value: 'problemsOnly' }, 'Only Issues'),
      createElement('option', { value: 'full' }, 'All Statuses'),
    ]) as HTMLSelectElement;

    modeSel.value = opts.mode ?? 'simple';
    detSel.value = opts.details ?? 'problemsOnly';

    const pop = createElement('div', { className: 'sla-settings-pop hidden' }, [
      modeLabel,
      modeSel,
      detLabel,
      detSel,
      createElement(
        'button',
        {
          className: 'sla-settings-apply',
          onClick: () => {
            pop.classList.add('hidden');
            this.renderer.getApp().update({
              mode: modeSel.value as any,
              details: detSel.value as any,
            });
          },
        },
        'Apply',
      ),
    ]);

    const btn = createElement(
      'button',
      {
        className: 'sla-settings-btn',
        onclick: () => pop.classList.toggle('hidden'),
      },
      SettingsIcon(),
    );

    root.appendChild(btn);
    root.appendChild(pop);
  }
}

export const settingsStyles = /* css */ `
  .select {
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

  .select:hover {
    border-color: var(--monitor-border-hover, #888);
  }

  .select:focus {
    border-color: var(--monitor-border-focus, #5555ff);
    box-shadow: 0 0 0 3px rgba(85, 85, 255, 0.2);
    outline: none;
  }

  .sla-settings-pop label {
    display: block;
    margin-bottom: 2px;
    font-weight: 500;
    font-size: 11px;
    color: var(--monitor-text);
  }

  .sla-settings-apply {
    font-size: 12px;
    padding: 6px 12px;
    background: var(--monitor-background);
    color: var(--monitor-text);
    border: var(--monitor-border);
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: var(--tooltip-bg);
    }
  }
  .sla-settings-btn {
    position: absolute;
    bottom: 6px;
    left: 8px;
    width: 18px;
    height: 18px;
    cursor: pointer;
    background: none;
    border: 0;
    padding: 0;

    color: var(--tooltip-text);
  }
  .sla-settings-pop {
    position: absolute;
    bottom: 30px;
    left: 34px;
    transform: translateY(100%);
    background: var(--tooltip-bg);
    border: var(--tooltip-border);
    padding: 8px 10px;
    border-radius: 6px;
    font-size: 12px;
    z-index: 10000;
  }
  .sla-settings-pop select {
    margin-bottom: 6px;
    width: 100%;
  }
  .sla-settings-pop button {
    font-size: 12px;
    margin-top: 4px;
  }

  .sla-settings-pop.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;
