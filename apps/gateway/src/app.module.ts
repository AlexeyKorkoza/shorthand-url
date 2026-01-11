import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "@/configuration";
import { CoreModule } from "@/core/core.module";
import {
  validateConfig,
  validationSchema,
} from "@/core/schemas/configuration.schema";
import { GatewayModule } from "@/modules/gateway/gateway.module";
import { ShortUrlModule } from "@/modules/short-url/short-url.module";

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
    GatewayModule,
    ShortUrlModule,
  ],
})
export class AppModule {}
