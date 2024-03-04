class TitleScreen extends Phaser.Scene {
    constructor() {
        super({ key: "TitleScreen" });
    }

    preload() {

        for (i = 0; i < 1; i++) {
            console.log("tela inicial iniciou com sucesso");
        }

        // carregando a imagem do fundo da tela inicial
        this.load.image("bg1", "assets/bgHomeScreen.jpg");

        // carregando a imagem do botão play
        gameState.botaoPlay = this.load.image("botaoPlay", "assets/jogarBotao.png");

        //carregando a imagem dos comandos
        gameState.setas = this.load.image("setas", "assets/setas/setas.png");
    }

    create() {

        // criando a imagem do fundo
        this.add.image(config.width / 2, config.height / 2, "bg1").setScale(2);

        // criando a imagem do botão jogar
        gameState.botaoPlay = this.add.image(config.width / 2, config.height / 2, "botaoPlay").setScale(0.1);

        //criando comandos na tela
        gameState.setas = this.add.image(config.width / 2, config.height / 1.35, "setas").setScale(.4);

        // criando interatividade com o botão
        gameState.botaoPlay.setInteractive();

        // método usado para começar próxima cena ao clicar no botão jogar
        gameState.botaoPlay.on("pointerdown", () => {
            this.scene.stop("TitleScreen");
            this.scene.start("FirstScene")
        });

        // criando texto da tela inicial
        gameState.textoInicial = this.add.text(
            config.width / 2.55,
            config.height / 3,
            "Frog Jumper", {
            fontSize: "64px",
            color: "#000" //cor preta não funcionou
        });

        //criando mensagem dos comandos
        gameState.textoInicial = this.add.text(
            config.width / 2.28,
            config.height / 1.2,
            "Comandos", {
            fontSize: "48px",
            color: "#000", //cor preta não funcionou
            fontWeight: "bold"
        });
    }
}

var i;