import * as v from "valibot";

export const createShortUrlSchema = v.object({
	alias: v.optional(v.string()),
	expiredAt: v.optional(v.date()),
	originalUrl: v.string("The original url field is required"),
});
