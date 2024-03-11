import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';

@Injectable()
export class TelegrafConfigService implements TelegrafOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      launchOptions: {
        webhook: {
          domain: this.configService.get('app.backendDomain'),
          path: this.configService.get('telegram.webhookPath'),
          secretToken: this.configService.get('telegram.webhookToken'),
        },
      },
      token: this.configService.get('telegram.token'),
    } as TelegrafModuleOptions;
  }
}
