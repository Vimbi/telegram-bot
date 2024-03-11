import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import appConfig from './config/app.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import throttlerConfig from './config/throttler.config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfigService } from './throttler/throttler-config.service';
import { TelegramBotModule } from './resources/telegram-bot/telegram-bot.module';
import { APP_GUARD } from '@nestjs/core';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafConfigService } from './resources/telegram-bot/telegram-bot-config.service';
import telegramConfig from './config/telegram.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, throttlerConfig, telegramConfig],
    }),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
    // EventsModule,
    ScheduleModule.forRoot(),
    TelegramBotModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
