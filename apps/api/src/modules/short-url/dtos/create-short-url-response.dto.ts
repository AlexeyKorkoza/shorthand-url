import { z } from "zod";

import { createShortUrlResponseSchema } from "@/modules/short-url/schemas/create-short-url-response.schema";

export type CreateShortUrlResponseDto = z.infer<
  typeof createShortUrlResponseSchema
>;
