(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  // Coord Class found in my Lil' Wizards Game.
  // Why make whats already been made?

  var Coord = ZG.Coord = function (pos) {
    if (pos instanceof ZG.Coord) {
      pos = [pos.x, pos.y];
    } else if (!(pos instanceof Array)) {
      pos = [pos, pos];
    }
    this.x = pos[0];
    this.y = pos[1];
  };

  Coord.prototype.plus = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x += newCoord.x;
    this.y += newCoord.y;
    return this;
  };

  Coord.prototype.times = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x *= newCoord.x;
    this.y *= newCoord.y;
    return this;
  };

  Coord.prototype.minus = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x -= newCoord.x;
    this.y -= newCoord.y;
    return this;
  };

  Coord.prototype.divided = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x /= newCoord.x;
    this.y /= newCoord.y;
    return this;
  };

  Coord.prototype.setTo = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x = newCoord.x;
    this.y = newCoord.y;
    return this;
  };

  Coord.prototype.setScalar = function (scalar) {
    return this.setTo(this.toUnitVector().times(scalar));
  };

  Coord.prototype.max = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x = Math.max(this.x, newCoord.x);
    this.y = Math.max(this.y, newCoord.y);
    return this;
  };

  Coord.prototype.min = function (pos) {
    var newCoord = this.toCoord(pos);
    this.x = Math.min(this.x, newCoord.x);
    this.y = Math.min(this.y, newCoord.y);
    return this;
  };

  Coord.prototype.abs = function () {
    var newCoord = this.dup();
    return newCoord.makeAbs();
  };

  Coord.prototype.makeAbs = function () {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  };

  Coord.prototype.randomBetween = function (pos) {
    var newCoord = this.toCoord(pos).dup();
    newCoord.x = Math.random()*Math.abs(this.x - newCoord.x) + Math.min(newCoord.x, this.x);
    newCoord.y = Math.random()*Math.abs(this.y - newCoord.y) + Math.min(newCoord.y, this.y);
    return newCoord;
  };

  Coord.prototype.randomBetweenLine = function (pos) {
    var newCoord = this.toCoord(pos).dup();
    var between = newCoord.dup().minus(this);
    return newCoord.minus(between.times(Math.random()));
  };

  Coord.prototype.toAngle = function () {
    return Math.atan2(this.y, this.x);
  };

  Coord.prototype.toAngleDeg = function () {
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  };

  Coord.prototype.toScalar = function () {
    var xSqr = this.x * this.x;
    var ySqr = this.y * this.y;
    return Math.sqrt(xSqr + ySqr);
  };

  Coord.prototype.toUnitVector = function () {
    return this.dup().divided(this.toScalar());
  }

  Coord.prototype.setAngle = function (newAngle) {
    var scalar = this.toScalar();
    this.x = scalar * Math.cos(newAngle);
    this.y = scalar * Math.sin(newAngle);
    return this;
  }

  Coord.prototype.plusAngle = function (angle) {
    var newAngle = this.toAngle() + angle;
    return this.setAngle(newAngle);
  };

  Coord.prototype.plusAngleDeg = function (angle) {
    var newAngle = this.toAngleDeg() + angle;
    return this.setAngle(newAngle * Math.PI / 180);
  };

  Coord.prototype.plusUpAngleDeg = function (angle) {
    if (this.x > 0) {
      angle *= -1;
    }
    return this.plusAngleDeg(angle);
  };

  Coord.prototype.plusRightAngleDeg = function (angle) {
    if (this.y > 0) {
      angle *= -1;
    }
    return this.plusAngleDeg(angle);
  };

  Coord.prototype.dup = function () {
    return new Coord([this.x, this.y]);
  };

  Coord.prototype.drawRound = function () {
    this.x = (this.x + 0.5) | 0;
    this.y = (this.y + 0.5) | 0;
    return this;
  }

  Coord.prototype.toCoord = function (el) {
    if (el instanceof ZG.Coord) {
      return el;
    } else {
      return new Coord(el);
    }
  };

})();
