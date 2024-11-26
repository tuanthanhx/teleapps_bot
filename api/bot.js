const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config();

const version = 'v4';

const token = process.env.TELEGRAM_TOKEN;
const baseUrl = process.env.BASE_URL;

if (!token || !baseUrl) {
  console.error('Error: TELEGRAM_TOKEN and BASE_URL must be defined in the environment variables.');
  process.exit(1);
}

const bot = new TelegramBot(token, { webHook: true });

// Set webhook URL
bot.setWebHook(`${baseUrl}/api/bot${version}`);

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
  },
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

// Webhook route
app.post(`/api/bot${version}`, (req, res) => {
  console.log(req.body);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Health check route
app.get('/', (req, res) => {
  console.log('test ok');
  res.send('Bot server is running!');
});

// Start the server
const PORT = process.env.PORT || 5011;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Webhook set at ${baseUrl}/api/bot${version}`);
});
