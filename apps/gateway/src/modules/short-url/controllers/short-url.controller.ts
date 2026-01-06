import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiBody,
} from "@nestjs/swagger";

import { ShortUrlService } from "@/modules/short-url/services/short-url.service";
import { AnalyticsService } from "@/modules/short-url/services/analytics.service";
import { ZodValidationPipe } from "@/core/pipes/zod-validation.pipe";
import {
  SwaggerCreateShortUrlRequestDto,
  SwaggerGetAnalyticsResponseDto,
  SwaggerGetShortUrlInfoResponseDto,
  SwaggerGetShortUrlResponseDto,
} from "@/modules/short-url/swagger";
import {
  type CreateShortUrlDto,
  type CreateShortUrlResponseDto,
  type GetAnalyticsDto,
  type GetShortUrlDto,
  type GetShortUrlInfoDto,
} from "@/modules/short-url/dtos";
import { createShortUrlSchema } from "@/modules/short-url/schemas/create-short-url.schema";
import {
  aliasParamSchema,
  idParamSchema,
  shortUrlParamSchema,
} from "@/core/schemas/params.schema";

@ApiTags("Url")
@Controller("url")
export class ShortUrlController {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Get("/list")
  @ApiOkResponse({ type: [SwaggerGetShortUrlResponseDto] })
  getAllShortUrls(): Promise<GetShortUrlDto[]> {
    return this.shortUrlService.getAllShortUrls();
  }

  @Post("/shorten")
  @UsePipes(new ZodValidationPipe(createShortUrlSchema))
  @ApiBody({ type: SwaggerCreateShortUrlRequestDto })
  @ApiOkResponse({ type: SwaggerGetShortUrlResponseDto })
  createShortUrl(
    @Body() body: CreateShortUrlDto,
  ): Promise<CreateShortUrlResponseDto> {
    return this.shortUrlService.createShortUrl(body);
  }

  @Get("/info/:shortUrl")
  @ApiOkResponse({ type: SwaggerGetShortUrlInfoResponseDto })
  getShortUrlInformation(
    @Param("shortUrl", new ZodValidationPipe(shortUrlParamSchema))
    shortUrl: UniqueShortUrl,
  ): Promise<GetShortUrlInfoDto> {
    return this.shortUrlService.getShortUrlInformation(shortUrl);
  }

  @Delete("/delete/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  deleteShortUrl(
    @Param("id", new ZodValidationPipe(idParamSchema)) id: string,
  ): Promise<void> {
    return this.shortUrlService.deleteShortUrl(id);
  }

  @Get("/analytics/:alias")
  @ApiOkResponse({ type: SwaggerGetAnalyticsResponseDto })
  getShortUrlAnalytics(
    @Param("alias", new ZodValidationPipe(aliasParamSchema)) alias: Alias,
  ): Promise<GetAnalyticsDto> {
    return this.analyticsService.getShortUrlAnalytics(alias);
  }
}
