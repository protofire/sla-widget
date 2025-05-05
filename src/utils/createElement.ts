import { ElementProps } from './types';

/**
 * Creates a DOM element with specified tag, attributes, and children.
 *
 * Supports:
 * - Setting `className` via a special prop (e.g. `{ className: 'foo' }`)
 * - Adding event listeners via `on<Event>` props (e.g. `onClick`)
 * - Appending one or more children (text nodes or DOM elements)
 *
 * @param tag - The HTML tag to create (e.g. 'div', 'button')
 * @param props - Attributes and event handlers (like id, className, onClick)
 * @param children - Optional child or children to append to the element
 * @returns The constructed HTMLElement
 */
export function createElement(
  tag: string,
  props: ElementProps = {},
  children?: string | Node | (string | Node)[],
): HTMLElement {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (key === 'className') {
      el.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  const append = (child: string | Node) => {
    el.append(
      typeof child === 'string' ? document.createTextNode(child) : child,
    );
  };

  if (Array.isArray(children)) {
    children.forEach(append);
  } else if (children) {
    append(children);
  }

  return el;
}
