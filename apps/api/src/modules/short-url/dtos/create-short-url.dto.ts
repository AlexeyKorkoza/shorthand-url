import { z } from "zod";

import { createShortUrlSchema } from "@/modules/short-url/schemas/create-short-url.schema";

export type CreateShortUrlDto = z.infer<typeof createShortUrlSchema>;
