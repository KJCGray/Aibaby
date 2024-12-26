require("dotenv").config(); // 加载环境变量
const axios = require("axios");

const LMSTUDIO_API_URL = process.env.LMSTUDIO_API_URL;

// 发送消息到 LM Studio 的函数
async function sendMessageToLmStudio(prompt) {
  try {
    const response = await axios.post(`${LMSTUDIO_API_URL}/api/v1/chat`, {
      prompt,
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = response.data?.choices[0]?.text?.trim();
    return reply || "对不起，没有收到有效的回复。";
  } catch (error) {
    console.error("请求 LM Studio 时出错:", error.message);
    return "发生了错误，请稍后重试。";
  }
}

async function callGpt (input) {
  const userInput = input;
  console.log("用户:", userInput);

  const reply = await sendMessageToLmStudio(userInput);
  console.log("模型:", reply);
}

const mapGenerate = '你是一個遊戲設計助手，需要為一個遊戲地圖生成障礙物的位置以圍出一條路。地圖的螢幕尺寸為 800（寬）× 1000（高），每個障礙物的長寬為 5，障礙物之間的距離必須為 1（測量自障礙物的外邊緣）。請生成 20 個障礙物的位置，形成一條可供通行的路徑，並確保路徑至少包含一個直角轉彎。最後，以 [[x1, y1], [x2, y2], ...] 的格式回傳這些障礙物的左上角座標。';
const dailyGreet = '請對一個年齡介於3-6歲的幼童進行每日他打開遊戲時的問候';
const gameIntro = '針對"小兔子現在要小朋友陪伴一同去找胡蘿蔔的種子"生成一個30字左右的前導小故事'
const gameEnd = '遊戲結束了，請對幫忙找到胡蘿蔔種子的小朋友進行鼓勵'
const littleGameSuccess = '請針對小遊戲成功時給予10字左右的鼓勵'
const littleGameFail = '請針對小遊戲失敗時給予10字左右的鼓勵'