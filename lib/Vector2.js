class Vector2 {

  x;
  y;

  constructor(x, y) {
    if (typeof y === 'undefined') { y = x; }

    this.x = x;
    this.y = y;
  }

  add(vector) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  clamp(min, max) {
    var x = this.x;
    x = ((x > max.x) ? max.x : x);
    x = ((x < min.x) ? min.x : x);

    var y = this.y;
    y = ((y > max.y) ? max.y : y);
    y = ((y < min.y) ? min.y : y);

    return new Vector2(x, y);
  }

  distance(vector) {
    return Math.sqrt(this.distanceSquared(vector));
  };

  distanceSquared(vector) {
    return this.substract(vector).lengthSquared()
  };

  divide(vector) {
    if (typeof vector === 'number') {
      return new Vector2(this.x / vector, this.y / vector);
    }
    return new Vector2(this.x / vector.x, this.y / vector.y);
  };

  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  };

  equals(vector) {
    return this.x === vector.x && this.y === vector.y;
  }

  length() {
    return Math.sqrt(this.lengthSquared());
  };

  lengthSquared() {
    return this.x * this.x + this.y * this.y;
  };

  lerp(vector, amount) {
    return this.add(vector.substract(this).multiply(amount));
  };

  max(max) {
    return new Vector2(
      (this.x > max.x) ? this.x : max.x,
      (this.y > max.y) ? this.y : max.y
    );
  };

  min(min) {
    return new Vector2(
      (this.x < min.x) ? this.x : min.x,
      (this.y < min.y) ? this.y : min.y
    );
  }

  multiply(vector) {
    if (typeof vector === 'number') {
      return new Vector2(this.x * vector, this.y * vector);
    }
    return new Vector2(this.x * vector.x, this.y * vector.y);
  };

  negate() {
    return new Vector2(-this.x, -this.y);
  };

  normalize() {
    var length = this.length();
    return new Vector2(this.x / length, this.y / length);
  };


  reflect(normal) {
    var dot = this.dot(normal);
    return new Vector2(
      this.x - 2 * dot * normal.x,
      this.y - 2 * dot * normal.y
    );
  };

  substract(vector) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  };
}

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
  one: { get: function () { return new Vector2(1, 1); } },
  zero: { get: function () { return new Vector2(0, 0); } },
  unitX: { get: function () { return new Vector2(1, 0); } },
  unitY: { get: function () { return new Vector2(0, 1); } }
})

export default Vector2;
