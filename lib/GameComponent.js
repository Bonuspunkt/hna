import EventEmitter from './EventEmitter.js';
import { autoEventedProperty } from './util.js'

class GameComponent extends EventEmitter {
  #game;

  constructor(game) {
    super();
    this.#game = game;
  }

  initialize() { }
  update(gameTime) { }
}

autoEventedProperty(GameComponent.prototype, 'enabled', true);
autoEventedProperty(GameComponent.prototype, 'updateOrder', 0);

export default GameComponent;