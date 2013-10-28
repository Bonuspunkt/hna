#!/usr/bin/env node

var GameComponent = require('../lib/gameComponent');
var test = require('tap').test;

test('enabled test', function(assert) {

  var gameComponent = new GameComponent();

  assert.equal(gameComponent.updateOrder, 0, 'intial updateOrder must be 0');


  var switchedToFalse = 0;
  function checkForFalse(value) {
    assert.notOk(value, 'value should false');
    switchedToFalse++;
  }
  gameComponent.on('enabledChange', checkForFalse);

  gameComponent.enabled = false;
  gameComponent.enabled = false;

  assert.equal(switchedToFalse, 1, 'should only fire once');

  gameComponent.un('enabledChange', checkForFalse);

  var switchedToTrue = 0;
  function checkForTrue(value) {
    assert.ok(value, 'value should be true');
    switchedToTrue++;
  }
  gameComponent.on('enabledChange', checkForTrue);

  gameComponent.enabled = true;
  gameComponent.enabled = true;

  assert.equal(switchedToTrue, 1, 'should only fire once');

  assert.end();
});
