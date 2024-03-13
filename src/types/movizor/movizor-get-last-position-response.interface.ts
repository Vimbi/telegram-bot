import { MovizorRequestResultEnum } from '../../resources/movizor/movizor-request-result.enum';

export type TMovizorGetLastPositionResponse =
  | IMovizorGetLastPositionOkResponse
  | IMovizorGetLastPositionErrorResponse;

interface IMovizorGetLastPositionOkResponse {
  code: string;
  message: string;
  result: MovizorRequestResultEnum.success;
  data: {
    lon: string;
    lat: string;
    timestamp: number;
    timestamp_request: number;
    radius: number;
    distance: string;
    distance_forecast_time: string;
    distance_forecast_status: string;
    place: string;
    on_parking: boolean | null;
    route_status: string;
  };
}

interface IMovizorGetLastPositionErrorResponse {
  result: MovizorRequestResultEnum.error;
  code: number;
  message: string;
}
