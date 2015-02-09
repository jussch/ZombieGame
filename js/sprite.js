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
      parent = null,
      dim = new ZG.Coord(10),
      color = "white"
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

  };

})();
