import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "@/configuration";
import { CoreModule } from "@/core/core.module";
import {
  validateConfig,
  validationSchema,
} from "@/core/schemas/configuration.schema";
import { AuthModule } from "@/modules/auth/auth.module";

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
    CoreModule,
    AuthModule,
  ],
})
export class AppModule {}
