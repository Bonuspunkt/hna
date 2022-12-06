import EventEmitter from './EventEmitter.js';

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

export default GameComponent;