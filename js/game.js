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

  Game.DIM = new ZG.Coord([1024, 576]);

  Game.prototype.update = function () {
    var objs = this.allObjects();
    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      obj.update();
    }
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM.x, Game.DIM.y);
    var objs = this.allObjects();
    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      obj.draw(ctx);
    }
  };

  Game.prototype.allObjects = function () {
    return this.enemies
      .concat(this.bullets)
      .concat(this.player);
  };

  Game.prototype.checkCollisions = function (against, objType) {
    var objs = objType.split(" ").reduce(function (prev, curr) {
      return curr ? prev.concat(this.try(this[curr])) : prev;
    }.bind(this), []);

    var colls = [];

    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      if (!obj || obj === against) continue;
      if (against.dim.checkCollision(obj.dim)) {
        colls.push(obj);
      }
    }

    if (colls.length === 0) {
      return false;
    } else {
      return colls;
    }
  };

})();
