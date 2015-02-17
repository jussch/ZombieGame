(function () {
  if (window._U === undefined) {
    window.ZG = {};
  }

  var GameView = ZG.GameView = function (options) {
    var defaults = {
      ctx: null,
      game: null,
    }
    _U.extend(this, defaults, options);

    this.game = this.game || new ZG.Game({
      player: []
    })

    for (var i = 0; i < 100; i++) {
      var size = Math.random() * 5
      this.game.enemies.push(new ZG.DynamicObject({
        pos: [1024 * Math.random(), 576 * Math.random()],
        vel: [0, 0.1],
        maxVel: 10,
        acc: 0,
        weight: size * size,
        collidesWith: "enemies",
        game: this.game,
        dim: 10 * size,
        initialize: function () { this.turnSpeed = Math.random() * 3},
        moveEvent: function () {
          this.vel.plusAngleDeg(this.turnSpeed).times(1.01);
        },
        spriteOptions: {
          img: "zombie.gif",
          size: size
        }
      }));
    }

  };

  GameView.prototype.run = function () {
    var self = this;

    this.updateInterval = setInterval(function () {
      self.game.update();
    }, 1000/120)

    this.drawInterval = setInterval(function() {
      self.game.draw(self.ctx)
    }, 1000/60)
  };

})();
