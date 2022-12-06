import { expect, jest, test } from '@jest/globals';
import Vector2 from './vector2.js';

test('ctor with one parameters', () => {
  const vector = new Vector2(4);
  expect(vector.x).toBe(4);
  expect(vector.y).toBe(4);
});

test('ctor with two parameters', () => {
  const vector = new Vector2(3, 4);
  expect(vector.x).toBe(3);
  expect(vector.y).toBe(4);
});

test('add', () => {
  const vector = new Vector2(3, 4);
  const result = vector.add(new Vector2(-3, -4));

  expect(result.x).toBe(0);
  expect(result.y).toBe(0);
});

test('clamp', () => {
  const vector = new Vector2(10, -10);
  const max = new Vector2(5, 5);
  const min = new Vector2(-5, -5);

  const result = vector.clamp(min, max);

  expect(result.x).toBe(5);
  expect(result.y).toBe(-5);
})

test('divide with number', () => {
  const vector = new Vector2(4, 6);
  const result = vector.divide(2);

  expect(result.x).toBe(2);
  expect(result.y).toBe(3);
});

test('divide with vector', () => {
  const vector = new Vector2(3, 4);
  const result = vector.divide(new Vector2(3, 2));

  expect(result.x).toBe(1);
  expect(result.y).toBe(2);
});

test('dot', () => {
  const vector = new Vector2(2, 3);
  const dot = vector.dot(new Vector2(6, 4));

  expect(dot).toBe(24);
});

test('equals', () => {
  const vector = new Vector2(3, 4);
  const vector2 = new Vector2(4, 3);

  expect(vector.equals(vector)).toBe(true);
  expect(vector.equals(vector2)).toBe(false);
});

test('length', () => {
  const vector = new Vector2(3, 4);
  expect(vector.length()).toBe(5);
});

test('lengthSquared', () => {
  const vector = new Vector2(3, 4);
  expect(vector.lengthSquared()).toBe(25);
});

test('lerp', () => {
  const vector = new Vector2(7, 4);
  const otherVector = new Vector2(3, 5);

  const result = vector.lerp(otherVector, 2);

  expect(result.x).toBe(-1);
  expect(result.y).toBe(6);

});

test('max', () => {
  const vector1 = new Vector2(10, 5);
  const vector2 = new Vector2(5, 10);

  const result = vector1.max(vector2);

  expect(result).toEqual(new Vector2(10, 10));
});

test('min', () => {
  const vector1 = new Vector2(10, 5);
  const vector2 = new Vector2(5, 10);

  const result = vector1.min(vector2);

  expect(result).toEqual(new Vector2(5, 5));
});

test('multiply with number', () => {
  const vector = new Vector2(4, 7);
  const result = vector.multiply(4);

  expect(result.x).toBe(16);
  expect(result.y).toBe(28);
});

test('multiply with vector', () => {
  const vector1 = new Vector2(3, 5);
  const vector2 = new Vector2(4, 6);
  const result = vector1.multiply(vector2);

  expect(result.x).toBe(12);
  expect(result.y).toBe(30);
});

test('negate', () => {
  const vector = new Vector2(3, 4);
  const result = vector.negate();

  expect(result.x).toBe(-3);
  expect(result.y).toBe(-4);
});

test('normalize', () => {
  const vector = new Vector2(3, 4);
  const normalized = vector.normalize();

  expect(normalized.x).toBe(0.6);
  expect(normalized.y).toBe(0.8);
});

test('reflect', () => {
  const vector = new Vector2(1, 0);
  const normal = new Vector2(1, 0).normalize();

  const result = vector.reflect(normal);

  expect(result).toEqual(new Vector2(-1, 0));
});

test('substract', () => {
  const vector1 = new Vector2(8, 9);
  const vector2 = new Vector2(2, 7);
  const result = vector1.substract(vector2);

  expect(result.x).toBe(6);
  expect(result.y).toBe(2);
});

test('static properties', () => {
  expect(Vector2.one).toEqual(new Vector2(1));
  expect(Vector2.zero).toEqual(new Vector2(0));
  expect(Vector2.unitX).toEqual(new Vector2(1, 0));
  expect(Vector2.unitY).toEqual(new Vector2(0, 1));
});
