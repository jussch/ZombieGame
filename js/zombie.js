(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Zombie = ZG.Zombie = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      dim: 10,
      maxVel: 1,
      acc: [0, 0.2],
      hp: 5,
      collidesWith: "enemies",
      spriteOptions: {
        img: "zombie.gif"
      }
    };
    ZG.DynamicObject.call(this, _U.extend(defaults, options));
  };

  _U.inherits(Zombie, ZG.DynamicObject);

  Zombie.prototype.update = function () {
    var player = this.closestPlayer();
    this.acc.setAngle(player.pos.dup().minus(this.pos).toAngle());
    this.sprite.angle = player.pos.dup().minus(this.pos).toAngleDeg();
    this.move();
    this.checkPlayer();
  };

  Zombie.prototype.closestPlayer = function () {
    var pls = this.game.players
    // If players only has one player in it, just return that player.
    if (pls.length === 0) return pls[0];
    // Pretty Complex code that fishes the closest player;
    // Probably can be written more effeciently.
    var indexDist = {};
    return pls[indexDist[Math.min.apply(null, pls.map(function(player, idx) {
      var dist = Math.abs(player.pos.dup().minus(this.pos).toScalar())
      indexDist[dist] = idx;
      return dist;
    }.bind(this)))]]
  };

  Zombie.prototype.checkPlayer = function () {
    var players = this.game.checkCollisions(this, "players");
    for (var i = 0; i < players.length; i++) {
      this.attackPlayer(players[i]);
    }
  };

  Zombie.prototype.attackPlayer = function (player) {
    player.vel.plus(player.pos.dup().minus(this.pos).toUnitVector().times(7 ));
  };

  Zombie.prototype.damage = function (amount) {
    this.hp -= amount;
    if (this.hp <= 0) this.remove();
  };

})();
