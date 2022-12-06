import GameComponent from './GameComponent.js';

class DrawableGameComponent extends GameComponent {

  #drawOrder = 0;
  #visible = true

  constructor(game) {
    super(game)
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

export default DrawableGameComponent;