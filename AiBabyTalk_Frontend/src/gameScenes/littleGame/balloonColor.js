export default {
  key: "balloonColor",
  preload: function () {
    this.load.image("sky", "/background/Bg.png");
    this.load.image("endSquare", "/UI/UI_SquareFrame.png");
    this.load.image("redBalloon", "/GameObj/redBalloon.png");
    this.load.image("blueBalloon", "/GameObj/blueBalloon.png");
    this.load.image("yellowBalloon", "/GameObj/yellowBalloon.png");
  },
  create: function () {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
    sky.setOrigin(0, 0).setDepth(-2);

    // 設定互動的蔬菜圖案
    this.redBalloon = this.add
      .sprite(screenWidth * 0.2, screenHeight * 0.6, "redBalloon")
      .setScale(0.5)
      .setInteractive();
    this.blueBalloon = this.add
      .sprite(screenWidth * 0.5, screenHeight * 0.6, "blueBalloon")
      .setScale(0.5)
      .setInteractive();
    this.yellowBalloon = this.add
      .sprite(screenWidth * 0.8, screenHeight * 0.6, "yellowBalloon")
      .setScale(0.5)
      .setInteractive();

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

    this.redBalloon.on("pointerdown", () => {
      text = "答對了！這是紅色氣球";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
    });

    this.blueBalloon.on("pointerdown", () => {
      text = "不對喔，這個是藍色氣球";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
    });

    this.yellowBalloon.on("pointerdown", () => {
      text = "不對喔，這個是黃色氣球";
      this.endText.setText(text);
      this.endSquare.setVisible(true);
      this.endText.setVisible(true);
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
      this.scene.start("rabbitForCarrot"); // 開始遊戲
    });
  },
};
