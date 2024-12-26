export default {
    key: "whosSound",
    preload: function () {
      this.load.image("sky", "/background/Bg.png");
      this.load.image("realDog", "/GameObj/realDog.png");
      this.load.image("realCat", "/GameObj/realCat.png");
      this.load.image("realHourse", "/GameObj/realHourse.png");
      this.load.image("redX", "/Objects/RedX.png");
      this.load.image("audioPic", "/audio.png");
      this.load.image("endSquare", "/UI/ButtonTemplate.png");
      this.load.audio("catSound", "/audio/catSound.mp3");
      this.load.audio("correct", "/audio/correct.mp3");
      this.load.audio("wrong", "/audio/wrong.mp3");
    },
    create: function () {
      const screenWidth = this.cameras.main.width;
      const screenHeight = this.cameras.main.height;
  
      const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight, "sky");
      sky.setOrigin(0, 0).setDepth(-2);

      
      this.audioPic = this.add
        .sprite(screenWidth * 0.1, screenHeight * 0.1, "audioPic")
        .setScale(0.05)
        .setInteractive();
      this.realDog = this.add
        .sprite(screenWidth * 0.2, screenHeight * 0.6, "realDog")
        .setScale(0.7)
        .setInteractive();
      this.realCat = this.add
        .sprite(screenWidth * 0.5, screenHeight * 0.6, "realCat")
        .setScale(0.7)
        .setInteractive();
      this.realHourse = this.add
        .sprite(screenWidth * 0.8, screenHeight * 0.6, "realHourse")
        .setScale(0.5)
        .setInteractive();
  
      this.catSound = this.sound.add("catSound", { loop: false, volume: 0.5 });
      this.correct = this.sound.add("correct", { loop: false, volume: 0.5 });
      this.wrong = this.sound.add("wrong", { loop: false, volume: 0.5 });
      this.catSound.play();
  
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
      
      this.audioPic.on("pointerdown", () => {
        this.catSound.play();
      });
  
      this.realDog.on("pointerdown", () => {
        text = "答錯了，這是狗狗，再猜一次吧~";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.wrong.play();
      });
  
      this.realCat.on("pointerdown", () => {
        text = "答對了！是貓咪的聲音~";
        this.endText.setText(text);
        this.endSquare.setVisible(true);
        this.endText.setVisible(true);
        this.redX.setVisible(true);
        this.correct.play();
      });
  
      this.realHourse.on("pointerdown", () => {
        text = "答錯了，這是馬兒，再猜一次吧~";
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
        this.catSound.stop();
        this.scene.start("rabbitForCarrot"); // 開始遊戲
      });
    },
  };
  