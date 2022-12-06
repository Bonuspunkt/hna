//import tap from 'tap';
import { expect, jest, test } from '@jest/globals';
import Emitter from './EventEmitter.js';

test('fire', () => {
  const emitter = new Emitter();
  emitter.on('fire', function (a, b, c) {
    expect(this).toBe(emitter);
    expect(a).toBe(1);
    expect(b).toBe(2);
    expect(c).toBe(3);
  });

  emitter.fireEvent('fire', 1, 2, 3);
});

test('on un', () => {
  const emitter = new Emitter();

  const shouldNotBeCalled = jest.fn();
  const shouldBeCalled = jest.fn();

  emitter.on('fire', shouldNotBeCalled);
  emitter.on('fire', shouldBeCalled)

  expect(emitter.un('fire', shouldNotBeCalled)).toBe(true);

  expect(emitter.un('fire', shouldNotBeCalled)).toBe(false);

  emitter.fireEvent('fire');

  expect(shouldNotBeCalled).not.toBeCalled();
  expect(shouldBeCalled).toBeCalledTimes(1);

  expect(emitter.un('event', () => { })).toBe(false);
});


test('once', () => {
  const emitter = new Emitter();

  const mockFn = jest.fn();

  emitter.once('a', mockFn);

  emitter.fireEvent('a');
  emitter.fireEvent('a');

  expect(mockFn).toBeCalledTimes(1);
});

test('eventname casing is ignored', () => {
  const fn = jest.fn()
  const emitter = new Emitter();
  emitter.on('FiRe', fn);
  emitter.fireEvent('fIrE');

  expect(fn).toBeCalledTimes(1);
})

test('once and on', function () {

  const onceFn = jest.fn();
  const onFn = jest.fn();

  var emitter = new Emitter();
  emitter.once('fire', onceFn);
  emitter.on('fire', onFn);

  emitter.fireEvent('fire');
  emitter.fireEvent('fire');

  expect(onceFn).toBeCalledTimes(1);
  expect(onFn).toBeCalledTimes(2);

})