import { Body, Controller, Post } from "@nestjs/common";
import type { SignUpRequestDto } from "@repo/api";

import { AuthService } from "@/modules/gateway/services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signup(@Body() signupDto: SignUpRequestDto) {
    await this.authService.register(signupDto);
  }
}
