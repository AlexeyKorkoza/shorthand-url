import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Short URL API')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(port);
}
bootstrap();
