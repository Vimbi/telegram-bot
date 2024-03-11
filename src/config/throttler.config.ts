import { registerAs } from '@nestjs/config';

export default registerAs('throttler', () => ({
  ttl: parseInt(process.env.THROTTLER_SECONDS, 10) || 60,
  limit: parseInt(process.env.THROTTLER_LIMIT, 10) || 60,
}));
