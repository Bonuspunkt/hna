var DrawableGameComponent = require('./drawableGameComponent');

function createGameComponentCollection() {

  var components = [];
  var drawComponents;
  var updateComponents;

  function queueDrawRebuild() {
    drawComponents = false;
  }
  function queueUpdateRebuild() {
    updateComponents = false;
  }

  var collection = {
    add: function(component) {
      if (component instanceof DrawableGameComponent) {
        component.on('drawOrderChange', queueDrawRebuild);
        component.on('visibleChange', queueDrawRebuild);
      }
      component.on('enabledChange', queueUpdateRebuild);
      component.on('updateOrderChange', queueUpdateRebuild);

      components.push(component);
    },
    remove: function(component) {
      var index = components.indexOf(component);
      if (index === -1) { return; }

      if (component instanceof DrawableGameComponent) {
        component.un('drawOrderChange', queueDrawRebuild);
        component.un('visibleChange', queueDrawRebuild);
      }
      component.un('enabledChange', queueUpdateRebuild);
      component.un('updateOrderChange', queueUpdateRebuildW);

      eventHandlers.splice(index, 1);
    }
  };

  Object.defineProperty(collection, 'drawComponents', {
    get: function() {
      if (!drawComponents) {
        drawComponents = components.filter(function(component) {
          return component instanceof DrawableGameComponent && component.visible;
        }).sort(function(a, b) {
          return a.drawOrder - b.drawOrder;
        });
      }
      return drawComponents;
    }
  });

  Object.defineProperty(collection, 'updateComponents', {
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
  });

  return collection;
}

module.exports = createGameComponentCollection;
