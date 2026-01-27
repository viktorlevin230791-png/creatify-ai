import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';

// ====== НАСТРОЙКИ ======
const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBAPP_URL = 'https://creatify-ai-rust.vercel.app';

// ======================
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  const caption = `
✨ <b>Creatify AI</b>

Получи <b>бесплатный AI-инструмент</b> для:
• нейрофото
• AI-промптов
• креаторской работы

🔓 Доступ открывается <b>автоматически</b> после подписки на канал.
`;

  await bot.sendPhoto(
    chatId,
    fs.createReadStream('./welcome.jpg'), // ← твоя картинка
    {
      caption,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🎁 Получить бесплатный AI-инструмент',
              web_app: {
                url: WEBAPP_URL
              }
            }
          ],
          [
            {
              text: '📢 Наш Telegram-канал',
              url: 'https://t.me/neyrolooms'
            }
          ]
        ]
      }
    }
  );
});

// fallback (если напишут что-то ещё)
bot.on('message', (msg) => {
  if (msg.text && msg.text !== '/start') {
    bot.sendMessage(
      msg.chat.id,
      'Напиши /start, чтобы получить доступ к AI-инструменту 👇'
    );
  }
});
