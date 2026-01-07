import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { TokenService } from '@/core/services/token.service';
import { RefreshTokenRepository } from '@/modules/auth/repositories/refresh-token.repository';
// import { type RefreshTokenEntity } from '@repo/api';
import { type AppConfig } from '@/core/interfaces';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  private hashRefreshToken(refreshToken: string): Promise<string> {
    const refreshTokenSaltRounds = this.configService.get<number>(
      'refreshToken.saltRounds',
      { infer: true },
    );

    return bcrypt.hash(refreshToken, refreshTokenSaltRounds);
  }

  async findRefreshToken({
    refreshToken,
    userId,
  }: {
    refreshToken: string;
    userId: number;
    /*RefreshTokenEntity*/
  }): Promise<any> {
    const activeRefreshTokens =
      await this.refreshTokenRepository.findAllActiveRefreshTokens(userId);
    let validStoredToken: /*RefreshTokenEntity*/ any | null = null;

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

  /*RefreshTokenEntity*/
  async createRefreshToken(userId: number): Promise<any> {
    const refresh_token = await this.tokenService.generateRefreshToken({
      id: userId,
    });
    const refreshTokenExpiresIn = this.configService.get<number>(
      'refreshToken.expiresIn',
      { infer: true },
    );

    const token_hash = await this.hashRefreshToken(refresh_token);
    const expiresAt = new Date(Date.now() + refreshTokenExpiresIn * 1000);
    const body: Pick<
      RefreshTokenEntity,
      'userId' | 'token_hash' | 'expiresAt'
    > = {
      userId,
      token_hash,
      expiresAt,
    };

    return this.refreshTokenRepository.createRefreshToken(body);
  }

  /*RefreshTokenEntity*/
  async revokeRefreshToken(tokenHash: string): Promise<any> {
    return this.refreshTokenRepository.revokeRefreshToken(tokenHash);
  }
}
