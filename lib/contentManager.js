var EventEmitter = require('./eventEmitter');

function createContentManager() {
  var contentManager = new EventEmitter();
  var cache = {};

  var imagesToLoad = 0;
  var loadedImages = 0;
  var failedImages = 0;
  var failedFired = false;

  var checkDone = function() {
    if (failedImages > 0) {
      contentManager.fireEvent('error');
      checkDone = function(){};
    }
    if (loadedImages === imagesToLoad) {
      contentManager.fireEvent('done');
    }
  };

  contentManager.getImage = function(url) {
    imagesToLoad++;

    var img = new Image();
    img.addEventListener('load', function() {
      loadedImages++;
      checkDone();
    });
    img.addEventListener('error', function() {
      failedImages++;
      checkDone();
    });
    img.src = url;
    cache[url] = img;

    return img;
  };

  return contentManager;
}

module.exports = createContentManager;