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

    this.game.enemies.push(new ZG.DynamicObject({
      pos: [512, 288],
      vel: [0, 0.5],
      acc: 0,
      game: this.game,
      dim: 1,
      moveEvent: function () { this.vel.plusAngleDeg(0.5) },
      spriteOptions: {
        img: "zombie.gif"
      }
    }));
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
