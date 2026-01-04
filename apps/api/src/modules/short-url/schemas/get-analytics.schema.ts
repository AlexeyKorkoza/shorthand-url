import { z } from "zod";

const ipAddressItemSchema = z.object({
  id: z.number(),
  ipAddress: z.string(),
  shortUrlId: z.number(),
});

export const getAnalyticsSchema = z.object({
  ipAddresses: z.array(ipAddressItemSchema),
});
