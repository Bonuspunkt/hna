#!/usr/bin/env node

var test = require('tap').test;
var Emitter = require('../lib/eventEmitter');

test('on un fire works', function(assert) {

  assert.plan(8);

  var emitter = new Emitter();

  function shouldNotBeFired() {
    assert.fail();
  }

  emitter.on('fire', shouldNotBeFired);

  assert.equal(emitter.events.fire.length, 1, 'should contain one event');

  assert.ok(emitter.un('fire', shouldNotBeFired), 'should return true');

  assert.equal(emitter.events.fire.length, 0, 'should contain no events');

  assert.notOk(emitter.un('fire', shouldNotBeFired), 'should return false');

  emitter.on('fire', function(a, b, c) {
    assert.equal(this, emitter);
    assert.equal(a, 1, 'should be first passed value');
    assert.equal(b, 2, 'should be second passed value');
    assert.equal(c, 3, 'should be thrid passed value');
  });

  emitter.fireEvent('fire', 1, 2, 3);

  assert.end();
});

test('once', function(assert) {
  var emitter = new Emitter();

  var fired = 0;
  emitter.once('a', function() { fired++; });

  emitter.fireEvent('a');
  emitter.fireEvent('a');

  assert.equal(fired, 1);
  assert.end();
});

test('eventname casing is ignored', function(assert) {
  assert.plan(1);
  var emitter = new Emitter();
  emitter.on('FiRe', function() { assert.ok(true); });
  emitter.fireEvent('fIrE');
  assert.end();
})

test('once and on', function(assert) {
  assert.plan(2);
  var emitter = new Emitter();
  emitter.once('fire', function() { assert.ok(true); });
  emitter.on('fire', function() { assert.ok(true); });
  emitter.fireEvent('fire');

  assert.end();
})