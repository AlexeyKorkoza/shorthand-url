import { z } from "zod";

export const createShortUrlSchema = z.object({
  alias: z.string().optional(),
  expiredAt: z
    .preprocess(
      (val) => (val ? new Date(val as string) : val),
      z.date().optional(),
    )
    .optional(),
  originalUrl: z.string(),
});
