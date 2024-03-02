// criando um arquivo comum para todas as cenas, a
// fim de manter propriedades básicas por todo o jogo

const gameState = {
  score: 0,
};

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      enableBody: true,
    },
  },
  scene: [TitleScreen, FirstScene]
};

const game = new Phaser.Game(config);
