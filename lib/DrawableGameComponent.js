import GameComponent from './GameComponent.js';
import { autoEventedProperty } from './util.js';

class DrawableGameComponent extends GameComponent {
  constructor(game) {
    super(game)
  }
  loadContent() { }
  draw() { }
}

autoEventedProperty(DrawableGameComponent.prototype, 'drawOrder', 0);
autoEventedProperty(DrawableGameComponent.prototype, 'visible', true);

export default DrawableGameComponent;