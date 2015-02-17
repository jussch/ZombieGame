(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Bullet = ZG.Bullet = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      dim: 2,
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
  };

  _U.inherits(Bullet, ZG.DynamicObject);

  Bullet.prototype.update = function () {
    this.move();
    this.checkHits();
    this.duration -= 1;
    if (this.duration < 0) this.remove();
  };

  Bullet.prototype.checkHits = function () {
    var hits = this.game.checkCollisions(this, "enemies");
    if (!hits) return;
    for (var i = 0; i < hits.length; i++) {
      hits[i].damage(this.damage);
    }
    this.remove();
  };

})();
