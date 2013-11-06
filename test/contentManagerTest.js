#!/usr/bin/env node

var ContentManager = require('../lib/contentManager');
var EventEmitter = require('../lib/eventEmitter');
var util = require('../lib/util');
var test = require('tap').test;

// node Hack
global.Image = function Image(){
  EventEmitter.apply(this, arguments);
};
util.inherits(Image, EventEmitter);
var loadWorks = true;
Object.defineProperty(Image.prototype, 'src', {
  set: function(value) {
    this._src = value;
    setTimeout(function() {
      if (loadWorks) {
        this.loaded = true;
        this.fireEvent('load');
      } else {
        this.fireEvent('error');
      }
    }.bind(this), 2);
  }
});
// /node hack

test('successful load', function(assert) {
  loadWorks = true;
  var cm = new ContentManager();
  cm.on('done', function() {
    assert.ok(img1a.loaded, 'img1 is loaded');
    assert.ok(img2.loaded, 'img2 is loaded');
    assert.ok(cm.done);
    assert.end();
  });
  var img1a = cm.getImage('http://wat.com/img1');
  var img1b = cm.getImage('http://wat.com/img1');
  var img2 = cm.getImage('http://wat.com/img2');

  assert.ok(img1a === img1b, 'same url returns same image');
});

test('error loading', function(assert) {
  loadWorks = false;
  var cm = new ContentManager();
  cm.on('error', function() {
    assert.notOk(cm.done);
    assert.notOk(img.loaded);
    assert.end();
  });
  var img = cm.getImage('http://wat.com/img');
});