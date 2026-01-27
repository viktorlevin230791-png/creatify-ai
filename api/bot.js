import TelegramBot from "node-telegram-bot-api";

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = "https://creatify-ai-rust.vercel.app";

if (!BOT_TOKEN) {
  console.error("BOT_TOKEN is missing");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🎁 Бесплатный AI-инструмент\n\nНажми кнопку ниже 👇",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 Получить доступ",
              web_app: { url: WEBAPP_URL }
            }
          ]
        ]
      }
    }
  );
});

console.log("BOT STARTED");
