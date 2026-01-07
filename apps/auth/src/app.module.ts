import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { CoreModule } from '@/core/core.module';

import configuration from '@/configuration';
import {
  validateConfig,
  validationSchema,
} from '@/core/schemas/configuration.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: validateConfig,
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    JwtModule.register({}),
    AuthModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
