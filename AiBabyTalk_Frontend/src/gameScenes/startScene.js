let cloud01, cloud02, cloud03;
let loginOrRegist;
let startBtn, startText; // 将按钮和文本定义为全局变量
let selectedAnimal; // 用于跟踪已选择的动物
let confirmBox, confirmText; // 确认框和确认文本
let confirmYesBtn, confirmNoBtn; // 确认和再考虑按钮

export default {
  key: "startScene",
  preload: function () {
    // 预载入资源
    this.load.image("grassTexture", "/background/Grass_Texture.png");
    this.load.image("兔子", "/Characters/Rabbit_Down.png");
    this.load.image("貓咪", "/Characters/Cat_Down.png");
    this.load.image("小雞", "/Characters/Chick_Down.png");
    this.load.image("狐狸", "/Characters/Fox_Down.png");
    this.load.image("小豬", "/Characters/Pig_Down.png");
    this.load.image("sky", "/background/Bg.png");
    this.load.image("cloud01", "/background/Cloud_01.png");
    this.load.image("cloud02", "/background/Cloud_02.png");
    this.load.image("cloud03", "/background/Cloud_03.png");
    this.load.image("btnTemplate", "/UI/ButtonTemplate.png");
    this.load.image("stone", "/Objects/Boulders.png");
    this.load.image("tree", "/Objects/Tree.png");
    this.load.image("fountain", "/Objects/Fountain.png");
    this.load.image("statusLove", "/UI/Status_Love.png"); // 载入状态图标
    this.load.image("uiSquareFrame", "/UI/UI_SquareFrame.png"); // 载入底板
    this.load.image("barGreen", "/UI/Bar_Green.png"); // 载入底板
    this.load.image("barRed", "/UI/Bar_Red.png"); // 载入底板
  },

  create: function () {
    const screenWidth = this.cameras.main.width;
    const screenHeight = this.cameras.main.height;

    // 动态设置背景
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

    // 云的设置
    cloud01 = this.add.sprite(screenWidth, screenHeight * 0.15, "cloud01").setScale(0.3);
    cloud02 = this.add.sprite(screenWidth * 0.6, screenHeight * 0.2, "cloud02").setScale(0.3);
    cloud03 = this.add.sprite(screenWidth * 0.35, screenHeight * 0.2, "cloud03").setScale(0.3);
    loginOrRegist = 0; // 角色选择界面

    // 其他物件的位置根据画布动态设置
    this.add.sprite(screenWidth * 0.85, screenHeight * 0.8, "stone");
    this.add.sprite(screenWidth * 0.1, screenHeight * 0.4, "tree");
    this.add.sprite(screenWidth * 0.2, screenHeight * 0.4, "tree");
    this.add.sprite(screenWidth * 0.3, screenHeight * 0.4, "tree");
    this.add.sprite(screenWidth * 0.85, screenHeight * 0.4, "fountain");

    // 动态设置按钮与文字
    startBtn = this.add.sprite(screenWidth * 0.5, screenHeight * 0.5, "btnTemplate").setScale(0.5);
    startText = this.add
      .text(screenWidth * 0.5, screenHeight * 0.5, "開始遊戲", {
        fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
        color: "#ff3333",
        fontStyle: "bold",
        fontFamily: "Arial",
        padding: { top: 10, bottom: 10 },
      })
      .setOrigin(0.5)
      .setStroke("#ffffff", 5);

    // 设置按钮互动效果
    startBtn.setInteractive();
    startBtn.on("pointerover", () => {
      startBtn.setScale(0.6);
      startText.setScale(1.05);
    });
    startBtn.on("pointerout", () => {
      startBtn.setScale(0.5);
      startText.setScale(1);
    });

    // 点击按钮进行角色选择
    startBtn.on("pointerdown", () => {
      if (loginOrRegist === 0) {
        startBtn.setVisible(false); // 隐藏按钮
        startText.setVisible(false); // 隐藏文字
        this.add
          .text(screenWidth * 0.5, screenHeight * 0.2, "選擇你的小動物吧", {
            fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
            color: "#000",
            fontStyle: "bold",
            fontFamily: "Arial",
          })
          .setOrigin(0.5); // 显示新文本
      }
    });

    // 添加动物并设置点击事件
    const animals = ["貓咪", "兔子", "小雞", "狐狸", "小豬"];
    const positions = [0.3, 0.4, 0.5, 0.6, 0.7];
    animals.forEach((animal, index) => {
      const animalSprite = this.add.sprite(
        screenWidth * positions[index],
        screenHeight * 0.7,
        animal
      );
      animalSprite.setInteractive();
      animalSprite.on("pointerdown", () => {
        if (loginOrRegist === 0) {
          selectedAnimal = animal; // 记录选择的动物

          // 记录原始位置
          const originalX = animalSprite.x;
          const originalY = animalSprite.y;
          const originalDepth = animalSprite.depth; // 记录原始深度

          // 显示确认框
          confirmBox = this.add
            .sprite(screenWidth / 2, screenHeight / 2, "btnTemplate")
            .setScale(1.25, 3);
          confirmText = this.add
            .text(screenWidth / 2, screenHeight / 2 - 50, `確定要選擇${selectedAnimal}嗎？`, {
              fontSize: `${Math.min(screenWidth, screenHeight) * 0.05}px`,
              color: "#000",
              fontStyle: "bold",
              fontFamily: "Arial",
            })
            .setOrigin(0.5);

          // 确定按钮
          confirmYesBtn = this.add
            .sprite(screenWidth / 2 - 80, screenHeight / 2 + 30, "barGreen")
            .setScale(0.45, 0.6);
          const confirm = this.add
            .text(screenWidth / 2 - 80, screenHeight / 2 + 30, "確定", {
              fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
              color: "#fff",
              fontStyle: "bold",
              fontFamily: "Arial",
            })
            .setOrigin(0.5);

          // 再考虑一下按钮
          confirmNoBtn = this.add
            .sprite(screenWidth / 2 + 80, screenHeight / 2 + 30, "barRed")
            .setScale(0.45, 0.6);
          const confirmNo = this.add
            .text(screenWidth / 2 + 80, screenHeight / 2 + 30, "再考慮一下", {
              fontSize: `${Math.min(screenWidth, screenHeight) * 0.04}px`,
              color: "#fff",
              fontStyle: "bold",
              fontFamily: "Arial",
            })
            .setOrigin(0.5);

          // 讓選擇的動物跳動並移動到新位置
          animalSprite.setDepth(20);
          this.tweens.add({
            targets: animalSprite,
            x: screenWidth * 0.3, // 移動到新位置 X
            y: screenHeight * 0.5, // 移動到新位置 Y
            duration: 500, // 動畫持續時間
            onComplete: () => {
              // 在新位置跳動
              const animalTween = this.tweens.add({
                targets: animalSprite,
                y: animalSprite.y - 20, // 向上移動 20 像素
                duration: 500, // 動畫持續時間
                yoyo: true, // 動畫反向執行
                repeat: -1, // 無限次重複
              });

              // 确定按钮的点击事件
              confirmYesBtn.setInteractive();
              confirmYesBtn.on("pointerdown", () => {
                // 处理选择动物的逻辑
                console.log(`选择了动物: ${selectedAnimal}`);
                confirmBox.destroy(); // 关闭确认框
                confirmText.destroy(); // 关闭确认文本
                confirmYesBtn.destroy(); // 关闭确认按钮
                confirmNoBtn.destroy(); // 关闭再考虑按钮
                confirm.destroy();
                confirmNo.destroy();
                animalTween.stop(); // 停止跳动动画
              });

              // 再考虑一下按钮的点击事件
              confirmNoBtn.setInteractive();
              confirmNoBtn.on("pointerdown", () => {
                // 返回原始位置
                this.tweens.add({
                  targets: animalSprite,
                  x: originalX, // 返回原始位置 X
                  y: originalY, // 返回原始位置 Y
                  duration: 500, // 動畫持續時間
                  onComplete: () => {
                    animalSprite.setDepth(originalDepth);
                    animalTween.stop(); // 停止跳动动画
                  },
                });
                confirmBox.destroy(); // 关闭确认框
                confirmText.destroy(); // 关闭确认文本
                confirmYesBtn.destroy(); // 关闭确认按钮
                confirmNoBtn.destroy(); // 关闭再考虑按钮
                confirm.destroy();
                confirmNo.destroy();
              });
            },
          });
        }
      });
    });
  },

  update: function (time, delta) {
    // 背景云的移动
    cloud01.x -= 0.5 * (delta / 16.67);
    if (cloud01.x < -cloud01.width) cloud01.x = this.cameras.main.width;

    cloud02.x -= 0.5 * (delta / 16.67);
    if (cloud02.x < -cloud02.width) cloud02.x = this.cameras.main.width;

    cloud03.x -= 0.5 * (delta / 16.67);
    if (cloud03.x < -cloud03.width) cloud03.x = this.cameras.main.width;
  },
};
