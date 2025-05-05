import { ElementProps } from './types';

export function createElement(
  tag: string,
  props: ElementProps = {},
  children?: string | Element | (string | Element)[],
): HTMLElement {
  const el = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      el.className = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Element) {
        el.appendChild(child);
      }
    });
  } else if (typeof children === 'string') {
    el.textContent = children;
  } else if (children instanceof Element) {
    el.appendChild(children);
  }

  return el;
}
