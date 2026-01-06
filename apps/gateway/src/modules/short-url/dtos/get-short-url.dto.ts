import { z } from "zod";

import { getShortUrlSchema } from "@/modules/short-url/schemas/get-short-url.schema";

export type GetShortUrlDto = z.infer<typeof getShortUrlSchema>;
