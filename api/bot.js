import TelegramBot from "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token);
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  try {
    const update = req.body;
    await bot.processUpdate(update);

    // /start
    if (update.message?.text === "/start") {
      await bot.sendPhoto(
        update.message.chat.id,
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

    // WebApp PING
    if (update.message?.web_app_data) {
      const data = JSON.parse(update.message.web_app_data.data);

      if (data.action === "ping_test") {
        await bot.sendMessage(
          update.message.chat.id,
          `✅ PING OK

👤 Username: ${data.username}
🆔 User ID: ${data.user_id}
⏱ Time: ${data.time}
🎲 Random: ${data.rnd}`
        );
      }
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "bot error" });
  }
}
