(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Player = ZG.Player = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      dim: 10,
      angle: 0,
      maxVel: 2,
      collidesWith: "",
      spriteOptions: {
        img: "player.png"
      }
    };
    ZG.DynamicObject.call(this, _U.extend(defaults, options));
  };

  _U.inherits(Player, ZG.DynamicObject);

  Player.ACCEL = 1.0;
  Player.BACKPEDDLEACCEL = 0.05;
  Player.TURNSPEED = 1.5;

  Player.prototype.update = function () {
    this.move();
    this.sprite.angle = this.angle
  };

  Player.prototype.shoot = function () {
    this.game.bullets.push(new ZG.Bullet({
      pos: this.pos.dup(),
      vel: this.angleVector().times(10),
      game: this.game
    }));
  };

  Player.prototype.angleVector = function () {
    return new ZG.Coord([0, 1]).setAngleDeg(this.angle)
  };

  Player.prototype.checkActions = function () {
    if (key.isPressed("up")) {
      this.acc.setTo([0,Player.ACCEL]).setAngleDeg(this.angle)
    } else if (key.isPressed("down")) {
      this.acc.setTo([0,Player.BACKPEDDLEACCEL]).setAngleDeg(this.angle - 180);
    } else {
      this.acc.setTo(0)
    }

    if (key.isPressed("left")) {
      this.angle -= Player.TURNSPEED
    } else if (key.isPressed("right")) {
      this.angle += Player.TURNSPEED
    }

    if (key.isPressed("x")) {
      this.shoot();
    }
  };

})();
