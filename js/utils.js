(function () {
  if (window._U === undefined) {
    window._U = {};
  }

  _U.extend = function (obj1, obj2) {
    var args = Array.prototype.slice.call(arguments);
    if (args.length > 2) {
      _U.extend.apply(this, args.slice(1));
    }
    if (obj2 instanceof Function) {
      obj2 = obj2();
    }
    for (var attr in obj2) {
      obj1[attr] = obj2[attr];
    }
    return obj1;
  };

  _U.defaultTo = function (obj, defaultObj) {
    if (!obj) {
      obj = defaultObj;
    }
    return obj;
  };

  _U.toCoord = function (pos) {
    if (pos instanceof ZG.Coord) {
      return pos
    } else {
      return new LW.Coord(pos);
    }
  };

  _U.inherits = function (child, parent) {
    var Surrogate = function () {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  _U.try = function (fn) {
    if (fn instanceof Function) {
      return fn.bind(this)();
    } else {
      return fn;
    }
  };

})();
