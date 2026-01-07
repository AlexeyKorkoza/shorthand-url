import { Controller, Body, Param, ValidationPipe, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from '@/modules/auth/services/auth.service';
import {
  type SignInDto,
  type SignUpDto,
  type UpdateProfileDto,
} from '@/modules/auth/dtos';
import { type AppConfig } from '@/core/interfaces';
import { UserSessionService } from '@/core/services/user-session.service';

@Controller('auth')
export class AuthController {
  private readonly isProduction: boolean;

  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly authService: AuthService,
    private readonly userSessionService: UserSessionService,
  ) {
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  async register(@Body(ValidationPipe) registerDto: SignUpDto) {
    return this.authService.signUp(registerDto);
  }

  async login(
    @Req() request: Request,
    @Body(ValidationPipe) loginDto: SignInDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.signIn(loginDto);

    const { id: userId, email, createdAt } = user;
    const userAgent = request.headers['user-agent'] ?? '';
    const ipAddress = request.ip ?? '';

    const generatedExistedSessionId = this.userSessionService.generateSessionId(
      userAgent,
      ipAddress,
    );
    const existingSessionId =
      await this.userSessionService.findSessionByUserAndDevice(
        generatedExistedSessionId,
      );

    const userData = { id: userId, email, createdAt };
    if (existingSessionId) {
      // this.authService.setCookiesInSignIn({
      //   accessToken,
      //   isProduction: this.isProduction,
      //   refreshToken,
      //   response,
      //   sessionId: generatedExistedSessionId.split(':').at(1),
      // });

      return {
        user: userData,
        message: 'Already logged in from this device',
      };
    }

    const sessionId = await this.userSessionService.createSession({
      ipAddress,
      userAgent,
      user,
    });

    return {
      user: userData,
    };
  }

  async getProfile(@Param('id') userId: string) {
    return this.authService.getProfile(userId);
  }

  async updateProfile(
    @Param('id') userId: string,
    @Body(ValidationPipe) updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(userId, updateProfileDto);
  }

  async logout(@Param('id') userId: string) {
    return this.authService.logoutUser({ userId });
  }

  async refreshAccessToken(@Param('id') userId: string) {
    return this.authService.refreshAccessToken({ userId });
  }
}
