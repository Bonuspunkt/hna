function Vector2(x, y) {
  if (typeof y === 'undefined') { y = x; }

  this.x = x;
  this.y = y;
}

Vector2.prototype.add = function(vector) {
  return new Vector2(this.x + vector.x, this.y + vector.y);
};

Vector2.prototype.clamp = function(min, max) {
  var x = this.x;
  x = ((x > max.x) ? max.x : x);
  x = ((x < min.x) ? min.x : x);

  var y = this.y;
  y = ((y > max.y) ? max.y : y);
  y = ((y < min.y) ? min.y : y);
  
  return new Vector2(x, y);
};

Vector2.prototype.distance = function(vector) {
  return Math.sqrt(this.distanceSquared(vector));
};

Vector2.prototype.distanceSquared = function(vector) {
  return this.substract(vector).lengthSquared()
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

Vector2.prototype.equals = function(vector) {
  return this.x === vector.x && this.y === vector.y;
}

Vector2.prototype.length = function() {
  return Math.sqrt(this.lengthSquared());
};

Vector2.prototype.lengthSquared = function() {
  return this.x * this.x + this.y * this.y;
};

Vector2.prototype.lerp = function(vector, amount) {
  return this.add(vector.substract(this).multiply(amount));
};

Vector2.prototype.max = function(max) {
  return new Vector2(
    (this.x > max.x) ? this.x : max.x,
    (this.y > max.y) ? this.y : max.y
  );
};

Vector2.prototype.min = function(min) {
  return new Vector2(
    (this.x < min.x) ? this.x : min.x,
    (this.y < min.y) ? this.y : min.y
  );
}

Vector2.prototype.multiply = function(vector) {
  if (typeof vector === 'number') {
    return new Vector2(this.x * vector, this.y * vector);
  }
  return new Vector2(this.x * vector.x, this.y * vector.y);
};

Vector2.prototype.negate = function() {
  return new Vector2(-this.x, -this.y);
};

Vector2.prototype.normalize = function() {
  var length = this.length();
  return new Vector2(this.x / length, this.y / length);
};


Vector2.prototype.reflect = function(normal) {
  var dot = this.dot(normal);
  return new Vector2(
    this.x - 2 * dot * normal.x,
    this.y - 2 * dot * normal.y
  );
};

Vector2.prototype.substract = function(vector) {
  return new Vector2(this.x - vector.x, this.y - vector.y);
};


//Vector2.barycentric = function() {};
//Vector2.catmullRom = function() {};
//Vector2.distance = function() {};
//Vector2.distanceSquared = function() {};
//Vector2.hermite = function() {};
//Vector2.lerp = function() {};
//Vector2.max = function() {};
//Vector2.min = function() {};
//Vector2.smoothStep = function() {};
//Vector2.transform = function() {};
//Vector2.transformNormal = function() {};

Object.defineProperties(Vector2, {
  one: { get: function() { return new Vector2(1,1); } },
  zero: { get: function() { return new Vector2(0,0); } },
  unitX: { get: function() { return new Vector2(1,0); } },
  unitY: { get: function() { return new Vector2(0,1); } }
})

module.exports = Vector2;
