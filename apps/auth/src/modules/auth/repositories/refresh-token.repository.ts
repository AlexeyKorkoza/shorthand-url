import { Injectable } from "@nestjs/common";
import type { RefreshTokenEntity } from "@repo/api";

import { PrismaService } from "@/core/services/prisma.service";

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAllActiveRefreshTokens(userId: UserId): Promise<RefreshTokenEntity[]> {
    return this.prismaService.refreshToken.findMany({
      where: {
        userId,
        is_revoked: false,
      },
    });
  }

  createRefreshToken(
    data: Pick<RefreshTokenEntity, "userId" | "token_hash" | "expiresAt">,
  ): Promise<RefreshTokenEntity> {
    return this.prismaService.refreshToken.create({
      data,
    });
  }

  revokeRefreshToken(tokenHash: string): Promise<RefreshTokenEntity> {
    return this.prismaService.refreshToken.update({
      where: {
        token_hash: tokenHash,
      },
      data: {
        is_revoked: true,
      },
    });
  }

  revokeAllRefreshTokens(userId: UserId): Promise<any> {
    return this.prismaService.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        is_revoked: true,
      },
    });
  }
}
