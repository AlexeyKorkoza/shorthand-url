import { z } from "zod";

export const getShortUrlSchema = z.object({
  id: z.number(),
  originalUrl: z.string(),
  shortUrl: z.string(),
  alias: z.string(),
  clickCount: z.number().nullable(),
  expiredAt: z.date().nullable(),
});
