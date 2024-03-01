class FirstScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FirstScene'})
    }

    preload() {

        //carregando imagem das plataformas
        gameState.plataforma = this.load.image('plataforma', 'assets/mundo/tijolos.png');

        //carregando chão do jogo
        gameState.chao = this.load.image('chao', 'assets/mundo/chao');

        //carregando sprites do personagem sapo
        gameState.sapo = this.load.spritesheet('sapo', 'assets/personagem/spriteSheetSapoPulo.png', 
        { frameWidth: 336, frameHeight: 48 });
    }

    create() {

        //criando input das teclas de direcional
        teclado = this.input.keyboard.createCursorKeys();

        //criando personagem sapo
        gameState.sapo = this.physics.add.sprite(225, 450,'sapo').setScale(.5);

        //habilitando limites das bordas do mundo para o gameState.sapo
        gameState.sapo.setCollideWorldBounds(true);

        //habitando a colisão entre as plataformas e o gameState.sapo
        this.physics.add.collider(gameState.sapo, gameState.plataforma);

        //criando animação do sapo pulando
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumber('sapo', { start: 1, end: 7 }),
            frameRate: 10,
            repeat: -1,
        })

        //criando o chão dentro do jogo
        chao = this.physics.add.staticImage(
        larguraJogo / 1.25,
        alturaJogo / 2,
        "chao"
        );
    }

    update() {

    }
}

var plataforma;