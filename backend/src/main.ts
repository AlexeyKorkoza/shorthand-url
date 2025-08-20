import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from '@/modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('port') as string;
  const globalPrefix = configService.get('apiPrefix') as string;
  app.setGlobalPrefix(globalPrefix, {
    exclude: [':shortUrl'],
  });
  app.enableCors({
    origin: ['http://localhost:5173'],
  });

  await app.listen(port);
}
bootstrap();
