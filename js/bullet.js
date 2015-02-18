(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Bullet = ZG.Bullet = function (options) {
    var defaults = {
      dim: 1,
      maxVel: 10,
      damage: 1,
      duration: 120,
      spriteOptions: {
        img: "bullet.gif"
      }
    };
    ZG.DynamicObject.call(this, _U.extend(defaults, options));

    if (this.acc.toScalar() === 0) {
      this.acc.setTo(this.vel.toUnitVector().divided(10000));
    }
    if (this.isInstant) {
      this.drawPoints = [this.pos.dup(), null]
    }
  };

  _U.inherits(Bullet, ZG.DynamicObject);

  Bullet.prototype.update = function () {
    this.move();
    this.checkHits();
    this.duration -= 1;
    if (this.duration < 0 || this.game.checkCollisions(this, "walls")) {
      this.remove();
    } else if (this.isInstant && !this.isRemoved) {
      this.update();
    }
  };

  Bullet.prototype.checkHits = function () {
    var hits = this.game.checkCollisions(this, "enemies");
    if (!hits) return;
    for (var i = 0; i < hits.length; i++) {
      hits[i].damage(this.damage);
      hits[i].vel.plus(this.vel.toUnitVector().times(4));
    }
    this.remove();
  };

  Bullet.prototype.remove = function () {
    this.game.remove(this);
    this.isRemoved = true;
    if (this.isInstant) {
      this.drawPoints[1] = this.pos.dup();
      this.game.drawLines.push(this.drawPoints);
    }
  };

})();
