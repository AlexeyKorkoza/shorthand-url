import { Controller, Body, Param, ValidationPipe } from '@nestjs/common';

import { AuthService } from '@/modules/auth/services/auth.service';
import {
  type SignInDto,
  type SignUpDto,
  type UpdateProfileDto,
} from '@/modules/auth/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(@Body(ValidationPipe) registerDto: SignUpDto) {
    return this.authService.signUp(registerDto);
  }

  async login(@Body(ValidationPipe) loginDto: SignInDto) {
    return this.authService.signIn(loginDto);
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
}
