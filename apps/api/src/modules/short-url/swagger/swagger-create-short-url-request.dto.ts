import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SwaggerCreateShortUrlRequestDto {
  @ApiPropertyOptional()
  alias?: string;

  @ApiPropertyOptional()
  expiredAt?: Date;

  @ApiProperty()
  originalUrl: string;
}
