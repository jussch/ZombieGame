(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Level = ZG.Level = function (options) {
    var defaults = {
      size: [64, 48]
    };
    _U.extend(this, defaults, options);

    var size = this.size = _U.toCoord(this.size);
    this.grid = _U.initArr(function() {
      return _U.initArr("", size.x)
    }, size.y);
  };

  _U.mixin(Level);

  var Level.prototype.generateMaze = function () {

  };

})();
