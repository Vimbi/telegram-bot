import { registerAs } from '@nestjs/config';

export default registerAs('movizor', () => ({
  token: process.env.MOVIZOR_TOKEN,
  baseUrl: process.env.MOVIZOR_BASE_URL,
  getLastPositionUrl: process.env.MOVIZOR_GET_LAST_POSITION_URL,
}));
