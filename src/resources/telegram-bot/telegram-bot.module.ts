import { Logger, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafConfigService } from './telegram-bot-config.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({}),
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
  ],
  providers: [TelegramBotService, Logger],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
