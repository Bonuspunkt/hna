function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

Object.defineProperty(Vector2.prototype, 'length', {
  get: function() {
    return Math.sqrt(this.lengthSquared);
  }
});
Object.defineProperty(Vector2.prototype, 'lengthSquared', {
  get: function() {
    return this.x * this.x + this.y * this.y;
  }
});

Vector2.prototype.add = function(vector) {
  return new Vector2(this.x + vector.x, this.y + vector.y);
};

Vector2.prototype.divide = function(vector) {
  if (typeof vector === 'number') {
    return new Vector2(this.x / vector, this.y / vector);
  }
  return new Vector2(this.x / vector.x, this.y / vector.y);
};

Vector2.prototype.dot = function(vector) {
  return this.x * vector.x + this.y * vector.y;
};

Vector2.prototype.normalize = function() {
  var length = this.length;
  return new Vector2(this.x / length, this.y / length);
};

Vector2.prototype.multiply = function(vector) {
  if (typeof vector === 'number') {
    return new Vector2(this.x * vector, this.y * vector);
  }
  return new Vector2(this.x * vector.x, this.y * vector.y);
};

Vector2.prototype.negate = function() {
  return new Vector2(-this.x, -this.y);
};

Vector2.prototype.substract = function(vector) {
  return new Vector2(this.x - vector.x, this.y - vector.y);
};


//Vector2.barycentric = function() {};
//Vector2.catmullRom = function() {};
//Vector2.clamp = function() {};
//Vector2.distance = function() {};
//Vector2.distanceSquared = function() {};
//Vector2.hermite = function() {};
//Vector2.lerp = function() {};
//Vector2.max = function() {};
//Vector2.min = function() {};
//Vector2.reflect = function() {};
//Vector2.smoothStep = function() {};
//Vector2.transform = function() {};
//Vector2.transformNormal = function() {};


module.exports = Vector2;
