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
    const layerPlataforma = map
      .createLayer("plataformasTile", tileset, 0, -430)
      .setScale(4.229); // 1.596 ou 1.7
    const layerBackground = map
      .createLayer("fundoTile", tileset, 0, -430)
      .setScale(4.229); //1.596 ou 1.73

    //habilitando limites das bordas do mundo para o gameState.sapo
    this.physics.world.bounds.height = map.heightInPixels;
    this.physics.world.bounds.width = map.widthInPixels;

    //criando personagem gameState.sapo e adicionando física
    gameState.sapo = this.physics.add.sprite(100, 100, "sapo").setScale(2);

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

    //criando câamera para seguir jogador
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels,
      true
    );
    this.cameras.main.startFollow(gameState.sapo, true);
    this.cameras.main.setZoom(1);

    //habitando a colisão entre as plataformas e o gameState.sapo
    this.physics.add.collider(gameState.sapo, layerPlataforma);
    layerPlataforma.setCollisionBetween(
      1105,
      1104,
      1258,
      864,
      718,
      1193,
      661,
      719,
      722
    );

    console.log("Level 1 completou carregamento com sucesso");
  }

  update() {
    const { left, right, up } = this.teclado;

    if (up.isDown) {
      gameState.sapo.setVelocityY(-40);
      if (up.isDown) {
        // && última direção do gameState.sapo foi para direita
        // gameState.sapo mantém-se para direita e pula com a animação virada para direita
        gameState.sapo.play("jump", true);
        gameState.sapo.setFlip(false, false);
      } else if (up.isDown) {
        // && última direção do gameState.sapo foi para esquerda
        // gameState.sapo mantém-se para esquerda e pula com a animação virada para esquerda
        gameState.sapo.play("jump", true);
        gameState.sapo.setFlip(true, false);
      }
    } else if (right.isDown) {
      gameState.sapo.setVelocityX(40);
      gameState.sapo.setFlip(false, false);
      gameState.sapo.play("run", true);
    } else if (left.isDown) {
      gameState.sapo.setVelocityX(-40);
      gameState.sapo.setFlip(true, false);
      gameState.sapo.play("run", true);
    }
  }
}

var teclado;
var sapo;
