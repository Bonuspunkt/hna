var util = require('./util');
var EventEmitter = require('./eventEmitter');

function GameComponent(game) {
  EventEmitter.call(this);
  this.game = game;
}

util.inherits(GameComponent, EventEmitter);

GameComponent.prototype.initialize = function() {};
GameComponent.prototype.update = function(gameTime) {};

util.autoEventedProperty(GameComponent.prototype, 'enabled', true);
util.autoEventedProperty(GameComponent.prototype, 'updateOrder', 0);

module.exports = GameComponent;