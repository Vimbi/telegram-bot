import { ICreateTrackNumberInfoMessage } from '../types/create-track-number-info-message.interface';

export const createTrackNumberInfoMessage = ({
  trackNumber,
  status,
  lastRequest,
  left,
  location,
  distance_forecast_status,
  distance_forecast_time,
}: ICreateTrackNumberInfoMessage) => {
  let message = `Трек-номер: <b>${trackNumber}</b>\n`;
  if (status) {
    message = message.concat(`Статус: <b>${status}</b>\n`);
  }
  if (lastRequest) {
    message = message.concat(`Последний запрос: <b>${lastRequest}</b>\n`);
  }
  message = message.concat(`Местоположение: <b>${location}</b>\n`);
  if (left && distance_forecast_status && distance_forecast_time) {
    const forecastStatus =
      distance_forecast_status === 'ok' ? 'Успевает' : 'Опаздывает';
    message = message.concat(
      `Осталось: ${left} км, ~${distance_forecast_time}, ${forecastStatus}`,
    );
  }
  return message;
};
