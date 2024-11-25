# Set Telegram Webhook
curl -F "url=https://bot-20241126.teleapps.store/api/botv4" https://api.telegram.org/botYOUR_TELEGRAM_TOKEN/setWebhook

# Delete Telegram Webhook
curl -X POST https://api.telegram.org/botYOUR_TELEGRAM_TOKEN/deleteWebhook

# Test Ping

```
GET https://bot-20241126.teleapps.store
```

# Test Post

```
POST https://bot-20241126.teleapps.store/api/botv4
```

POST Body:
```
{
  "update_id": 686586677,
  "message": {
    "message_id": 413,
    "from": {
      "id": 1862408896,
      "is_bot": false,
      "first_name": "Tuan Thanh",
      "last_name": "Ngo",
      "language_code": "en"
    },
    "chat": {
      "id": 1862408896,
      "first_name": "Tuan Thanh",
      "last_name": "Ngo",
      "type": "private"
    },
    "date": 1732517180,
    "text": "🤝 Join our community"
    // "text": "📢 Join our X"
  }
}
```
