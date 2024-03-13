import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { TelegramBotModule } from './resources/telegram-bot/telegram-bot.module';
import telegramConfig from './config/telegram.config';
import dmvConfig from './config/dmv.config';
import { MovizorModule } from './resources/movizor/movizor.module';
import movizorConfig from './config/movizor.config';
import { DmvModule } from './resources/dmv/dmv.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dmvConfig, movizorConfig, telegramConfig],
    }),
    DmvModule,
    MovizorModule,
    TelegramBotModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [],
})
export class AppModule {}
