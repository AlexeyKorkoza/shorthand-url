import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '@/configuration';
import { ShortUrlModule } from '@/modules/short-url/short-url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ShortUrlModule,
  ],
})
export class AppModule {}
