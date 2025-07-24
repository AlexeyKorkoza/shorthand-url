import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '@/configuration';
import { AppController } from '@/modules/app/app.controller';
import { AppService } from '@/modules/app/app.service';
import { ShortUrlModule } from '@/modules/short-url/short-url.module';
import { AnalyticsModule } from '@/modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ShortUrlModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
