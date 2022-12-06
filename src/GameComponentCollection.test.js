import { expect, jest, test } from '@jest/globals';
import GameComponent from './GameComponent.js'
import DrawableGameComponent from './DrawableGameComponent.js'
import GameComponentCollection from './GameComponentCollection.js';

test('drawComponents should work and be sorted', () => {

  const collection = new GameComponentCollection();

  const gameComponent = new GameComponent();
  const drawableGameComponent1 = new DrawableGameComponent();
  const drawableGameComponent2 = new DrawableGameComponent();
  drawableGameComponent2.drawOrder = 1;

  collection.add(gameComponent);
  collection.add(drawableGameComponent1);
  collection.add(drawableGameComponent2);

  expect(collection.components).toEqual([gameComponent, drawableGameComponent1, drawableGameComponent2])

  let actual = collection.drawComponents;
  let expected = [drawableGameComponent1, drawableGameComponent2];
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
  const collection = new GameComponentCollection();

  const gameComponent1 = new GameComponent();
  const gameComponent2 = new GameComponent();
  gameComponent2.updateOrder = 1;

  collection.add(gameComponent1);
  collection.add(gameComponent2);

  let actual = collection.updateComponents;
  let expected = [gameComponent1, gameComponent2];
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
  const collection = new GameComponentCollection();
  const gameComponent = new DrawableGameComponent();

  const handleAdd = jest.fn(component => {
    expect(component).toEqual(gameComponent);
  });
  const handleRemove = jest.fn(component => {
    expect(component).toEqual(gameComponent);
  });

  collection.on('componentAdded', handleAdd);
  collection.on('componentRemoved', handleRemove);

  collection.add(gameComponent);

  expect(handleAdd).toBeCalledTimes(1)
  expect(handleRemove).not.toBeCalled();

  collection.remove(gameComponent);

  expect(handleRemove).toBeCalledTimes(1);
});
