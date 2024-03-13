import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { createErrorMessage } from '../../utils/create-error-message';
import { errorMsgs } from '../../shared/error-messages';
import { TMovizorGetLastPositionResponse } from '../../types/movizor/movizor-get-last-position-response.interface';

@Injectable()
export class MovizorService {
  private readonly _logger = new Logger(MovizorService.name);
  private readonly _token: string;
  private readonly _getLasPositionUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this._token = this.configService.get('movizor.token');
    this._getLasPositionUrl = this.configService.get(
      'movizor.getLastPositionUrl',
    );
  }

  /**
   * Information about the last location recorded in the movizor system
   * @param phone phone
   * @returns location
   */

  public async getLastPosition(phone: string) {
    return await firstValueFrom<TMovizorGetLastPositionResponse>(
      this.httpService
        .get(`${this._getLasPositionUrl}?phone=${phone}&key=${this._token}`)
        .pipe(
          map((response) => response.data),
          catchError(async (error) => {
            this._logger.error(
              createErrorMessage({
                error,
                customMessage: errorMsgs.getLastPosition,
              }),
            );
          }),
        ),
    );
  }
}
