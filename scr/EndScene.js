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
        this.add.image(config.width / 2, config.height / 2, 'bg1').setScale(2);

        // criando texto da tela final
        gameState.textoFinal = this.add.text(
            config.width / 5,
            config.height / 3,
            'Parabéns, você coletou todas as estrelas! \n     Obrigado por jogar Frog Jumper!', {
            fontSize: '48px',
            color: "#000"
        });
    }
}