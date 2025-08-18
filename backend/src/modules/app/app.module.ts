import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '@/configuration';
import { AppController } from '@/modules/app/app.controller';
import { AppService } from '@/modules/app/app.service';
import { ShortUrlModule } from '@/modules/short-url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ShortUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
