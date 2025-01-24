import { setAttributes } from "./attributes.js";
import { addEventHandlers } from "./events.js";
import { DOM_TYPES } from "./h.js";

export function mountDOM(vdom, parentElement) {
  switch (vdom.type) {
    case DOM_TYPES.ELEMENT:
      createElementNode(vdom, parentElement);
      break;
    case DOM_TYPES.TEXT:
      createTextNote(vdom, parentElement);
      break;
    case DOM_TYPES.FRAGMENT:
      createFragmentNode(vdom, parentElement);
      break;
    default:
      throw new Error(`Cannot mount DOM node of type ${vdom.type}`);
  }
}

function createTextNote(vdom, parentElement) {
  const { value } = vdom;
  const textNode = document.createTextNode(value);
  vdom.el = textNode;
  parentElement.append(textNode);
}

function createFragmentNode(vdom, parentElement) {
  const { children } = vdom;
  vdom.el = parentElement;

  // mount the children
  children.forEach((child) => {
    mountDOM(child, parentElement);
  });
}

function createElementNode(vdom, parentElement) {
  const { tag, props, children } = vdom;
  const element = document.createElement(tag);

  // attach props to created element
  addProps(element, props);

  vdom.el = element;

  // mount the children
  children.forEach((child) => {
    mountDOM(child, element);
  });

  // document API call
  parentElement.append(element);
}

function addProps(el, props) {
  const { on: events, ...attributes } = props;
  setAttributes(el, attributes);
  addEventHandlers(events, el);
}
