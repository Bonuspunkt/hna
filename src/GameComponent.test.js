import { expect, jest, test } from '@jest/globals';
import GameComponent from './GameComponent.js';

test('enabled test', () => {

  const gameComponent = new GameComponent();

  const checkForFalse = jest.fn(value => {
    expect(value).toBe(false);
  });
  gameComponent.on('enabledChanged', checkForFalse);

  gameComponent.enabled = false;
  gameComponent.enabled = false;

  expect(checkForFalse).toBeCalledTimes(1);

  gameComponent.un('enabledChanged', checkForFalse);

  const checkForTrue = jest.fn((value) => {
    expect(value).toBe(true);
  });
  gameComponent.on('enabledChanged', checkForTrue);

  gameComponent.enabled = true;
  gameComponent.enabled = true;

  expect(checkForTrue).toBeCalledTimes(1);
});

test('will be initialized', () => {
  const game = {};
  const gameComponent = new GameComponent(game);
  expect(gameComponent.game).toBe(game);
  expect(gameComponent.enabled).toBe(true);
  expect(gameComponent.updateOrder).toBe(0);

})