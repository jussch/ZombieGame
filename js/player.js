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
      actionDelay: 0,
      collidesWith: "walls",
      spriteOptions: {
        img: "player.png",
        baseAngle: 10
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
    if(this.game.checkCollisions(this, "walls")) console.log("ow")
    this.sprite.angle = this.angle
    this.actionDelay -= 1
  };

  Player.prototype.shoot = function () {
    if (!this.equippedItem) return;
    this.equippedItem.use.call(this);
  };

  Player.prototype.aquire = function (item) {
    item.owner = this;
    this.equippedItem = item;
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

    if (this.actionDelay > 0) {
      return;
    }

    if (key.isPressed("x")) {
      this.shoot();
    }
  };

})();
