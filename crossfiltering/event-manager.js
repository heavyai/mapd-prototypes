const EventManager = function() {
  const subscriptions = {};

  function on(name, func) {
    subscriptions[name] = subscriptions[name] || [];
    subscriptions[name].push(func);
    return this;
  }

  function off(name, func) {
    subscriptions[name] = subscriptions[name].filter(f => f !== func);
    return this;
  }

  function emit(name, ...args) {
    if (!subscriptions[name]) {
      return;
    }
    subscriptions[name].forEach(f => f(...args));
    return this;
  }

  return {
    on,
    off,
    emit
  };
};
