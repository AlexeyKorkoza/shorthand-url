import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { PasswordService } from '@/modules/auth/services/password.service';
import { RefreshTokenService } from '@/modules/auth/services/refresh-token.service';
import { RefreshTokenRepository } from '@/modules/auth/repositories/refresh-token.repository';
import { CoreModule } from '@/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PasswordService,
    RefreshTokenService,
    RefreshTokenRepository,
  ],
})
export class AuthModule {}
