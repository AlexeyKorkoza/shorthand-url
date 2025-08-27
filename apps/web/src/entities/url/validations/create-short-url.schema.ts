import * as v from "valibot";

const ALIAS_MAX_LENGTH = 20;
const ORIGINAL_URL_MIN_LENGTH = 1;

export const createShortUrlSchema = v.object({
	alias: v.optional(
		v.pipe(
			v.string(),
			v.maxLength(
				ALIAS_MAX_LENGTH,
				`Alias must be ${ORIGINAL_URL_MIN_LENGTH} characters or less`,
			),
		),
	),
	expiredAt: v.optional(
		v.pipe(
			v.date(),
			v.minValue(new Date(), "Expiry date must be in the future"),
		),
	),
	originalUrl: v.pipe(
		v.string(),
		v.minLength(ORIGINAL_URL_MIN_LENGTH, "The original URL field is required"),
		v.url("Please enter a valid URL"),
	),
});
