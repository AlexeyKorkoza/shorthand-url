import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthRepository } from '@/modules/auth/repositories/auth.repository';
import { type AppConfig } from '@/core/interfaces';
import {
  type GetUserDto,
  type SignInDto,
  type SignUpDto,
  type UpdateProfileDto,
} from '@/modules/auth/dtos';
import { type User } from '@db/prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  private encryptPassword(password: string): string {
    const passwordSalt = this.configService.get('password.salt', {
      infer: true,
    });

    return bcrypt.hashSync(password, passwordSalt);
  }

  private comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async signUp(registerDto: SignUpDto) {
    const existingUser = await this.authRepository.findUserByEmail({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = this.encryptPassword(registerDto.password);

    const user = await this.authRepository.createUser({
      email: registerDto.email,
      password: hashedPassword,
    });

    return user;
  }

  async signIn(loginDto: SignInDto): Promise<GetUserDto> {
    const user = await this.authRepository.findUserByEmail({
      email: loginDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.authRepository.findUserById({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
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
        throw new ConflictException('Email already in use');
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
  }

  async getProfile(
    userId: string,
  ): Promise<Omit<User, 'password' | 'updatedAt'>> {
    const user = await this.authRepository.findUserById({
      id: userId,
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
