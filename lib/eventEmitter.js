function EventEmitter() {
  this.events = {};
}

EventEmitter.prototype.addEventListener = function(name, fn) {
  this.events[name] = this.events[name] || [];
  this.events[name].push(fn);
};
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener;

EventEmitter.prototype.removeEventListener = function(name, fn) {
  var eventHandlers = this.events[name] || [];
  var index = eventHandlers.indexOf(fn);
  if (index === -1) { return false; }
  eventHandlers.splice(index, 1);
  return true;
};
EventEmitter.prototype.un = EventEmitter.prototype.removeEventListener;

EventEmitter.prototype.fireEvent = function(name) {
  var args = [].slice.call(arguments, 1);
  var eventHandlers = this.events[name] || [];
  eventHandlers.forEach(function(handler) {
    handler.apply(null, args);
  });
};


module.exports = EventEmitter;