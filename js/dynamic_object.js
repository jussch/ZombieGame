(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var DynamicObject = ZG.DynamicObject = function (options) {
    var defaults = {
      pos: "missing",
      vel: 0,
      acc: 0,
      dim: "missing",
      game: "missing",
      collidesWith: "",
      weight: 1,
      friction: .85,
      spriteOptions: {}
    }
    _U.extend(this, defaults, options);

    this.pos = _U.toCoord(this.pos);
    this.vel = _U.toCoord(this.vel);
    this.acc = _U.toCoord(this.acc);
    this.friction = _U.toCoord(this.friction);
    this.dim = new ZG.CollBox(this.pos, this.dim, { parent: this });

    this.spriteOptions.parent = this;
    this.sprite = this.sprite || new ZG.Sprite(this.spriteOptions);
    delete this.spriteOptions;

    this.try(this.initialize);
  };

  _U.mixin(DynamicObject);

  DynamicObject.prototype.update = function () {
    this.move();
  };

  DynamicObject.prototype.move = function () {
    this.try(this.moveEvent);
    if (this.maxVel && this.maxVel < this.vel.toScalar() ||
    this.acc.toScalar() === 0) {
      this.vel.times(this.friction);
    } else {
      this.vel.plus(this.acc);
    }
    this.dim.move({
      vel: this.vel,
      toCollideWith: this.collidesWith
    });
  };

  DynamicObject.prototype.draw = function (ctx, cam) {
    this.sprite.draw(ctx, cam);
  };

  DynamicObject.prototype.remove = function () {
    this.game.remove(this);
  };

})();
