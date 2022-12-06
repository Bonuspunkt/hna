class EventEmitter {
  #events;

  constructor() {
    this.#events = {};
  }

  addEventListener(name, fn) {
    name = String(name).toLowerCase();
    this.#events[name] = this.#events[name] || [];
    this.#events[name].push(fn);
  }

  removeEventListener(name, fn) {
    name = String(name).toLowerCase();
    const eventHandlers = this.#events[name];
    if (!eventHandlers) { return false; }
    const index = eventHandlers.indexOf(fn);
    if (index === -1) { return false; }
    eventHandlers.splice(index, 1);
    return true;
  };

  fireEvent(name) {
    name = String(name).toLowerCase();
    const args = [].slice.call(arguments, 1);
    const eventHandlers = (this.#events[name] || []).slice();
    eventHandlers.forEach(handler => handler.apply(this, args));
  };

  once(name, fn) {
    name = String(name).toLowerCase();
    const fireAndForget = () => {
      this.un(name, fireAndForget);
      fn.apply(this, arguments);
    };

    this.on(name, fireAndForget);
  }
}

EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;
EventEmitter.prototype.un = EventEmitter.prototype.removeEventListener;
EventEmitter.prototype.off = EventEmitter.prototype.removeEventListener;
EventEmitter.prototype.emit = EventEmitter.prototype.fireEvent;

export default EventEmitter;