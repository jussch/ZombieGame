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

    this.game = this.game || new ZG.Game()

    this.game.players.push(this.player = new ZG.Player({
      pos: [576, 288],
      game: this.game
    }))

    this.game.items.push(new ZG.Item({
      pos: [100, 100],
      game: this.game
    }))

    for (var i = 0; i < 32; i++) {
      this.game.walls.push(new ZG.Wall({
        pos: [i * 32 + 16, 16],
        dim: 16,
        game: this.game
      }))
      this.game.walls.push(new ZG.Wall({
        pos: [i * 32 + 16, 576 - 16],
        dim: 16,
        game: this.game
      }))
    }

    for (var i = 0; i < 10; i++) {
      this.game.enemies.push(new ZG.Zombie({
        pos: [1024 * Math.random(), 576 * Math.random()],
        game: this.game
      }));
    }

  };

  GameView.prototype.run = function () {
    var self = this;

    this.updateInterval = setInterval(function () {
      self.player.checkActions();
      self.game.update();
    }, 1000/120)

    this.drawInterval = setInterval(function() {
      self.game.draw(self.ctx)
    }, 1000/60)
  };

})();
