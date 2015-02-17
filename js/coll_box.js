(function () {
  if (window.ZG === undefined) {
    window.ZG = {};
  }

  var CollBox = ZG.CollBox = function (pos, dim, options) {
    _U.defaultTo(options, {});
    _U.extend(this, options);
    this.game = this.game || this.parent.game
    this.pos = _U.toCoord(pos);
    this.dim = _U.toCoord(dim);
  };

  CollBox.prototype.checkCollision = function (otherBox) {
    if ((Math.abs(this.pos.x - otherBox.pos.x) < this.dim.x + otherBox.dim.x) &&
        (Math.abs(this.pos.y - otherBox.pos.y) < this.dim.y + otherBox.dim.y)) {
      return true;
    }
    return false;
  };

  var moveDefaults = {
    xCollisionEvent: function (obj, depth) {
      if (obj.weight <= 0) {
        this.parent.vel.x = 0;
        this.pos.x += depth;
      } else {
        var total = this.parent.weight + obj.weight;
        this.pos.x += depth * obj.weight / total;
        obj.dim.pos.x -= depth * this.parent.weight / total;
      }
    },
    yCollisionEvent: function (obj, depth) {
      if (obj.weight <= 0) {
        this.parent.vel.y = 0;
        this.pos.y += depth;
      } else {
        var total = this.parent.weight + obj.weight;
        this.pos.y += depth * obj.weight / total;
        obj.dim.pos.y -= depth * this.parent.weight / total;
      }
    }
  };

  var partialMove = function (vel, toCollideWith, dir, callback) {
    this.pos[dir] += vel[dir];
    colls = this.game.checkCollisions(this.parent, toCollideWith);
    if (!colls) {return;}
    for (var i = 0, n = colls.length; i < n; i++) {
      var obj = colls[i];
      var depth = (this.dim[dir] + obj.dim.dim[dir]) - Math.abs(this.pos[dir] - obj.pos[dir]);
      if (this.pos[dir] < obj.pos[dir]) depth *= -1;
      callback.call(this, obj, depth);
    }
  };

  CollBox.prototype.move = function (options) {
    var defaults = _U.extend(_U.clone(moveDefaults), options);
    var vel = defaults.vel, toCollideWith = defaults.toCollideWith, colls;

    var checkMove = partialMove.bind(this, vel, toCollideWith);

    checkMove("x", defaults.xCollisionEvent);
    checkMove("y", defaults.yCollisionEvent);
  };

})();
