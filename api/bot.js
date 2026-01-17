import TelegramBot from "node-telegram-bot-api";

export default async function handler(req, res) {
  // Telegram присылает POST-запросы
  if (req.method !== "POST") {
    res.status(200).send("OK");
    return;
  }

  const token = process.env.BOT_TOKEN;
  if (!token) {
    console.error("BOT_TOKEN not found");
    res.status(500).send("No token");
    return;
  }

  const bot = new TelegramBot(token);

  const update = req.body;

  try {
    // ===== /start =====
    if (update.message?.text === "/start") {
      const chatId = update.message.chat.id;

      await bot.sendPhoto(
        chatId,
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
                    url: "https://creatify-ai-rust.vercel.app/"
                  }
                }
              ]
            ]
          }
        }
      );
    }

    // ===== WEBAPP sendData =====
    if (update.message?.web_app_data?.data) {
      const chatId = update.message.chat.id;
      const data = JSON.parse(update.message.web_app_data.data);

      // 🔎 PING
      if (data.action === "ping_test") {
        await bot.sendMessage(
          chatId,
          `✅ PING OK\n\n` +
          `👤 Username: ${data.username || "—"}\n` +
          `🆔 User ID: ${data.user_id || "—"}\n` +
          `⏱ Time: ${data.time}\n` +
          `🎲 Random: ${data.rnd}`
        );
      }
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("BOT ERROR:", err);
    res.status(200).send("OK");
  }
}
