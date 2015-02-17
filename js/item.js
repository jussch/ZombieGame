(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Bullet = ZG.Bullet = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      dim: 2,
      maxVel: 10,
      damage: 1,
      duration: 120,
      spriteOptions: {
        img: "bullet.gif"
      }
    };
    ZG.DynamicObject.call(this, _U.extend(defaults, options));

    if (this.acc.toScalar() === 0) {
      this.acc.setTo(this.vel.toUnitVector().divided(10000));
    }
  };

})();
