#!/usr/bin/env node

var util = require('../lib/util');
var test = require('tap').test;

test('inherits test', function(assert) {

  function Class1() {}
  function Class2() {
    Class1.apply(this, arguments);
  }

  var instance1 = new Class1();
  var instance2 = new Class2();

  assert.notOk(instance2 instanceof Class1, 'before inherit');

  util.inherits(Class2, Class1);

  instance2 = new Class2();

  assert.ok(instance2 instanceof Class1, 'after inherit');

  assert.end();
});

test('autoEventedProperty', function(assert) {

  assert.plan(4);

  function Class() {}
  Class.prototype.fireEvent = function(propertyName, value) {
    assert.equal('propChange', propertyName, 'correct propertyname');
    assert.equal('wat', value, 'correct value');
  };
  util.autoEventedProperty(Class.prototype, 'prop', '?');

  var instance = new Class();
  assert.equal('?', instance.prop, 'inital value set correctly');

  instance.prop = 'wat';

  assert.equal('wat', instance.prop, 'new value was set correctly');

  assert.end();
});