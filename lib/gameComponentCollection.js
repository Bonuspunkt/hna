var DrawableGameComponent = require('./drawableGameComponent');
var EventEmitter = require('./eventEmitter');
var util = require('./util');

function GameComponentCollection() {
  EventEmitter.apply(this, arguments);

  var components = [];
  var drawComponents;
  var updateComponents;

  function queueDrawRebuild() {
    drawComponents = false;
  }
  function queueUpdateRebuild() {
    updateComponents = false;
  }

  this.add = function(component) {
    if (component instanceof DrawableGameComponent) {
      component.on('drawOrderChange', queueDrawRebuild);
      component.on('visibleChange', queueDrawRebuild);
    }
    component.on('enabledChange', queueUpdateRebuild);
    component.on('updateOrderChange', queueUpdateRebuild);

    components.push(component);

    this.fireEvent('componentAdd', component);
  };
  this.remove = function(component) {
    var index = components.indexOf(component);
    if (index === -1) { return; }

    if (component instanceof DrawableGameComponent) {
      component.un('drawOrderChange', queueDrawRebuild);
      component.un('visibleChange', queueDrawRebuild);
    }
    component.un('enabledChange', queueUpdateRebuild);
    component.un('updateOrderChange', queueUpdateRebuild);

    components.splice(index, 1);

    this.fireEvent('componentRemove', component);
  };

  Object.defineProperties(this, {
    drawComponents: {
      get: function() {
        if (!drawComponents) {
          drawComponents = components.filter(function(cmp) {
            return cmp instanceof DrawableGameComponent && cmp.visible;
          }).sort(function(a, b) {
            return a.drawOrder - b.drawOrder;
          });
        }
        return drawComponents;
      }
    },
    updateComponents: {
      get: function() {
        if (!updateComponents) {
          updateComponents = components.filter(function(component) {
            return component.enabled;
          }).sort(function(a,b) {
            return a.updateOrder - b.updateOrder;
          });
        }
        return updateComponents;
      }
    },
    components: {
      get: function() {
        return components.slice();
      }
    }
  });
}

util.inherits(GameComponentCollection, EventEmitter);

module.exports = GameComponentCollection;
