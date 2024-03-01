class TitleScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScreen' });
    }

    preload() {

        // carregando a imagem do fundo da tela inicial
        this.load.image('bg1', 'assets/bgHomeScreen.jpg');

        // carregando a imagem do botão play
        this.load.image('botaoPlay', 'assets/jogarBotao');
    }

    create() {

        // criando a imagem do fundo
        this.add.image(config.width / 2, config.height / 2, 'bg1');

        // criando a imagem do botão jogar
        gameState.botaoPlay = this.add.image(config.width / 2, config.height / 2, 'botaoPlay');

        // criando interatividade com o botão
        gameState.botaoPlay.setInteractive();

        // método usado para começar próxima cena ao clicar no botão jogar
        gameState.botaoPlay.on('pointerdown', () => {
            this.scene.stop('TitleScreen');
            this.scene.start('FirstScene')
        });
    }
}

var botaoPlay;