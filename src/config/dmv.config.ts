import { registerAs } from '@nestjs/config';

export default registerAs('dmv', () => ({
  getPhoneUrl: process.env.DMV_GET_PHONE_URL,
  getPhoneToken: process.env.DMV_GET_PHONE_TOKEN,
  routePageUrl: process.env.DMV_ROUTE_PAGE_URL,
}));
