import { Logger, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';

@Module({
  providers: [TelegramBotService, Logger],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
