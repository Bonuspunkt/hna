var util = require('./util');
var GameComponent = require('./gameComponent');

function DrawableGameComponent(game) {
  GameComponent.apply(this, arguments);
}

util.inherits(DrawableGameComponent, GameComponent);

DrawableGameComponent.prototype.loadContent = function() {};
DrawableGameComponent.prototype.draw = function(context) {};

util.autoEventedProperty(DrawableGameComponent.prototype, 'drawOrder', 0);
util.autoEventedProperty(DrawableGameComponent.prototype, 'visible', true);

module.exports = DrawableGameComponent;