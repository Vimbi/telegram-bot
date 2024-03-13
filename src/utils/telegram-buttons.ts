import { Markup } from 'telegraf';
import { TelegramButtonEnum } from './buttons.enum';

export function telegramButtons({
  phone,
  trackNumber,
}: {
  trackNumber: string;
  phone: string;
}) {
  return Markup.inlineKeyboard([
    Markup.button.callback(
      'Show location',
      `${TelegramButtonEnum.location}:${phone}`,
    ),
    Markup.button.callback(
      'Show route',
      `${TelegramButtonEnum.route}:${trackNumber}`,
    ),
  ]);
}
