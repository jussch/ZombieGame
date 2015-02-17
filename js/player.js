(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Player = ZG.Player = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      dim: 10,
      spriteOptions: {
        img: "player.png"
      }
    };
    ZG.DynamicObject.call(this, _U.extend(defaults, options));
  };

  Player.prototype.checkActions = function () {

  };

})();
