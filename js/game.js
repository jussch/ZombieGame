(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Game = ZG.Game = function (options) {
    var defaults = {
      enemies: [],
      bullets: [],
      players: [],
      items: [],
      walls: [],
      drawLines: [],
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
    this.emptyRemoveQueue();
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM.x, Game.DIM.y);
    var objs = this.allObjects();
    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      obj.draw(ctx);
    }
    for (var i = 0, n = this.drawLines.length; i < n; i++) {
      var line = this.drawLines[i];
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      ctx.lineTo(line[1].x, line[1].y);
      ctx.stroke();
    }
    this.drawLines = [];
  };

  Game.prototype.allObjects = function () {
    return this.walls
      .concat(this.items)
      .concat(this.enemies)
      .concat(this.bullets)
      .concat(this.players);
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

  Game.prototype.remove = function (obj) {
    this.removeQueue.push(obj);
  };

  Game.prototype.emptyRemoveQueue = function () {
    for (var i = 0; i < this.removeQueue.length; i++) {
      var obj = this.removeQueue[i], name;
      if (obj instanceof ZG.Bullet) {
        name = "bullets";
      } else if (obj instanceof ZG.Zombie) {
        name = "enemies";
      } else if (obj instanceof ZG.Item) {
        name = "items";
      }
      var index = this[name].indexOf(obj);
      if (index < 0) continue;
      this[name].splice(index, 1);
    }
  };

})();
