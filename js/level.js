(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Level = ZG.Level = function (options) {
    var defaults = {
      size: [2048, 1142]
    };
    _U.extend(this, defaults, options);

    this.size = _U.toCoord(this.size);
  };

  _U.mixin(Level);

})();
