import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "@/configuration";
import { ShortUrlModule } from "@/modules/short-url/short-url.module";
import { CoreModule } from "@/core/core.module";
import {
  validateConfig,
  validationSchema,
} from "@/core/schemas/configuration.schema";

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
    ShortUrlModule,
  ],
})
export class AppModule {}
