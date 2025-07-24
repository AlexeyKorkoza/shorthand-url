import { Module } from '@nestjs/common';

import { ShortUrlController } from '@/modules/short-url/controllers/short-url.controller';
import { ShortUrlService } from '@/modules/short-url/services/short-url.service';
import { ShortUrlRepository } from '@/modules/short-url/repositories/short-url.repository';
import { PrismaService } from '@/services/prisma.service';

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService, ShortUrlRepository, PrismaService],
})
export class ShortUrlModule {}
