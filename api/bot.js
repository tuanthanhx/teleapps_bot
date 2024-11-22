const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const version = 'v4';

const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { webHook: true });

// Set webhook URL
bot.setWebHook(`${process.env.BASE_URL}/api/bot${version}`);

// Reply Keyboard
const replyKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '🚀 Apps Center', web_app: { url: 'https://teleapps.store/' } }],
      [{ text: '🤝 Join our community' }],
      [{ text: '📢 Join our X' }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  }
};

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Respond to specific button presses
  if (text === '🤝 Join our community') {
    bot.sendMessage(chatId, 'Join us here: https://t.me/TeleAppsCommunity');
  } else if (text === '📢 Join our X') {
    bot.sendMessage(chatId, 'Join us here: https://x.com/TeleApps_store');
  } else {
    bot.sendMessage(chatId, 'Welcome on board!', replyKeyboard);
  }
});

// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Welcome on board!', replyKeyboard);
// });

// bot.onText(/🤝 Join our community/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Join us here: https://t.me/TeleAppsCommunity');
// });

// bot.onText(/📢 Join our X/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Join us here: https://x.com/TeleApps_store');
// });

const app = express();
app.use(express.json());

app.post(`/api/bot${version}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
