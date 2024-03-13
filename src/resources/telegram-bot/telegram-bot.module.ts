import { Logger, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafConfigService } from './telegram-bot-config.service';
import { HttpModule } from '@nestjs/axios';
import { MovizorModule } from '../movizor/movizor.module';
import { DmvModule } from '../dmv/dmv.module';

@Module({
  imports: [
    DmvModule,
    HttpModule.register({}),
    MovizorModule,
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigService,
    }),
  ],
  providers: [TelegramBotService, Logger],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
