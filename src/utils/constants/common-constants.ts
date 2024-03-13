import { TelegramButtonEnum } from '../buttons.enum';

export const DEVELOPMENT = 'development';
export const PRODUCTION = 'production';
export const LOCATION_REG_EXP = new RegExp(`^${TelegramButtonEnum.location}`);
export const ROUTE_REG_EXP = new RegExp(`^${TelegramButtonEnum.route}`);
