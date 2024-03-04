class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    preload() {

        console.log('tela final iniciou com sucesso');

        // carregando a imagem do fundo da tela inicial
        this.load.image('bg1', 'assets/bgHomeScreen.jpg');
    }

    create() {

        // criando a imagem do fundo
        this.add.image(config.width / 2, config.height / 2, 'bg1'). setScale(2);

        // criando texto da tela inicial
        gameState.textoFinal = this.add.text(
            config.width / 2.68,
            config.height / 3,
            'Parabéns, você coletou todas as estrelas!', {
            fontSize: '64px',
            // color: '#f000' //cor preta não funcionou
        });
    }
}