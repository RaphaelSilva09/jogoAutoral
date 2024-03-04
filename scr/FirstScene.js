class FirstScene extends Phaser.Scene {
  constructor() {
    super({ key: "FirstScene" });
  }

  preload() {
    // confirmação de que o a primeira fase carregou
    console.log("Level 1 iniciou carregamento com sucesso");

    //carregando o mapa do jogo
    this.load.image("caves", "assets/Tileset/cavesofgallet.png");
    this.load.tilemapTiledJSON("cenario", "assets/TileSet/tileMap.json");

    //carregando sprites do personagem gameState.sapo
    gameState.sapo = this.load.spritesheet(
      "sapo",
      "assets/personagem/spriteSheetSapoPulo.png",
      { frameWidth: 48, frameHeight: 48 }
    );

    // carregando sprites da estrela
    gameState.estrela = this.load.spritesheet(
      "estrela",
      "assets/estrela.png",
      { frameWidth: 32, frameHeight: 32 }
    )
  }

  create() {
    //criando input das teclas de direcional
    this.teclado = this.input.keyboard.createCursorKeys();

    //criando mapa do jogo
    const map = this.make.tilemap({
      key: "cenario",
      tileWidth: 8,
      tileHeight: 8,
    });

    //adicionando as camadas do Tile como objetos distintos
    const tileset = map.addTilesetImage("cavesofgallet", "caves");
    const layerBackground = map
      .createLayer("fundoTile", tileset, window.innerWidth / 3.2, 0)
      .setScale(2); //1.596 ou 1.73
    const layerPlataforma = map
      .createLayer("plataformasTile", tileset, window.innerWidth / 3.2, 0);

    map.setCollisionBetween(1, 9999, true, "plataformasTile");
    layerPlataforma.setScale(2); //4.229

    //habilitando limites das bordas do mundo para o gameState.sapo
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    //criando personagem gameState.sapo e adicionando física
    gameState.sapo = this.physics.add.sprite(1200, 820, "sapo").setScale(1.2);

    //criando animação do gameState.sapo parado
    gameState.sapo.anims.create({
      key: "idle",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("sapo", {
        start: 0,
        end: 2,
      }),
    });

    //criando animação do gameState.sapo pulando
    gameState.sapo.anims.create({
      key: "jump",
      repeat: 0,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("sapo", {
        start: 0,
        end: 6,
      }),
    });

    //criando animação dos gameState.sapo andando
    gameState.sapo.anims.create({
      key: "run",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("sapo", {
        start: 0,
        end: 6,
      }),
    });

    //criado ícones das gameState.estrela
    gameState.estrela = this.physics.add.sprite(700, 720, "estrela").setScale(.8);
    gameState.estrela1 = this.physics.add.sprite(1300, 260, "estrela").setScale(.8);
    gameState.estrela2 = this.physics.add.sprite(970, 420, "estrela").setScale(.8);

    //criando animação dos gameState.sapo andando
    gameState.estrela.anims.create({
      key: "idleStar",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("estrela", {
        start: 0,
        end: 12,
      }),
    });

    gameState.estrela1.anims.create({
      key: "idleStar",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("estrela", {
        start: 0,
        end: 12,
      }),
    });

    gameState.estrela2.anims.create({
      key: "idleStar",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("estrela", {
        start: 0,
        end: 12,
      }),
    });

    // habilitando animação da estrela
    gameState.estrela.anims.play("idleStar");
    gameState.estrela1.anims.play("idleStar");
    gameState.estrela2.anims.play("idleStar");


    //habitando a colisão entre as plataformas e o gameState.sapo
    this.physics.add.collider(gameState.sapo, layerPlataforma);

    //habitando a colisão entre as plataformas e o gameState.estrela
    this.physics.add.collider(gameState.estrela, layerPlataforma);
    this.physics.add.collider(gameState.estrela1, layerPlataforma);
    this.physics.add.collider(gameState.estrela2, layerPlataforma);

    // criando método de coletar estrelas
    this.physics.add.overlap(gameState.sapo, gameState.estrela, collectStar);
    this.physics.add.overlap(gameState.sapo, gameState.estrela1, collectStar1);
    this.physics.add.overlap(gameState.sapo, gameState.estrela2, collectStar2);

    // ajustando colisão do sapo
    gameState.sapo.body.setSize(20, 20);
    gameState.sapo.body.setOffset(gameState.sapo.width / 4, gameState.sapo.height / 3.8);

    // configurando placar
    gameState.scoreText = this.add.text(620, 30, 'pontuação: 0', { fontSize: '32px' });

    console.log("Level 1 completou carregamento com sucesso");
  }

  update() {

    // Controle de pulo do gameState.sapo
    const onGround = gameState.sapo.body.onFloor();

    if (this.teclado.up.isDown && onGround) {
      gameState.sapo.anims.play("jump", true);
      gameState.sapo.setVelocityY(-250);
    } // não consegui descobrir porque, mas sapo não faz animação de pulo

    // Controle de movimento do gameState.sapo
    if (this.teclado.left.isDown) {
      gameState.sapo.setVelocityX(-100);
      gameState.sapo.anims.play("run", true);
      gameState.sapo.flipX = true;
    } else if (this.teclado.right.isDown) {
      gameState.sapo.setVelocityX(100);
      gameState.sapo.anims.play("run", true);
      gameState.sapo.flipX = false;
    } else {
      gameState.sapo.setVelocityX(0);
      gameState.sapo.anims.play("idle");
    }

    if (gameState.score === 3) {
      this.scene.stop('FirstScene');
      this.scene.start('EndScene');
    }
  }
}

function collectStar(player, estrela) {
  estrela.disableBody(true, true);
  gameState.score += 1;
  gameState.scoreText.setText('Pontuação: ' + gameState.score);
}

function collectStar1(player, estrela1) {
  estrela1.disableBody(true, true);
  gameState.score += 1;
  gameState.scoreText.setText('Pontuação: ' + gameState.score);
}

function collectStar2(player, estrela2) {
  estrela2.disableBody(true, true);
  gameState.score += 1;
  gameState.scoreText.setText('Pontuação: ' + gameState.score);
}