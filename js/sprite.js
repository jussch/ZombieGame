(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var Sprite = ZG.Sprite = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      img = null,
      sizeX = 1,
      sizeY = 1,
      baseAngle = 0,
      angle = 0,
      parent = null,
      dim = new ZG.Coord(10),
      color = "white",
      opacity = 1,
      idxXMax = 1,
      idxYMax = 1,
      idxX = 0,
      idxY = 0
    };
    _U.extend(this, defaults, options);

    this.pos = this.pos || this.parent.pos;
  };

  Sprite.prototype.draw = function (ctx) {
    _U.try(this.drawEvent);
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
    ctx.rotate((this.angle - this.baseAngle) * Math.PI/100);
    if (ctx.globalAlpha !== this.opacity) {
      ctx.globalAlpha = this.opacity;
    }
    var sW = (this.img.width / this.idxXMax + 0.5) | 0;
    var sH = (this.img.height / this.idxYMax + 0.5) | 0;
    var relW = (sW * this.sizeX / 2 + 0.5) | 0;
    var relH = (sH * this.sizeY / 2 + 0.5)
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
