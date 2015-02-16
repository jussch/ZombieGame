(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var Sprite = ZG.Sprite = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      img: null,
      size: 1,
      baseAngle: 0,
      angle: 0,
      parent: null,
      dim: 10,
      color: "white",
      opacity: 1,
      idxXMax: 1,
      idxYMax: 1,
      idxX: 0,
      idxY: 0
    };
    _U.extend(this, defaults, options);

    if (this.img) {
      this.img = new Image();
      this.img.src = "./graphics/" + defaults.img;
    }
    this.dim = _U.toCoord(this.dim);
    this.size = _U.toCoord(this.size);
    this.pos = this.pos || this.parent.pos;
  };

  _U.mixin(Sprite);

  Sprite.prototype.draw = function (ctx) {
    this.try(this.drawEvent);
    if (this.img) {
      this.drawImage(ctx);
    } else {
      this.drawShape(ctx);
    }
  };

  Sprite.prototype.drawImage = function (ctx) {
    ctx.save();
    var drawPos = this.pos.dup();
    drawPos.drawRound();
    ctx.translate(drawPos.x, drawPos.y);
    ctx.rotate((this.angle - this.baseAngle) * Math.PI/180);
    if (ctx.globalAlpha !== this.opacity) {
      ctx.globalAlpha = this.opacity;
    }
    var sW = (this.img.width / this.idxXMax + 0.5) | 0;
    var sH = (this.img.height / this.idxYMax + 0.5) | 0;
    var relW = (sW * this.size.x / 2 + 0.5) | 0;
    var relH = (sH * this.size.y / 2 + 0.5) | 0;
    ctx.drawImage(
      this.img,
      sW * this.idxX,
      sH * this.idxY,
      sW,
      sH,
      -relW,
      -relH,
      relW * 2,
      relH * 2
    );
    ctx.restore();
  };

  Sprite.prototype.drawShape = function (ctx) {
    console.log('not implemented yet')
  };

})();
