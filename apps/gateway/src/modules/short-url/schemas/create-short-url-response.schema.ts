import { z } from "zod";

export const createShortUrlResponseSchema = z.object({
  shortUrl: z.string(),
});
