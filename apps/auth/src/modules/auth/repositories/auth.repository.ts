import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/core/services/prisma.service';
import { type SignInDto, type UpdateProfileDto } from '@/modules/auth/dtos';
import { type User, type Prisma } from '@db/prisma-client';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  private isSelectNotEmpty(select?: Prisma.UserSelect): boolean {
    return !!select && Object.keys(select).length > 0;
  }

  findUserByEmail({
    email,
    select,
  }: {
    email: string;
    select?: Prisma.UserSelect;
  }): Promise<User | null> {
    if (this.isSelectNotEmpty(select)) {
      return this.prisma.user.findUnique({
        where: { email },
        select,
      });
    }

    return this.prisma.user.findUnique({ where: { email } });
  }

  findUserById({
    id,
    select,
  }: {
    id: string;
    select?: Prisma.UserSelect;
  }): Promise<User | null> {
    if (this.isSelectNotEmpty(select)) {
      return this.prisma.user.findUnique({
        where: { id },
        select,
      });
    }

    return this.prisma.user.findUnique({ where: { id } });
  }

  createUser(data: SignInDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  updateUser({
    id,
    data,
    select,
  }: {
    id: string;
    data: Partial<UpdateProfileDto>;
    select?: Prisma.UserSelect;
  }): Promise<User> {
    if (this.isSelectNotEmpty(select)) {
      return this.prisma.user.update({
        where: { id },
        data,
        select,
      });
    }

    return this.prisma.user.update({ where: { id }, data });
  }
}
