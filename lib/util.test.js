import { expect, jest, test } from '@jest/globals';
import { autoEventedProperty } from './util.js'


test('autoEventedProperty', function () {

  const fireEvent = jest.fn((propertyName, value) => {
    expect(propertyName).toBe('propChange');
    expect(value).toBe('wat');
  });

  function Class() { }
  Class.prototype.fireEvent = fireEvent;

  autoEventedProperty(Class.prototype, 'prop', '?');

  var instance = new Class();
  expect(instance.prop).toBe('?');

  instance.prop = 'wat';

  expect(instance.prop).toBe('wat');

  expect(fireEvent).toBeCalledTimes(1);
});