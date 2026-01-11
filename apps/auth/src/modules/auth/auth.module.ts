import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CoreModule } from "@/core/core.module";
import { RefreshTokenRepository } from "@/modules/auth/repositories/refresh-token.repository";
import { PasswordService } from "@/modules/auth/services/password.service";
import { RefreshTokenService } from "@/modules/auth/services/refresh-token.service";
import { AuthHandleService } from "./controllers/auth-handle.service";
import { AuthRepository } from "./repositories/auth.repository";
import { AuthService } from "./services/auth.service";

@Module({
  imports: [CoreModule, ConfigModule],
  controllers: [],
  providers: [
    AuthHandleService,
    AuthService,
    AuthRepository,
    PasswordService,
    RefreshTokenService,
    RefreshTokenRepository,
  ],
})
export class AuthModule {}
