#!/usr/bin/env node

var Vector2 = require('../lib/vector2');
var test = require('tap').test;

test('ctor with one parameters', function(assert) {
  var vector = new Vector2(4);
  assert.equal(vector.x, 4);
  assert.equal(vector.y, 4);

  assert.end();
});

test('ctor with two parameters', function(assert) {
  var vector = new Vector2(3, 4);
  assert.equal(vector.x, 3);
  assert.equal(vector.y, 4);

  assert.end();
});

test('add', function(assert) {
  var vector = new Vector2(3, 4);
  var result = vector.add(new Vector2(-3, -4));

  assert.equal(result.x, 0);
  assert.equal(result.y, 0);
  assert.end();
});

test('clamp', function(assert) {
  var vector = new Vector2(10, -10);
  var max = new Vector2(5,5);
  var min = new Vector2(-5,-5);

  var result = vector.clamp(min, max);

  assert.equal(result.x, 5);
  assert.equal(result.y, -5);
  assert.end();
})

test('divide with number', function(assert) {
  var vector = new Vector2(4, 6);
  var result = vector.divide(2);

  assert.equal(result.x, 2);
  assert.equal(result.y, 3);
  assert.end();
});

test('divide with vector', function(assert) {
  var vector = new Vector2(3, 4);
  var result = vector.divide(new Vector2(3, 2));

  assert.equal(result.x, 1);
  assert.equal(result.y, 2);
  assert.end();
});

test('dot', function(assert) {
  var vector = new Vector2(2, 3);
  var dot = vector.dot(new Vector2(6, 4));

  assert.equal(dot, 24);
  assert.end();
});

test('equals', function(assert) {
  var vector = new Vector2(3,4);
  var vector2 = new Vector2(4,3);

  assert.ok(vector.equals(vector));
  assert.notOk(vector.equals(vector2));

  assert.end();
});

test('length', function(assert) {
  var vector = new Vector2(3, 4);
  assert.equal(vector.length(), 5);

  assert.end();
});

test('lengthSquared', function(assert) {
  var vector = new Vector2(3, 4);
  assert.equal(vector.lengthSquared(), 25);

  assert.end();
});

test('lerp', function(assert) {
  var vector = new Vector2(7, 4);
  var otherVector = new Vector2(3, 5);

  var result = vector.lerp(otherVector, 2);

  assert.equal(result.x, -1);
  assert.equal(result.y, 6);

  assert.end();
});

test('max', function(assert) {
  var vector1 = new Vector2(10, 5);
  var vector2 = new Vector2(5, 10);

  var result = vector1.max(vector2);

  assert.deepEqual(result, new Vector2(10,10));

  assert.end();
});

test('min', function(assert) {
  var vector1 = new Vector2(10, 5);
  var vector2 = new Vector2(5, 10);

  var result = vector1.min(vector2);

  assert.deepEqual(result, new Vector2(5,5));

  assert.end();
});

test('multiply with number', function(assert) {
  var vector = new Vector2(4,7);
  var result = vector.multiply(4);

  assert.equal(result.x, 16);
  assert.equal(result.y, 28);
  assert.end();
});

test('multiply with vector', function(assert) {
  var vector1 = new Vector2(3, 5);
  var vector2 = new Vector2(4, 6);
  var result = vector1.multiply(vector2);

  assert.equal(result.x, 12);
  assert.equal(result.y, 30);
  assert.end();
});

test('negate', function(assert) {
  var vector = new Vector2(3, 4);
  var result = vector.negate();

  assert.equal(result.x, -3);
  assert.equal(result.y, -4);
  assert.end();
});

test('normalize', function(assert) {
  var vector = new Vector2(3, 4);
  var normalized = vector.normalize();

  assert.equal(normalized.x, 0.6);
  assert.equal(normalized.y, 0.8);
  assert.end();
});

test('reflect', function(assert) {
  var vector = new Vector2(1,0);
  var normal = new Vector2(1,0).normalize();

  var result = vector.reflect(normal);

  assert.deepEqual(result, new Vector2(-1,0));

  assert.end();
});

test('substract', function(assert) {
  var vector1 = new Vector2(8, 9);
  var vector2 = new Vector2(2, 7);
  var result = vector1.substract(vector2);

  assert.equal(result.x, 6);
  assert.equal(result.y, 2);
  assert.end();
});

test('static properties', function(assert) {
  assert.deepEqual(Vector2.one, new Vector2(1));
  assert.deepEqual(Vector2.zero, new Vector2(0));
  assert.deepEqual(Vector2.unitX, new Vector2(1,0));
  assert.deepEqual(Vector2.unitY, new Vector2(0,1));

  assert.end();
});
