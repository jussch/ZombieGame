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
      removeQueue: [],
      camera: new ZG.Camera({})
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
    this.adjustCamera();
    this.camera.update();

    this.emptyRemoveQueue();
  };

  Game.prototype.adjustCamera = function () {
    var arrX = [];
    var arrY = [];
    this.players.forEach(function (player) {
      arrX.push(player.pos.x);
      arrY.push(player.pos.y);
    }.bind(this))
    var arrX = arrX.sort((function(a,b){return a - b}));
    var arrY = arrY.sort((function(a,b){return a - b}));
    var avgX = (arrX[0] + arrX[arrX.length - 1]) / 2;
    var avgY = (arrY[0] + arrY[arrY.length - 1]) / 2;
    var magX = Game.DIMX/(Math.abs(avgX - arrX[arrX.length - 1]) * 3);
    var magY = Game.DIMY/(Math.abs(avgY - arrY[arrY.length - 1]) * 3);
    var mag = Math.min(magX, magY, Game.MAX_ZOOM);
    this.camera.moveTo({
      endPos: [avgX, avgY],
      endSize: mag,
      moveType: "linear",
      duration: 20
    });
  }

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM.x, Game.DIM.y);
    var objs = this.allObjects();
    for (var i = 0, n = objs.length; i < n; i++) {
      var obj = objs[i];
      obj.draw(ctx, this.camera);
    }
    for (var i = 0, n = this.drawLines.length; i < n; i++) {
      var line = this.drawLines[i].map(function (cd) {
        return this.camera.relativePos(cd)
      }.bind(this));
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
