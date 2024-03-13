import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, map } from 'rxjs';
import { createErrorMessage } from '../../utils/create-error-message';
import { IGetPhoneResponse } from '../../types/get-phone-response.interface';

@Injectable()
export class DmvService {
  private readonly _logger = new Logger(DmvService.name);
  private readonly _getPhoneUrl: string;
  private readonly _getPhoneToken: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this._getPhoneUrl = this.configService.get('dmv.getPhoneUrl');
    this._getPhoneToken = this.configService.get('dmv.getPhoneToken');
  }

  /**
   * Get the phone by tracking number
   * @param trackNumber track number
   * @returns phone
   */

  public async getPhoneByTrackNumber(trackNumber: string) {
    return await firstValueFrom<IGetPhoneResponse>(
      this.httpService
        .get(`${this._getPhoneUrl}?track-number=${trackNumber}`, {
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
  }
}
