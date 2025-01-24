export function setAttributes(el, attributes = {}) {
  const { class: className, style, ...otherAttributes } = attributes;

  if (className) {
    setClass(className, el);
  }

  if (style) {
    const styleEntries = Object.entries(style);
    styleEntries.forEach(([prop, value]) => {
      setStyle(el, prop, value);
    });
  }

  for (const [name, value] of Object.entries(otherAttributes)) {
    setAttribute(name, value, el);
  }
}

function setStyle(el, name, value) {
  el.style[name] = value;
}

function removeStyle(el, name) {
  el.style[name] = null;
}

function setClass(className, el) {
  // why here the author has added el.className = ''
  // I have not added it, but look for this later

  if (Array.isArray(className)) {
    el.classList.add(...className);
  } else if (typeof className === "string") {
    el.className = className;
  }
}

function setAttribute(name, value, el) {
  if (value == null) {
    removeAttribute(name, el);
  } else if (name.startsWith("data-")) {
    el.setAttribute(name, value);
  } else {
    el[name] = value;
  }
}

function removeAttribute(name, el) {
  el.removeAttribute(name);
}
