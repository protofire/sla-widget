import { CopyIcon, CheckIcon } from '../utils/icons';

export class WidgetCopyHandler {
  setup(root: ShadowRoot) {
    root.querySelectorAll('.card-copy').forEach((btn) => {
      btn.innerHTML = '';
      btn.appendChild(CopyIcon());

      btn.addEventListener('click', async (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const cid = target.dataset.cid;
        if (!cid) return;

        try {
          await navigator.clipboard.writeText(cid);

          this.showCopiedState(target);
        } catch (err) {
          console.error('Failed to copy CID', err);
        }
      });
    });
  }

  private showCopiedState(button: HTMLButtonElement) {
    button.classList.add('copied');
    button.innerHTML = '';
    button.appendChild(CheckIcon());
    button.disabled = true;

    setTimeout(() => {
      button.classList.remove('copied');
      button.innerHTML = '';
      button.appendChild(CopyIcon());
      button.disabled = false;
    }, 2000);
  }
}
