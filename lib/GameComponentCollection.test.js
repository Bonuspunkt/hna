import { expect, jest, test } from '@jest/globals';
import GameComponentCollection from './GameComponentCollection.js';
import DrawableGameComponent from './DrawableGameComponent.js'
import GameComponent from './GameComponent.js'
/*
#!/usr/bin/env node
var GameComponentCollection = require('../lib/gameComponentCollection');
var GameComponent = require('../lib/gameComponent');
var DrawableGameComponent = require('../lib/drawableGameComponent');

var test = require('tap').test;
*/

test('drawComponents should work and be sorted', () => {

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
  expect(actual).toEqual(expected);

  drawableGameComponent1.drawOrder = 2;

  actual = collection.drawComponents;
  expected = [drawableGameComponent2, drawableGameComponent1];
  expect(actual).toEqual(expected);

  drawableGameComponent2.visible = false;

  actual = collection.drawComponents;
  expected = [drawableGameComponent1];
  expect(actual).toEqual(expected);
});

test('updateComponents should work and be sorted', () => {
  var collection = new GameComponentCollection();

  var gameComponent1 = new GameComponent();
  var gameComponent2 = new GameComponent();
  gameComponent2.updateOrder = 1;

  collection.add(gameComponent1);
  collection.add(gameComponent2);

  var actual = collection.updateComponents;
  var expected = [gameComponent1, gameComponent2];
  expect(actual).toEqual(expected);

  gameComponent1.updateOrder = 2;

  actual = collection.updateComponents;
  expected = [gameComponent2, gameComponent1];
  expect(actual).toEqual(expected);

  gameComponent2.enabled = false;

  actual = collection.updateComponents;
  expected = [gameComponent1];
  expect(actual).toEqual(expected);
});

test('add and remove should fire events', () => {
  var collection = new GameComponentCollection();
  var gameComponent = new GameComponent();

  const handleAdd = jest.fn((component) => {
    expect(component).toEqual(gameComponent);
  });
  const handleRemove = jest.fn((component) => {
    expect(component).toEqual(gameComponent);
  });

  collection.on('componentAdd', handleAdd);
  collection.on('componentRemove', handleRemove);

  collection.add(gameComponent);

  expect(handleAdd).toBeCalledTimes(1)
  expect(handleRemove).not.toBeCalled();

  collection.remove(gameComponent);

  expect(handleRemove).toBeCalledTimes(1);
});
