import { expect, jest, test } from '@jest/globals';
import ContentManager from './ContentManager.js';
import EventEmitter from './EventEmitter';


// node Hack
let loadWorks = true;

class Image extends EventEmitter {
  set src(value) {
    this._src = value;
    setImmediate(() => {
      if (loadWorks) {
        this.loaded = true;
        this.fireEvent('load');
      } else {
        this.fireEvent('error');
      }
    });
  }
};
global.Image = Image;
// /node hack

test('successful load', (done) => {
  loadWorks = true;

  const cm = new ContentManager();
  cm.on('done', () => {
    expect(img1a.loaded).toBeTruthy();
    expect(img2.loaded).toBeTruthy();

    expect(cm.done).toBe(true);
    done();
  });
  const img1a = cm.getImage('http://wat.com/img1');
  const img1b = cm.getImage('http://wat.com/img1');
  const img2 = cm.getImage('http://wat.com/img2');

  expect(img1a).toBe(img1b);
});

test('error loading', (done) => {
  loadWorks = false;

  var cm = new ContentManager();
  cm.on('error', () => {
    expect(img.loaded).toBeFalsy();
    expect(cm.done).toBe(false);

    done();
  });
  var img = cm.getImage('http://wat.com/img');
});