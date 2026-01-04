import { z } from "zod";

import { getShortUrlInfoSchema } from "@/modules/short-url/schemas/get-short-url-info.schema";

export type GetShortUrlInfoDto = z.infer<typeof getShortUrlInfoSchema>;
