(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var CollBox = ZG.CollBox = function (pos, dim, options) {
    _U.defaultTo(options, {});
    _U.extend(this, options);
    this.pos = _U.toCoord(pos);
    this.dim = _U.toCoord(dim);
  };

  CollBox.prototype.checkCollision = function (otherBox) {
    if ((Math.abs(this.pos.x - otherBox.pos.x) < this.dim.x - otherBox.dim.x) &&
        (Math.abs(this.pos.y - otherBox.pos.y) < this.dim.y - otherBox.dim.y)) {
      return true;
    }
    return false;
  };

})();
