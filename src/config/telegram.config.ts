import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
  name: process.env.TELEGRAM_BOT_NAME,
  token: process.env.TELEGRAM_BOT_TOKEN,
  webhookPath: process.env.TELEGRAM_BOT_WEBHOOK_PATH,
  webhookToken: process.env.TELEGRAM_BOT_WEBHOOK_TOKEN,

  apiUrl: process.env.TELEGRAM_BOT_API_URL,
  adminChatId: process.env.TELEGRAM_BOT_ADMIN_CHAT_ID,
  helpdeskChatId: process.env.TELEGRAM_BOT_HELPDESK_CHAT_ID,
  superAdminChatId: process.env.TELEGRAM_BOT_SUPER_ADMIN_CHAT_ID,
  proxyHost: process.env.TELEGRAM_BOT_PROXY_HOST,
  proxyPort: parseInt(process.env.TELEGRAM_BOT_PROXY_PORT, 10),
  proxyProtocol: process.env.TELEGRAM_BOT_PROXY_PROTOCOL,
  proxyLogin: process.env.TELEGRAM_BOT_PROXY_LOGIN,
  proxyPassword: process.env.TELEGRAM_BOT_PROXY_PASSWORD,
}));
