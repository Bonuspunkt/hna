import { expect, jest, test } from '@jest/globals';
import GameComponent from '../lib/gameComponent';

test('enabled test', () => {

  var gameComponent = new GameComponent();

  expect(gameComponent.updateOrder).toBe(0);

  const checkForFalse = jest.fn(value => {
    expect(value).toBe(false);
  });
  gameComponent.on('enabledChange', checkForFalse);

  gameComponent.enabled = false;
  gameComponent.enabled = false;

  expect(checkForFalse).toBeCalledTimes(1);

  gameComponent.un('enabledChange', checkForFalse);

  const checkForTrue = jest.fn((value) => {
    expect(value).toBe(true);
  });
  gameComponent.on('enabledChange', checkForTrue);

  gameComponent.enabled = true;
  gameComponent.enabled = true;

  expect(checkForTrue).toBeCalledTimes(1);
});
