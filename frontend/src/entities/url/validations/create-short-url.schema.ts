import * as v from "valibot";

export const createShortUrlSchema = v.object({
	alias: v.optional(v.string()),
	expiredAt: v.optional(
		v.pipe(
			v.date(),
			v.minValue(new Date(), "Expiry date must be in the future"),
		),
	),
	originalUrl: v.pipe(
		v.string(),
		v.minLength(1, "The original URL field is required"),
		v.url("Please enter a valid URL"),
	),
});
