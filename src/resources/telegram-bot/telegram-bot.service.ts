import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Action, Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { commonMsgs } from '../../shared/messages';
import { telegramButtons } from '../../utils/telegram-buttons';
import {
  LOCATION_REG_EXP,
  ROUTE_REG_EXP,
} from '../../utils/constants/common-constants';
import { createTrackNumberInfoMessage } from '../../utils/create-track-number-info-message';
import { MovizorService } from '../movizor/movizor.service';
import { MovizorRequestResultEnum } from '../movizor/movizor-request-result.enum';
import { errorMsgs } from '../../shared/error-messages';
import { DmvService } from '../dmv/dmv.service';
import * as moment from 'moment';

@Injectable()
@Update()
export class TelegramBotService {
  private readonly _logger = new Logger(TelegramBotService.name);
  private readonly _routePageUrl: string;
  constructor(
    private readonly dmvService: DmvService,
    private readonly configService: ConfigService,
    private readonly movizorService: MovizorService,
  ) {
    this._routePageUrl = this.configService.get('dmv.routePageUrl');
  }

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(commonMsgs.welcome);
  }

  @On('text')
  async getMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    const trackNumber = message.trim();
    const getPhoneResponse = await this.dmvService.getPhoneByTrackNumber(
      trackNumber,
    );
    if (!getPhoneResponse?.phone) {
      return commonMsgs.trackNotFound;
    }
    const getLastPositionResponse = await this.movizorService.getLastPosition(
      getPhoneResponse.phone,
    );
    if (getLastPositionResponse.result === MovizorRequestResultEnum.success) {
      const {
        place,
        timestamp_request,
        route_status,
        distance,
        distance_forecast_status,
        distance_forecast_time,
      } = getLastPositionResponse.data;
      await ctx.replyWithHTML(
        createTrackNumberInfoMessage({
          trackNumber,
          status: route_status,
          lastRequest: moment
            .unix(timestamp_request)
            .format('DD.MM.YYYY hh:mm:ss'),
          left: distance,
          location: place,
          distance_forecast_status,
          distance_forecast_time,
        }),
        telegramButtons({
          phone: getPhoneResponse.phone,
          trackNumber,
        }),
      );
    } else {
      this._logger.error(
        errorMsgs.getLocation(getLastPositionResponse.message),
      );
      await ctx.reply(commonMsgs.getLocationError);
    }
  }

  /**
   * Button handler for getting location by phone number
   * @param ctx context
   * @returns location or error message
   */

  @Action(LOCATION_REG_EXP)
  async getLocation(@Ctx() ctx) {
    const phone = ctx.update.callback_query.data.split(':')[1];
    const response = await this.movizorService.getLastPosition(phone);
    if (response.result === MovizorRequestResultEnum.success) {
      await ctx.sendLocation(response.data.lat, response.data.lon);
    } else {
      this._logger.error(errorMsgs.getLocation(response.message));
      await ctx.reply(commonMsgs.getLocationError);
    }
  }

  @Action(ROUTE_REG_EXP)
  async getLocation1(@Ctx() ctx) {
    const trackNumber = ctx.update.callback_query.data.split(':')[1];
    await ctx.reply(`${this._routePageUrl}?track-number=${trackNumber}`);
  }
}
