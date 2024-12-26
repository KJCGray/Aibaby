export default {
  key: "vegetableSelect",
  preload: function () {
    this.load.image("sky", "/background/Bg.png");
    this.load.image("hcarrot", "/GameObj/hCarrot.png");
    this.load.image("hcucumber", "/GameObj/hCucumber.png");
    this.load.image("htomato", "/GameObj/hTomato.png");
    this.load.image("redX", "/Objects/RedX.png");
    this.load.image("endSquare", "/UI/ButtonTemplate.png");
    this.load.audio("audioGuitar", "/audio/happyJazzGuitar.mp3");
    this.load.audio("correct", "/audio/correct.mp3");
    this.load.audio("wrong", "/audio/wrong.mp3");
  },
  create: function () {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
    sky.setOrigin(0, 0).setDepth(-2);

    // 設定互動的蔬菜圖案
    this.hcarrot = this.add
      .sprite(screenWidth * 0.2, screenHeight * 0.6, "hcarrot")
      .setScale(0.7)
      .setInteractive();
    this.hcucumber = this.add
      .sprite(screenWidth * 0.5, screenHeight * 0.6, "hcucumber")
      .setScale(0.7)
      .setInteractive();
    this.htomato = this.add
      .sprite(screenWidth * 0.8, screenHeight * 0.6, "htomato")
      .setScale(0.5)
      .setInteractive();

    this.audioGuitar = this.sound.add("audioGuitar", { loop: true, volume: 0.5 });
    this.correct = this.sound.add("correct", { loop: false, volume: 0.5 });
    this.wrong = this.sound.add("wrong", { loop: false, volume: 0.5 });
    this.audioGuitar.play();

    // 結果框和文字
    this.endSquare = this.add
      .sprite(screenWidth * 0.5, screenHeight * 0.5, "endSquare")
      .setScale(1, 1.5)
      .setDepth(15);
    this.endSquare.setVisible(false);

    this.endText = this.add
      .text(screenWidth * 0.5, screenHeight * 0.5, "", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
        color: "#fff",
        fontStyle: "bold",
        padding: {
          top: 10,
          bottom: 10,
          left: 20,
          right: 20,
        },
      })
      .setOrigin(0.5)
      .setDepth(16);
    this.endText.setVisible(false);

    // 點擊事件設定
    let text = ""; // 儲存要顯示的文字

    this.hcarrot.on("pointerdown", () => {
      text = "答對了！這是胡蘿蔔";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
      this.redX.setVisible(true);
      this.correct.play();
    });

    this.hcucumber.on("pointerdown", () => {
      text = "不對喔，這個是小黃瓜";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
      this.redX.setVisible(true);
      this.wrong.play();
    });

    this.htomato.on("pointerdown", () => {
      text = "不對喔，這個是番茄";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
      this.redX.setVisible(true);
      this.wrong.play();
    });

    // 顯示redX，並放置在endSquare的右上方
    this.redX = this.add
      .sprite(
        this.endSquare.x + this.endSquare.displayWidth / 2 - 25, // 右邊位置
        this.endSquare.y - this.endSquare.displayHeight / 2 + 25, // 上方位置
        "redX"
      )
      .setScale(0.05)
      .setDepth(16)
      .setVisible(false)
      .setInteractive();

    // 點擊redX後隱藏endSquare和redX
    this.redX.on("pointerdown", () => {
      this.endSquare.setVisible(false);
      this.endText.setVisible(false);
      this.redX.setVisible(false);
    });

    // 顯示主頁按鈕
    const startGameButton = this.add
      .text(screenWidth * 0.8, screenHeight * 0.2, "回第一關", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 10, bottom: 10, left: 20, right: 20 },
        borderRadius: 5,
      })
      .setOrigin(0.5)
      .setInteractive();

    startGameButton.on("pointerdown", () => {
      this.audioGuitar.stop();
      this.scene.start("rabbitForCarrot"); // 開始遊戲
    });
  },
};
