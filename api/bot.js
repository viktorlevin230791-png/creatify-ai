import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN not set");
}

const bot = new TelegramBot(token);

// 👉 ОБРАБОТЧИК WEBHOOK (КРИТИЧЕСКИ ВАЖНО)
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  try {
    await bot.processUpdate(req.body);
    res.status(200).send("OK");
  } catch (err) {
    console.error("BOT ERROR:", err);
    res.status(500).send("BOT ERROR");
  }
}

// ===============================
// /start — IMAGE + WEBAPP
// ===============================
bot.onText(/\/start/, async (msg) => {
  await bot.sendPhoto(
    msg.chat.id,
    "https://raw.githubusercontent.com/viktorlevin230791-png/creatify-ai/main/lowe.png",
    {
      caption:
        "Creatify AI Studio\n\n" +
        "Private AI Visual Production\n\n" +
        "Нажмите кнопку ниже, чтобы открыть приложение.",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Открыть Creatify AI",
              web_app: {
                url: "https://viktorlevin230791-png.github.io/creatify-ai/"
              }
            }
          ]
        ]
      }
    }
  );
});

// ===============================
// 📩 WEBAPP DATA — PING
// ===============================
bot.on("message", async (msg) => {
  if (!msg.web_app_data) return;

  let data;
  try {
    data = JSON.parse(msg.web_app_data.data);
  } catch {
    return;
  }

  if (data.action === "ping_test") {
    await bot.sendMessage(
      msg.chat.id,
      `✅ PING OK\n\n` +
      `👤 Username: ${data.username}\n` +
      `🆔 User ID: ${data.user_id}\n` +
      `⏱ Time: ${data.time}\n` +
      `🎲 Random: ${data.rnd}`
    );
  }
});
