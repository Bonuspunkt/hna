import EventEmitter from "./EventEmitter.js";

class ContentManager extends EventEmitter {
  #cache;
  #imagesToLoad;
  #loadedImages;
  #failedImages;
  #failedFired;

  constructor() {
    super();

    this.#cache = {};

    this.#imagesToLoad = 0;
    this.#loadedImages = 0;
    this.#failedImages = 0;
    this.#failedFired = false;
  }

  #checkDone() {
    if (this.#failedFired) return;

    if (this.#failedImages > 0) {
      this.fireEvent('error');
      this.#failedFired = true;
    }
    if (this.#loadedImages === this.#imagesToLoad) {
      this.fireEvent('done');
    }
  }

  getImage(url) {
    // TODO: normalize url
    if (this.#cache[url]) {
      return this.#cache[url];
    }
    this.#imagesToLoad++;

    var img = new Image();
    img.addEventListener('load', () => {
      this.#loadedImages++;
      this.#checkDone();
    });
    img.addEventListener('error', () => {
      this.#failedImages++;
      this.#checkDone();
    });
    img.src = url;
    this.#cache[url] = img;

    return img;
  };

  get done() {
    return this.#imagesToLoad === this.#loadedImages;
  }
}

export default ContentManager;