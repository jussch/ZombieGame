(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var DynamicObject = ZG.DynamicObject = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      pos: "missing",
      vel: "missing",
      dim: "missing"
    }
    _U.extend(this, defaults, options);

    this.pos = _U.toCoord(this.pos);
    this.vel = _U.toCoord(this.vel);
    this.dim = new ZG.CollBox(this.pos, this.dim, {});
  };

  DynamicObject.prototype.move = function () {
    _U.try(this.moveEvent);
    this.pos.plus(this.vel);
    // Collision Detection Here:

  };

})();
