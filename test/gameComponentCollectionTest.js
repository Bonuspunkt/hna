#!/usr/bin/env node
var GameComponentCollection = require('../lib/gameComponentCollection');
var GameComponent = require('../lib/gameComponent');
var DrawableGameComponent = require('../lib/drawableGameComponent');

var test = require('tap').test;


test('drawComponents should work and be sorted', function(assert) {

  var collection = new GameComponentCollection();

  var gameComponent = new GameComponent();
  var drawableGameComponent1 = new DrawableGameComponent();
  var drawableGameComponent2 = new DrawableGameComponent();
  drawableGameComponent2.drawOrder = 1;

  collection.add(gameComponent);
  collection.add(drawableGameComponent1);
  collection.add(drawableGameComponent2);

  var actual = collection.drawComponents;
  var expected = [drawableGameComponent1, drawableGameComponent2];
  assert.deepEqual(actual, expected);

  drawableGameComponent1.drawOrder = 2;

  actual = collection.drawComponents;
  expected = [drawableGameComponent2, drawableGameComponent1];
  assert.deepEqual(actual, expected);

  drawableGameComponent2.visible = false;

  actual = collection.drawComponents;
  expected = [drawableGameComponent1];
  assert.deepEqual(actual, expected);

  assert.end();
});

test('updateComponents should work and be sorted', function(assert) {
  var collection = new GameComponentCollection();

  var gameComponent1 = new GameComponent();
  var gameComponent2 = new GameComponent();
  gameComponent2.updateOrder = 1;

  collection.add(gameComponent1);
  collection.add(gameComponent2);

  var actual = collection.updateComponents;
  var expected = [gameComponent1, gameComponent2];
  assert.deepEqual(actual, expected);

  gameComponent1.updateOrder = 2;

  actual = collection.updateComponents;
  expected = [gameComponent2, gameComponent1];
  assert.deepEqual(actual, expected);

  gameComponent2.enabled = false;

  actual = collection.updateComponents;
  expected = [gameComponent1];
  assert.deepEqual(actual, expected);

  assert.end();
});

test('add and remove should fire events', function(assert) {
  var collection = new GameComponentCollection();
  var gameComponent = new GameComponent();

  var addFired = false;
  var removeFired = false;

  collection.on('componentAdd', function(component) {
    assert.equal(component, gameComponent);
    addFired = true;
  });
  collection.on('componentRemove', function(component) {
    assert.equal(component, gameComponent);
    removeFired = true;
  });


  collection.add(gameComponent);

  assert.ok(addFired, 'add has been fired');
  assert.notOk(removeFired, 'remove has been fired');

  collection.remove(gameComponent);

  assert.ok(removeFired);

  assert.end();
});
