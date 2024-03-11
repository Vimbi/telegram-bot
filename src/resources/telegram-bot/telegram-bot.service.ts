import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Hears, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class TelegramBotService {
  private readonly _botName: string;
  private readonly _logger = new Logger(TelegramBotService.name);
  constructor(private readonly configService: ConfigService) {
    this._botName = this.configService.get('telegramBot.name');
  }

  /**
   * Get bot connection link
   * @returns link
   */

  public async getBotConnectionLink() {
    return `https://t.me/${this._botName}`;
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Welcome');
  }

  @Hears('1')
  async hearsHi(ctx: Context) {
    this._logger.log('HEARS 1', ctx.botInfo);
    await ctx.reply('Hey there');
  }
}
