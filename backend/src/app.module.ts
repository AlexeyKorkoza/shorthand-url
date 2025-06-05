import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import configuration from '@/configuration';
import { ShortUrlModule } from '@/modules/short-url/short-url.module';
import { PrismaService } from '@/services/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ShortUrlModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
