import { z } from "zod";

import { getAnalyticsSchema } from "@/modules/short-url/schemas/get-analytics.schema";

export type GetAnalyticsDto = z.infer<typeof getAnalyticsSchema>;
