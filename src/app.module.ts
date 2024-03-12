import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { TelegramBotModule } from './resources/telegram-bot/telegram-bot.module';
import telegramConfig from './config/telegram.config';
import dmvConfig from './config/dmv.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dmvConfig, telegramConfig],
    }),
    TelegramBotModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [],
})
export class AppModule {}
