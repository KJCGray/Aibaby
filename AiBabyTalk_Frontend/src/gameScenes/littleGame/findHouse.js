export default {
    key: "findHouse",
    preload: function () {
      this.load.image("sky", "/background/Bg.png");
      this.load.image("endSquare", "/UI/ButtonTemplate.png");
      this.load.image("house", "/GameObj/house.png");
      this.load.audio("audioGuitar", "/audio/happyJazzGuitar.mp3");
    },
    create: function () {
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;
  
      const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
      sky.setOrigin(0, 0).setDepth(-2);
  
      // 設定互動的蔬菜圖案
      this.shouse = this.add
        .sprite(screenWidth * 0.3, screenHeight * 0.6, "house")
        .setScale(0.1)
        .setInteractive();
      this.mhouse = this.add
        .sprite(screenWidth * 0.5, screenHeight * 0.6, "house")
        .setScale(0.3)
        .setInteractive();
      this.lhouse = this.add
        .sprite(screenWidth * 0.8, screenHeight * 0.6, "house")
        .setScale(0.5)
        .setInteractive();

          // 設定背景音樂，並讓它們循環播放
      this.audioGuitar = this.sound.add("audioGuitar", { loop: true, volume: 0.5 });
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
  
      this.shouse.on("pointerdown", () => {
        text = "答對了！這是最小的房子";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
      });
  
      this.mhouse.on("pointerdown", () => {
        text = "不對喔，這個是第二大的房子";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
      });
  
      this.lhouse.on("pointerdown", () => {
        text = "不對喔，這個是最大的房子";
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
        this.audioGuitar.stop();
        this.scene.start("rabbitForCarrot"); // 開始遊戲
      });
    },
  };
  