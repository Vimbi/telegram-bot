import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  Ctx,
  Hears,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { catchError, firstValueFrom, map } from 'rxjs';
import { Context } from 'telegraf';
import { createErrorMessage } from '../../utils/create-error-message';
import { commonMsgs } from '../../shared/messages';
import { IGetPhoneResponse } from '../../types/get-phone-response.interface';
import { telegramButtons } from '../../utils/telegram-buttons';
import { TelegramButtonEnum } from '../../utils/buttons.enum';

@Injectable()
@Update()
export class TelegramBotService {
  private readonly _botName: string;
  private readonly _getPhoneUrl: string;
  private readonly _getPhoneToken: string;
  private readonly _logger = new Logger(TelegramBotService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this._botName = this.configService.get('telegramBot.name');
    this._getPhoneUrl = this.configService.get('dmv.getPhoneUrl');
    this._getPhoneToken = this.configService.get('dmv.getPhoneToken');
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
    await ctx.reply(commonMsgs.welcome);
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    console.log('!!!!', message);
    const response = await firstValueFrom<IGetPhoneResponse>(
      this.httpService
        .get(`${this._getPhoneUrl}?track-number=${message}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this._getPhoneToken}`,
          },
        })
        .pipe(
          map((response) => response.data),
          catchError(async (error) => {
            this._logger.error(
              createErrorMessage({
                error,
                customMessage: 'DMV get phone error',
              }),
            );
          }),
        ),
    );
    // if (!response?.phone) {
    //   return commonMsgs.trackNotFound;
    // }
    // TODO find location
    const location = { x: 55.751626, y: 37.619003 };
    await ctx.sendLocation(
      location.x,
      location.y,
      telegramButtons('(929) 555-43-93"'),
    );
  }

  @Action(TelegramButtonEnum.location)
  async getLocation(@Ctx() ctx: Context) {
    console.log('1111');
  }
}
