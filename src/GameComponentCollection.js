import EventEmitter from './EventEmitter.js';
import DrawableGameComponent from './DrawableGameComponent.js'

class GameComponentCollection extends EventEmitter {
  #components;

  constructor() {
    super()
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

export default GameComponentCollection;
