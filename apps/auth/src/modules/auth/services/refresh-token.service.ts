import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { RefreshTokenEntity } from "@repo/api";
import * as bcrypt from "bcrypt";
import type { AppConfig } from "@/core/interfaces";
import { TokenService } from "@/core/services/token.service";
import { RefreshTokenRepository } from "@/modules/auth/repositories/refresh-token.repository";

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  private hashRefreshToken(refreshToken: string): Promise<string> {
    const refreshTokenSaltRounds = this.configService.get<number>(
      "refreshToken.saltRounds",
      { infer: true },
    );

    return bcrypt.hash(refreshToken, refreshTokenSaltRounds);
  }

  async findRefreshToken({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: UserId;
  }): Promise<RefreshTokenEntity | null> {
    const activeRefreshTokens =
      await this.refreshTokenRepository.findAllActiveRefreshTokens(userId);
    let validStoredToken: RefreshTokenEntity | null = null;

    for (const activeRefreshToken of activeRefreshTokens) {
      const isMatch = await bcrypt.compare(
        refreshToken,
        activeRefreshToken.token_hash,
      );

      if (isMatch) {
        validStoredToken = activeRefreshToken;
        break;
      }
    }

    return validStoredToken;
  }

  async createRefreshToken(userId: UserId): Promise<RefreshTokenEntity> {
    const refresh_token = await this.tokenService.generateRefreshToken({
      id: userId,
    });
    const refreshTokenExpiresIn = this.configService.get<number>(
      "refreshToken.expiresIn",
      { infer: true },
    );

    const token_hash = await this.hashRefreshToken(refresh_token);
    const expiresAt = new Date(Date.now() + refreshTokenExpiresIn * 1000);
    const body: Pick<
      RefreshTokenEntity,
      "userId" | "token_hash" | "expiresAt"
    > = {
      userId,
      token_hash,
      expiresAt,
    };

    return this.refreshTokenRepository.createRefreshToken(body);
  }

  async revokeRefreshToken(tokenHash: string): Promise<RefreshTokenEntity> {
    return this.refreshTokenRepository.revokeRefreshToken(tokenHash);
  }
}
