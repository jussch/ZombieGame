(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Game = ZG.Game = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      enemies: [],
      bullets: [],
      player: null,
      removeQueue: []
    };
    _U.extend(this, defaults, options);
  };

  _U.mixin(Game);

  Game.prototype.update = function () {
    var objs = this.allObjects();
    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      obj.update();
    }
  };

  Game.prototype.draw = function (ctx) {
    var objs = this.allObjects();
    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      obj.draw(ctx);
    }
  };

  Game.prototype.allObjects = function () {
    return enemies
      .concat(bullets)
      .concat(player);
  };

  Game.prototype.checkCollisions = function (against, objType) {
    var objs = objType.split(" ").reduce(function (prev, curr) {
      return prev.concat(this.try(this[curr]);
    }.bind(this), []);

    var colls = [];

    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      if (against.dim.checkCollision(obj.dim)) {
        colls.push(obj);
      }
    }

    return colls;
  };

})();
