import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as appRoot from 'app-root-path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { configuration } from './logging/configuration';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { DEVELOPMENT } from './utils/constants/common-constants';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(configuration),
  });
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      validateCustomDecorators: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useStaticAssets(path.join(appRoot.path, 'static'), {
    prefix: '/static/',
  });

  const logger = app.get(Logger);
  app.useGlobalInterceptors(new LoggingInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  const nodeEnv = configService.get('app.nodeEnv');

  const swagger = new DocumentBuilder()
    .setTitle('DMV-telegram-bot trade')
    .setDescription('DMV-telegram-bot API description')
    .setVersion('1.0')
    .addBearerAuth();

  if (nodeEnv !== DEVELOPMENT) swagger.addServer('/api');

  const swaggerConfig = swagger.build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  app.use(helmet());
  app.use(cookieParser());

  const telegramBot = app.get(getBotToken(configService.get('telegram.token')));

  logger.log('TELEGRAM BOT', JSON.stringify(telegramBot));
  app.use(
    await telegramBot.createWebhook({
      domain: configService.get('app.backendDomain'),
      path: configService.get('telegram.webhookPath'),
    }),
  );

  await app.listen(configService.get('app.port'));
  return configService.get('app.port');
}
bootstrap().then((PORT) =>
  Logger.log(`App is running on http://localhost:${PORT}`),
);
