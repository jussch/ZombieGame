(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var Item = ZG.Item = function (options) {
    _U.defaultTo(options, {});
    var defaults = {
      dim: 2,
      maxVel: 0,
      spriteOptions: {
        img: "handgun.png"
      },
      use: function() {
        this.actionDelay = 20;
        this.game.bullets.push(new ZG.Bullet({
          pos: this.pos.dup(),
          vel: this.angleVector().times(10),
          game: this.game
        }));
      }
    };
    ZG.DynamicObject.call(this, _U.extend(defaults, options));
  };

  _U.inherits(Item, ZG.DynamicObject);

  Item.prototype.update = function () {
    this.sprite.angle += 0.1;
    this.checkPlayer();
  };

  Item.prototype.checkPlayer = function () {
    var players = this.game.checkCollisions(this, "players");
    if (!players) return;
    players[0].aquire(this);
    this.remove();
  };

})();
