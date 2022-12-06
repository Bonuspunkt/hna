'use strict';

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

class ContentManager extends EventEmitter {
  #cache;
  #imagesToLoad;
  #loadedImages;
  #failedImages;
  #failedFired;

  constructor() {
    super();

    this.#cache = {};

    this.#imagesToLoad = 0;
    this.#loadedImages = 0;
    this.#failedImages = 0;
    this.#failedFired = false;
  }

  #checkDone() {
    if (this.#failedFired) return;

    if (this.#failedImages > 0) {
      this.fireEvent('error');
      this.#failedFired = true;
    }
    if (this.#loadedImages === this.#imagesToLoad) {
      this.fireEvent('done');
    }
  }

  getImage(url) {
    // TODO: normalize url
    if (this.#cache[url]) {
      return this.#cache[url];
    }
    this.#imagesToLoad++;

    var img = new Image();
    img.addEventListener('load', () => {
      this.#loadedImages++;
      this.#checkDone();
    });
    img.addEventListener('error', () => {
      this.#failedImages++;
      this.#checkDone();
    });
    img.src = url;
    this.#cache[url] = img;

    return img;
  };

  get done() {
    return this.#imagesToLoad === this.#loadedImages;
  }
}

class GameComponent extends EventEmitter {
  #game;
  #enabled = true;
  #updateOrder = 0;

  constructor(game) {
    super();
    this.#game = game;
  }

  get game() { return this.#game; }

  get enabled() { return this.#enabled }
  set enabled(value) {
    if (this.#enabled === value) return;
    this.#enabled = value;
    this.fireEvent('enabledChanged', value);
  }

  get updateOrder() { return this.#updateOrder }
  set updateOrder(value) {
    if (this.#updateOrder === value) return;
    this.#updateOrder = value;
    this.fireEvent('updateOrderChanged', value);
  }

  initialize() { }
  update(gameTime) { }
}

class DrawableGameComponent extends GameComponent {

  #drawOrder = 0;
  #visible = true

  constructor(game) {
    super(game);
  }

  get drawOrder() { return this.#drawOrder }
  set drawOrder(value) {
    if (this.#drawOrder === value) return;
    this.#drawOrder = value;
    this.fireEvent('drawOrderChanged', value);
  }

  get visible() { return this.#visible }
  set visible(value) {
    if (this.#visible === value) return;
    this.#visible = value;
    this.fireEvent('visibleChanged', value);
  }

  loadContent() { }
  draw() { }
}

class GameComponentCollection extends EventEmitter {
  #components;

  constructor() {
    super();
    this.#components = [];

    this.queueDrawRebuild = this.queueDrawRebuild.bind(this);
    this.queueUpdateRebuild = this.queueUpdateRebuild.bind(this);
  }

  add(component) {
    if (component instanceof DrawableGameComponent) {
      component.on('drawOrderChanged', this.queueDrawRebuild);
      component.on('visibleChanged', this.queueDrawRebuild);
    }
    component.on('enabledChanged', this.queueUpdateRebuild);
    component.on('updateOrderChanged', this.queueUpdateRebuild);

    this.#components.push(component);

    this.fireEvent('componentAdded', component);
  };
  remove(component) {
    const index = this.#components.indexOf(component);
    if (index === -1) { return; }

    if (component instanceof DrawableGameComponent) {
      component.un('drawOrderChanged', this.queueDrawRebuild);
      component.un('visibleChanged', this.queueDrawRebuild);
    }
    component.un('enabledChanged', this.queueUpdateRebuild);
    component.un('updateOrderChanged', this.queueUpdateRebuild);

    this.#components.splice(index, 1);

    this.fireEvent('componentRemoved', component);
  };

  #drawComponents;
  queueDrawRebuild() { this.#drawComponents = false; }
  get drawComponents() {
    if (!this.#drawComponents) {
      this.#drawComponents = this.#components.filter(function (cmp) {
        return cmp instanceof DrawableGameComponent && cmp.visible;
      }).sort(function (a, b) {
        return a.drawOrder - b.drawOrder;
      });
    }
    return this.#drawComponents;
  }

  #updateComponents;
  queueUpdateRebuild() { this.#updateComponents = false; }
  get updateComponents() {
    if (!this.#updateComponents) {
      this.#updateComponents = this.#components.filter(function (component) {
        return component.enabled;
      }).sort(function (a, b) {
        return a.updateOrder - b.updateOrder;
      });
    }
    return this.#updateComponents;
  }

  get components() {
    return this.#components.slice();
  }
}

class Vector2 {

  x;
  y;

  constructor(x, y) {
    if (typeof y === 'undefined') { y = x; }

    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  clamp(min, max) {
    var x = this.x;
    x = ((x > max.x) ? max.x : x);
    x = ((x < min.x) ? min.x : x);

    var y = this.y;
    y = ((y > max.y) ? max.y : y);
    y = ((y < min.y) ? min.y : y);

    return new Vector2(x, y);
  }

  distance(vector) {
    return Math.sqrt(this.distanceSquared(vector));
  };

  distanceSquared(vector) {
    return this.substract(vector).lengthSquared()
  };

  divide(vector) {
    if (typeof vector === 'number') {
      return new Vector2(this.x / vector, this.y / vector);
    }
    return new Vector2(this.x / vector.x, this.y / vector.y);
  };

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  };

  equals(vector) {
    return this.x === vector.x && this.y === vector.y;
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  };

  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  };

  lerp(vector, amount) {
    return this.add(vector.substract(this).multiply(amount));
  };

  max(max) {
    return new Vector2(
      (this.x > max.x) ? this.x : max.x,
      (this.y > max.y) ? this.y : max.y
    );
  };

  min(min) {
    return new Vector2(
      (this.x < min.x) ? this.x : min.x,
      (this.y < min.y) ? this.y : min.y
    );
  }

  multiply(vector) {
    if (typeof vector === 'number') {
      return new Vector2(this.x * vector, this.y * vector);
    }
    return new Vector2(this.x * vector.x, this.y * vector.y);
  };

  negate() {
    return new Vector2(-this.x, -this.y);
  };

  normalize() {
    var length = this.length();
    return new Vector2(this.x / length, this.y / length);
  };


  reflect(normal) {
    var dot = this.dot(normal);
    return new Vector2(
      this.x - 2 * dot * normal.x,
      this.y - 2 * dot * normal.y
    );
  };

  substract(vector) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  };
}

//Vector2.barycentric = function() {};
//Vector2.catmullRom = function() {};
//Vector2.distance = function() {};
//Vector2.distanceSquared = function() {};
//Vector2.hermite = function() {};
//Vector2.lerp = function() {};
//Vector2.max = function() {};
//Vector2.min = function() {};
//Vector2.smoothStep = function() {};
//Vector2.transform = function() {};
//Vector2.transformNormal = function() {};

Object.defineProperties(Vector2, {
  one: { get: function () { return new Vector2(1, 1); } },
  zero: { get: function () { return new Vector2(0, 0); } },
  unitX: { get: function () { return new Vector2(1, 0); } },
  unitY: { get: function () { return new Vector2(0, 1); } }
});

exports.ContentManager = ContentManager;
exports.DrawableGameComponent = DrawableGameComponent;
exports.EventEmitter = EventEmitter;
exports.GameComponent = GameComponent;
exports.GameComponentCollection = GameComponentCollection;
exports.Vector2 = Vector2;
