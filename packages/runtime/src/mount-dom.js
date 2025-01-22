import { DOM_TYPES } from "./h.js";

export function mountDOM(vdom, parentElement) {
  switch (vdom.type) {
    case DOM_TYPES.ELEMENT:
      break;
    case DOM_TYPES.TEXT:
      break;
    case DOM_TYPES.FRAGMENT:
      break;
    default:
      throw new Error(`Cannot mount DOM node of type ${vdom.type}`);
  }
}

function mountTextNode(vdom, parentElement) {
  const { value } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  parentElement.append(textNode);
}

function mountElement(vdom, parentElement) {
  const { tag, props, children } = vdom;
  const element = document.createElement(tag);
  vdom.el = element;

  // attach props to created element
  for (const key in props) {
    // TODO: read why this check is needed
    if (!Object.prototype.hasOwnProperty.call(props, key)) {
      continue;
    }
    const value = props[key];
    element.setAttribute(key, value);
  }
}
