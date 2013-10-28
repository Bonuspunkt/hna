var util = require('./util');
var GameComponent = require('./gameComponent');

function DrawableGameComponent(game) {
  GameComponent.call(this);
  this._drawOrder = 0;
  this._visible = true;
}

util.inherits(DrawableGameComponent, GameComponent);

DrawableGameComponent.prototype.loadContent = function() {};
DrawableGameComponent.prototype.draw = function(context) {};

util.autoEventedProperty(DrawableGameComponent.prototype, 'drawOrder', 0);
util.autoEventedProperty(DrawableGameComponent.prototype, 'visible', true);

module.exports = DrawableGameComponent;