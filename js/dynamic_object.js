(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var DynamicObject = ZG.DynamicObject = function (options) {
    _U.defaultTo(options, {});
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
  };

  _U.mixin(DynamicObject);

  DynamicObject.prototype.update = function () {
    this.move();
    this.sprite.angle = this.vel.toAngleDeg();
  };

  DynamicObject.prototype.move = function () {
    this.try(this.moveEvent);
    this.vel.plus(this.acc)
    this.dim.move({
      vel: this.vel,
      toCollideWith: this.collidesWith
    });
  };

  DynamicObject.prototype.draw = function (ctx) {
    this.sprite.draw(ctx);
  };

})();
