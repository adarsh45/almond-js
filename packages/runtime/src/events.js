export function addEventHandlers(listeners, el) {
  const addedListeners = {};

  Object.entries(listeners).forEach(([eventName, handler]) => {
    const listener = addEventListener(eventName, handler, el);
    addedListeners[eventName] = listener;
  });

  // the listeners inside this, will not be the same as listeners got as parameter
  // these functions will change in future
  return addedListeners;
}

function addEventListener(eventName, handler, el) {
  el.addEventListener(eventName, handler);
  return handler;
}

export function removeEventListeners(listeners, el) {
  const listenersEntries = Object.entries(listeners);

  for (const [eventName, handler] of listenersEntries) {
    el.removeEventListener(eventName, handler);
  }
}
