import { Markup } from 'telegraf';
import { TelegramButtonEnum } from './buttons.enum';

export function telegramButtons(phone: string) {
  return Markup.keyboard([
    Markup.button.callback(TelegramButtonEnum.location, phone),
    Markup.button.callback(TelegramButtonEnum.info, phone),
  ]);
}
