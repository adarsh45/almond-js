import { removeEventListeners } from "./events";
import { DOM_TYPES } from "./h";

export function destroyDOM(vdom) {
  const { type } = vdom;

  switch (type) {
    case DOM_TYPES.TEXT:
      removeTextNode(vdom);
      break;
    case DOM_TYPES.FRAGMENT:
      removeFragmentNode(vdom);
      break;
    case DOM_TYPES.ELEMENT:
      removeElementNode(vdom);
      break;
    default:
      throw new Error(`DOM node of type ${type} is invalid!`);
  }
}

function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
  // TODO: why not do this?
  // delete vdom.el;
}

function removeFragmentNode(vdom) {
  const { children } = vdom;
  children.forEach(destroyDOM);
}

function removeElementNode(vdom) {
  const {
    el,
    children,
    // TODO: author mentioned directly destructuring the listeners object
    // but we do not have listeners directly inside the vdom
    // it is under the props and on object
    props: { on: listeners },
  } = vdom;
  el.remove();
  children.forEach(destroyDOM);

  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}
