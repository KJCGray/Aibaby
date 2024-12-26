export default {
  key: "rabbitForCarrot",
  preload: function () {
    // 加載新場景的資源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("rabbitRight", "/Characters/Rabbit_Right.png");
    this.load.image("rabbitDown", "/Characters/Rabbit_Down.png");
    this.load.image("rabbitLeft", "/Characters/Rabbit_Left.png");
    this.load.image("rabbitUp", "/Characters/Rabbit_Up.png");
    this.load.image("supermarket", "/Objects/supermarket.png");
    this.load.image("bush", "/Objects/Bush.png");
    this.load.image("love", "/UI/Status_Love.png");
    this.load.image("endSquare", "/UI/ButtonTemplate.png");
    this.load.image("fenceLeft", "/Fences/Fence_Left.png");
    this.load.image("fenceTop", "/Fences/Fence_Top.png");
    this.load.image("fenceBottom", "/Fences/Fence_Bottom.png");
    this.load.image("fenceRight", "/Fences/Fence_Right.png");
    this.load.image("fenceHorizontal", "/Fences/Fence_Horizontal.png");
    this.load.image("fenceTopLeft", "/Fences/Fence_Corner_Top_Left.png");
    this.load.image("fenceBottomRight", "/Fences/Fence_Corner_Bottom_Right.png");
    this.load.image("fenceVertical", "/Fences/Fence_Vertical.png");
    this.load.image("arrowRight", "/Terrain_Common/Arrow_Right.png");
    this.load.image("arrowUp", "/Terrain_Common/Arrow_Up.png");
    // 載入音樂
    this.load.audio("audio", "/audio/happyTiming.mp3");
  },
  create: function () {
    // 取得當前螢幕的寬高
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    // 動態設置背景
    const tileSprite = this.add.tileSprite(
      0,
      screenHeight * 0.3,
      screenWidth,
      screenHeight * 0.7,
      "grassTexture"
    );
    tileSprite.setOrigin(0, 0).setDepth(-1);

    const sky = this.add.tileSprite(0, 0, screenWidth, screenHeight * 0.3, "sky");
    sky.setOrigin(0, 0).setDepth(-2);

    // 創建兔子角色並設置深度，並保存到場景變數中
    this.rabbit = this.add.sprite(screenWidth * 0.08, screenHeight * 0.85, "rabbitDown");
    this.rabbit.setDepth(11);

    // 根據畫面動態設置柵欄及其他物件
    this.add.sprite(screenWidth * 0.02, screenHeight * 0.7, "fenceLeft");
    this.add.sprite(screenWidth * 0.119, screenHeight * 0.7, "fenceHorizontal");
    this.add.sprite(screenWidth * 0.218, screenHeight * 0.7, "fenceTopLeft").setDepth(10);
    this.add.sprite(screenWidth * 0.218, screenHeight * 0.595, "fenceVertical").setDepth(5);
    this.add.sprite(screenWidth * 0.218, screenHeight * 0.49, "fenceBottomRight").setDepth(1);
    this.add.sprite(screenWidth * 0.318, screenHeight * 0.49, "fenceHorizontal");
    this.add.sprite(screenWidth * 0.418, screenHeight * 0.49, "fenceHorizontal");
    this.add.sprite(screenWidth * 0.518, screenHeight * 0.49, "fenceHorizontal");
    this.add.sprite(screenWidth * 0.618, screenHeight * 0.49, "fenceRight");

    this.add.sprite(screenWidth * 0.47, screenHeight * 0.9, "fenceBottom").setDepth(10);
    this.add.sprite(screenWidth * 0.47, screenHeight * 0.795, "fenceBottomRight").setDepth(5);
    this.add.sprite(screenWidth * 0.569, screenHeight * 0.795, "fenceHorizontal").setDepth(1);
    this.add.sprite(screenWidth * 0.668, screenHeight * 0.795, "fenceRight");

    // 動態設置蘿蔔和其他物件
    this.supermarket = this.add
      .sprite(screenWidth * 0.75, screenHeight * 0.6, "supermarket")
      .setScale(0.3)
      .setDepth(12);
    this.bush = this.add.sprite(screenWidth * 0.15, screenHeight * 0.35, "bush");
    this.arrowRight = this.add.sprite(screenWidth * 0.16, screenHeight * 0.87, "arrowRight");
    this.arrowUp = this.add.sprite(screenWidth * 0.41, screenHeight * 0.79, "arrowUp");
    this.arrowUp = this.add.sprite(screenWidth * 0.5, screenHeight * 0.61, "arrowRight");

    // 設定背景音樂，並讓它們循環播放
    this.audio = this.sound.add("audio", { loop: true, volume: 0.5 });

    // 播放第一首音樂
    this.audio.play();

    // 隱藏的 love 圖片，開始時不顯示
    this.love = this.add.sprite(
      this.rabbit.x + screenWidth * 0.07,
      this.rabbit.y - screenHeight * 0.07,
      "love"
    );
    this.love.setVisible(false);

    // 結尾框UI_SquareFrame
    this.endSquare = this.add
      .sprite(screenWidth * 0.5, screenHeight * 0.5, "endSquare")
      .setScale(1.7, 1.5)
      .setDepth(15);
    this.endSquare.setVisible(false);
    this.endText = this.add
      .text(screenWidth * 0.5, screenHeight * 0.5, "做得好！\n進入下一關", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`, // 根據螢幕大小動態設置文字
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

    // 新增說明文字
    const text = this.add
      .text(screenWidth * 0.5, screenHeight * 0.1, "幫助小兔子進入超市找到胡蘿蔔", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`, // 根據螢幕大小動態設置文字
        color: "#000",
        padding: {
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5);

    // 初始化 move 變數，1=上、2=下、3=左、4=右
    this.move = 0;

    // 按鍵事件綁定
    this.input.keyboard.on("keydown-ONE", () => {
      this.move = 1;
    });

    this.input.keyboard.on("keydown-TWO", () => {
      this.move = 2;
    });

    this.input.keyboard.on("keydown-THREE", () => {
      this.move = 3;
    });

    this.input.keyboard.on("keydown-FOUR", () => {
      this.move = 4;
    });

    // 前往小遊戲
    const vegetable = this.add
      .text(screenWidth * 0.7, screenHeight * 0.1, "找蔬菜", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.03}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 5, bottom: 5, left: 5, right: 5 },
        borderRadius: 5,
      })
      .setInteractive();

    vegetable.on("pointerdown", () => {
      this.audio.stop();
      this.scene.start("vegetableSelect"); // 切換至下一場景
    });

    const balloon = this.add
      .text(screenWidth * 0.77, screenHeight * 0.1, "找氣球", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.03}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 5, bottom: 5, left: 5, right: 5 },
        borderRadius: 5,
      })
      .setInteractive();

    balloon.on("pointerdown", () => {
      this.audio.stop();
      this.scene.start("balloonColor"); // 切換至下一場景
    });

    const find = this.add
      .text(screenWidth * 0.84, screenHeight * 0.1, "找房子", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.03}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 5, bottom: 5, left: 5, right: 5 },
        borderRadius: 5,
      })
      .setInteractive();

    find.on("pointerdown", () => {
      this.audio.stop();
      this.scene.start("findHouse"); // 切換至下一場景
    });

    
    const findsound = this.add
      .text(screenWidth * 0.91, screenHeight * 0.1, "誰的叫聲?", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.03}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 5, bottom: 5, left: 5, right: 5 },
        borderRadius: 5,
      })
      .setInteractive();

    findsound.on("pointerdown", () => {
      this.audio.stop();
      this.scene.start("whosSound"); // 切換至下一場景
    });
    
    const countFruit = this.add
      .text(screenWidth * 0.91, screenHeight * 0.15, "幾顆水果?", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.03}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 5, bottom: 5, left: 5, right: 5 },
        borderRadius: 5,
      })
      .setInteractive();

    countFruit.on("pointerdown", () => {
      this.audio.stop();
      this.scene.start("howManyFruits"); // 切換至下一場景
    });

    // 添加返回主頁的按鈕
    const backButton = this.add
      .text(screenWidth * 0.85, screenHeight * 0.2, "返回主頁", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        backgroundColor: "#000",
        color: "#fff",
        padding: { top: 10, bottom: 10, left: 20, right: 20 },
        borderRadius: 5,
      })
      .setInteractive();

    backButton.on("pointerdown", () => {
      this.scene.start("startScene"); // 返回主頁場景
    });
  },
  update: function () {
    if (this.move === 1) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitUp");
        this.tweens.add({
          targets: this.rabbit,
          y: this.rabbit.y - 40, // 向上移動
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
            this.rabbit.setTexture("rabbitDown");
            this.move = 0;
          },
        });
      }
    }
    if (this.move === 2) {
      if (this.rabbit) {
        this.tweens.add({
          targets: this.rabbit,
          y: this.rabbit.y + 40, // 向下移動
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
            this.move = 0;
          },
        });
      }
    }
    if (this.move === 3) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitLeft");
        this.tweens.add({
          targets: this.rabbit,
          x: this.rabbit.x - 88, // 向左移動
          duration: 1500,
          ease: "Power2",
          onComplete: () => {
            this.rabbit.setTexture("rabbitDown");
            this.move = 0;
          },
        });
      }
    }
    if (this.move === 4) {
      if (this.rabbit) {
        this.rabbit.setTexture("rabbitRight");
        this.tweens.add({
          targets: this.rabbit,
          x: this.rabbit.x + 88, // 向右移動
          duration: 1500,
          ease: "Power2",
          onComplete: () => {
            this.rabbit.setTexture("rabbitDown");
            this.move = 0;
          },
        });
      }
    }

    // 檢查兔子和蘿蔔之間的距離
    const distance = Phaser.Math.Distance.Between(
      this.rabbit.x,
      this.rabbit.y,
      this.supermarket.x,
      this.supermarket.y
    );

    // 當兔子靠近蘿蔔時顯示 love
    if (distance < 250) {
      this.audio.stop();
      this.scene.start("vegetableSelect");
      // this.love.setPosition(this.rabbit.x + 70, this.rabbit.y - 50);
      // this.love.setVisible(true); // 顯示 love
      // this.endSquare.setVisible(true);
      // this.endText.setVisible(true);
    } else {
      this.love.setVisible(false); // 隱藏 love
    }
  },
};
