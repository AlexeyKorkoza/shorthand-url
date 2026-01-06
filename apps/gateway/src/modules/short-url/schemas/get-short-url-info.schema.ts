import { z } from "zod";

export const getShortUrlInfoSchema = z.object({
  alias: z.string(),
  createdAt: z.date(),
  clickCount: z.number(),
  originalUrl: z.string(),
});
