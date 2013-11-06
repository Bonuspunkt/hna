var util = require('./util');
var EventEmitter = require('./eventEmitter');

function ContentManager() {
  EventEmitter.call(this);

  var cache = {};

  var imagesToLoad = 0;
  var loadedImages = 0;
  var failedImages = 0;
  var failedFired = false;

  var checkDone = function() {
    if (failedImages > 0) {
      this.fireEvent('error');
      checkDone = function(){};
    }
    if (loadedImages === imagesToLoad) {
      this.fireEvent('done');
    }
  }.bind(this);

  this.getImage = function(url) {
    // TODO: normalize url
    if (cache[url]) {
      return cache[url];
    }
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

  Object.defineProperty(this, 'done', {
    get: function() {
      return imagesToLoad === loadedImages;
    }
  });
}

util.inherits(ContentManager, EventEmitter);

module.exports = ContentManager;