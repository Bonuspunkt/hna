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
  var cm = ContentManager();
  cm.on('done', function() {
    assert.end();
  });
  cm.getImage('http://wat.com/img');
});

test('error loading', function(assert) {
  loadWorks = false;
  var cm = ContentManager();
  cm.on('error', function() {
    assert.end();
  });
  cm.getImage('http://wat.com/img');
});