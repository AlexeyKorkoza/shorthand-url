import type { User } from "@db/prisma-client";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { isBefore } from "date-fns";

import { TokenService } from "@/core/services/token.service";
import { UserSessionService } from "@/core/services/user-session.service";
import type {
  GetUserDto,
  SignInDto,
  SignUpDto,
  UpdateProfileDto,
} from "@/modules/auth/dtos";
import type {
  AccessTokenPayload,
  AuthLoginResponse,
} from "@/modules/auth/interfaces";
import { AuthRepository } from "@/modules/auth/repositories/auth.repository";
import { PasswordService } from "@/modules/auth/services/password.service";
import { RefreshTokenService } from "@/modules/auth/services/refresh-token.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly tokenService: TokenService,
    private readonly userSessionService: UserSessionService,
  ) {}

  async signUp(registerDto: SignUpDto): Promise<GetUserDto> {
    try {
      const existingUser = await this.authRepository.findUserByEmail({
        email: registerDto.email,
      });

      if (existingUser) {
        throw new ConflictException("User with this email already exists");
      }

      const hashedPassword = await this.passwordService.hashPassword(
        registerDto.password,
      );

      const user = await this.authRepository.createUser({
        email: registerDto.email,
        password: hashedPassword,
      });

      return {
        id: user.id,
        createdAt: user.createdAt,
        email: user.email,
      };
    } catch (error) {
      Logger.error("Something went wrong when signing up", error);

      throw new HttpException(
        "Something went wrong when signing up",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /*async signIn(loginDto: SignInDto): Promise<AuthLoginResponse> {
    try {
      const user = await this.authRepository.findUserByEmail({
        email: loginDto.email,
      });

      if (!user) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const isPasswordValid = await this.passwordService.comparePasswords(
        loginDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid credentials");
      }

      const { id: userId } = user;
      const refreshToken = await this.tokenService.generateRefreshToken({
        id: userId,
      });
      if (!refreshToken) {
        throw new HttpException(
          "Something went wrong when creating refresh token",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.refreshTokenService.createRefreshToken(userId);

      const accessToken =
        await this.tokenService.generateAccessToken<AccessTokenPayload>({
          userId,
          email: user.email,
        });
      if (!accessToken) {
        throw new HttpException(
          "Something went wrong when creating access token",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      Logger.error("Something went wrong when signing in", error);

      throw new HttpException(
        "Something went wrong when signing in",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this.authRepository.findUserById({ id: userId });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      const updateData: {
        email?: string;
        password?: string;
      } = {};

      if (updateProfileDto.email) {
        const existingUser = await this.authRepository.findUserByEmail({
          email: updateProfileDto.email,
        });

        if (existingUser && existingUser.id !== userId) {
          throw new ConflictException("Email already in use");
        }

        updateData.email = updateProfileDto.email;
      }

      if (updateProfileDto.password) {
        updateData.password = await bcrypt.hash(updateProfileDto.password, 10);
      }

      const updatedUser = await this.authRepository.updateUser({
        id: userId,
        data: updateData,
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      return updatedUser;
    } catch (error) {
      Logger.error("Something went wrong when updating profile", error);

      throw new HttpException(
        "Something went wrong when updating profile",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProfile(
    userId: string,
  ): Promise<Omit<User, "password" | "updatedAt">> {
    try {
      const user = await this.authRepository.findUserById({
        id: userId,
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      Logger.error("Something went wrong when getting profile", error);

      throw new HttpException(
        "Something went wrong when getting profile",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refreshAccessToken({
    refreshToken,
    sessionId,
  }: {
    refreshToken: string;
    sessionId: string;
  }): Promise<{ accessToken: string }> {
    try {
      const userSession = await this.userSessionService.getSession(sessionId);
      if (!userSession) {
        throw new UnauthorizedException("Invalid session");
      }
      const { userId, email } = userSession;

      const foundRefreshToken = await this.refreshTokenService.findRefreshToken(
        { refreshToken, userId },
      );
      if (!foundRefreshToken) {
        throw new NotFoundException("Refresh token not found");
      }

      const expiresAtDate = new Date(foundRefreshToken.expiresAt);
      const currentDate = new Date();

      const isRefreshTokenExpired = isBefore(expiresAtDate, currentDate);
      if (isRefreshTokenExpired) {
        throw new HttpException(
          "Refresh token expired",
          HttpStatus.BAD_REQUEST,
        );
      }

      const accessToken =
        await this.tokenService.generateAccessToken<AccessTokenPayload>({
          userId,
          email,
        });

      return { accessToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      Logger.error("Something went wrong when refreshing access token", error);

      throw new HttpException(
        "Something went wrong when refreshing access token",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logoutUser({
    refreshToken,
    sessionId,
  }: {
    refreshToken: string;
    sessionId: string;
  }): Promise<void> {
    try {
      const userSession = await this.userSessionService.getSession(sessionId);
      if (!userSession) {
        throw new UnauthorizedException("Invalid session");
      }

      const { userId } = userSession;

      const foundRefreshToken = await this.refreshTokenService.findRefreshToken(
        { refreshToken, userId },
      );
      if (!foundRefreshToken) {
        throw new NotFoundException("Refresh token not found");
      }

      const { token_hash: tokenHash } = foundRefreshToken;

      await this.refreshTokenService.revokeRefreshToken(tokenHash);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      Logger.error("Something went wrong when logging out user", error);

      throw new HttpException(
        "Something went wrong when logging out user",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }*/
}
