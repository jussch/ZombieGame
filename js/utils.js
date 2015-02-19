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

  _U.clone = function (obj) {
    if (!(obj instanceof Object)) throw new TypeError("obj must be an object.");
    return _U.extend({}, obj);
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
      return new ZG.Coord(pos);
    }
  };

  _U.inherits = function (child, parent) {
    var Surrogate = function () {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  _U.initArr = function (val, length) {
    var arr = [];
    if (!(val instanceof Function)) {
      var value = val;
      val = function () { return value };
    }
    while (length >= 0) {
      arr[--length] = val(length);
    }
    return arr;
  };

  // Mixin Functions

  _U.mixins = {}

  _U.mixins.try = function (fn) {
    if (fn instanceof Function) {
      return fn.bind(this)();
    } else {
      return fn;
    }
  };

  _U.mixin = function (obj) {
    for (var key in _U.mixins) {
      if (_U.mixins[key] instanceof Function) obj.prototype[key] = _U.mixins[key];
    }
    return obj;
  };

})();
