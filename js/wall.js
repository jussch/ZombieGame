(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var Wall = ZG.Wall = function (options) {
    var defaults = {
      pos: "missing",
      dim: "missing",
      game: "missing",
      weight: -1,
      spriteOptions: {
        img: "wall.png",
      }
    }
    _U.extend(this, defaults, options);

    this.pos = _U.toCoord(this.pos);
    this.dim = new ZG.CollBox(this.pos, this.dim, { parent: this });

    this.spriteOptions.parent = this;
    this.spriteOptions.size = this.spriteOptions.size || this.dim.dim.dup().divided(16)
    this.sprite = this.sprite || new ZG.Sprite(this.spriteOptions);
    delete this.spriteOptions;
  };

  _U.mixin(Wall);

  Wall.prototype.update = function () {
    // Do Nothing.
  };

  Wall.prototype.draw = function (ctx, camera) {
    this.sprite.draw(ctx, camera)
  }

})();
