import { Logger, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafConfigService } from './telegram-bot-config.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
  ],
  providers: [TelegramBotService, Logger],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
