import { registerAs } from '@nestjs/config';

export default registerAs('telegram', () => ({
  name: process.env.TELEGRAM_BOT_NAME,
  token: process.env.TELEGRAM_BOT_TOKEN,
}));
