class TitleScreen extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScreen' });
    }

    preload() {

        console.log('tela inicial carregado com sucesso');
        // carregando a imagem do fundo da tela inicial
        this.load.image('bg1', 'assets/bgHomeScreen.jpg');

        // carregando a imagem do botão play
        gameState.botaoPlay = this.load.image('botaoPlay', 'assets/jogarBotao.png');
    }

    create() {

        // criando a imagem do fundo
        this.add.image(config.width / 2, config.height / 2, 'bg1'). setScale(2);

        // criando a imagem do botão jogar
        gameState.botaoPlay = this.add.image(config.width / 2, config.height / 2, 'botaoPlay').setScale(0.1);

        // criando interatividade com o botão
        gameState.botaoPlay.setInteractive();

        // método usado para começar próxima cena ao clicar no botão jogar
        gameState.botaoPlay.on('pointerdown', () => {
            this.scene.stop('TitleScreen');
            this.scene.start('FirstScene')
        });

        // criando texto da tela inicial
        textoInicial = this.add.text(
            config.width / 2.9,
            config.height / 3,
            'Frog Jumper', {
            fontSize: '64px',
            // color: '#f000' //cor preta não funcionou
        });
    }
}

var botaoPlay;
var textoInicial