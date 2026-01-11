import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import {
  Body,
  Controller,
  Injectable,
  Param,
  Req,
  ValidationPipe,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { SignUpRequestDto } from "@repo/api";
import {
  EXCHANGE_KEYS,
  QUEUE_KEYS,
  ROUTING_KEYS,
} from "@/core/constants/rabbitmq.constant";
import type { AppConfig } from "@/core/interfaces";
import { UserSessionService } from "@/core/services/user-session.service";
import type {
  SignInDto,
  SignUpDto,
  UpdateProfileDto,
} from "@/modules/auth/dtos";
import { AuthService } from "@/modules/auth/services/auth.service";

@Injectable()
export class AuthHandleService {
  private readonly isProduction: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<AppConfig>,
    private readonly userSessionService: UserSessionService,
  ) {
    this.isProduction = process.env.NODE_ENV === "production";
  }

  @RabbitSubscribe({
    exchange: EXCHANGE_KEYS.AUTH,
    routingKey: ROUTING_KEYS.AUTH.SIGN_UP,
    queue: QUEUE_KEYS.AUTH.SIGN_UP,
  })
  async signup(signupDto: SignUpRequestDto) {
    return this.authService.signUp(signupDto);
  }

  // async login(
  //   @Req() request: Request,
  //   @Body(ValidationPipe) loginDto: SignInDto,
  // ) {
  //   // const { accessToken, refreshToken, user } =
  //   //   await this.authService.signIn(loginDto);
  //   //
  //   // const { id: userId, email, createdAt } = user;
  //   // const userAgent = request.headers["user-agent"] ?? "";
  //   // const ipAddress = request.ip ?? "";
  //   //
  //   // const generatedExistedSessionId = this.userSessionService.generateSessionId(
  //   //   userAgent,
  //   //   ipAddress,
  //   // );
  //   // const existingSessionId =
  //   //   await this.userSessionService.findSessionByUserAndDevice(
  //   //     generatedExistedSessionId,
  //   //   );
  //   //
  //   // const userData = { id: userId, email, createdAt };
  //   // if (existingSessionId) {
  //   //   // this.authService.setCookiesInSignIn({
  //   //   //   accessToken,
  //   //   //   isProduction: this.isProduction,
  //   //   //   refreshToken,
  //   //   //   response,
  //   //   //   sessionId: generatedExistedSessionId.split(':').at(1),
  //   //   // });
  //   //
  //   //   return {
  //   //     user: userData,
  //   //     message: "Already logged in from this device",
  //   //   };
  //   // }
  //   //
  //   // const sessionId = await this.userSessionService.createSession({
  //   //   ipAddress,
  //   //   userAgent,
  //   //   user,
  //   // });
  //   //
  //   // return {
  //   //   user: userData,
  //   // };
  // }

  // async getProfile(@Param("id") userId: string) {
  //   // return this.authService.getProfile(userId);
  // }
  //
  // async updateProfile(
  //   @Param("id") userId: string,
  //   @Body(ValidationPipe) updateProfileDto: UpdateProfileDto,
  // ) {
  //   // return this.authService.updateProfile(userId, updateProfileDto);
  // }
  //
  // async logout(@Param("id") userId: string) {
  //   // await this.authService.logoutUser({ refreshToken, sessionId });
  //   // await this.userSessionService.destroySession(sessionId);
  // }
  //
  // async refreshAccessToken(@Param("id") userId: string) {
  //   // return this.authService.refreshAccessToken({ userId });
  // }
}
