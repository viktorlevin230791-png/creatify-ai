export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  const token = process.env.BOT_TOKEN;
  if (!token) {
    return res.status(500).send("BOT_TOKEN not set");
  }

  const update = req.body;

  // ---------------------------
  // /start
  // ---------------------------
  if (update.message?.text === "/start") {
    const chatId = update.message.chat.id;

    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo:
          "https://raw.githubusercontent.com/viktorlevin230791-png/creatify-ai/main/lowe.png",
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
      })
    });

    return res.status(200).send("OK");
  }

  // ---------------------------
  // WEB APP PING
  // ---------------------------
  if (update.message?.web_app_data) {
    const chatId = update.message.chat.id;

    let data;
    try {
      data = JSON.parse(update.message.web_app_data.data);
    } catch {
      return res.status(200).send("OK");
    }

    if (data.action === "ping_test") {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text:
            `✅ PING OK\n\n` +
            `👤 Username: ${data.username}\n` +
            `🆔 User ID: ${data.user_id}\n` +
            `⏱ Time: ${data.time}\n` +
            `🎲 Random: ${data.rnd}`
        })
      });
    }
  }

  return res.status(200).send("OK");
}
