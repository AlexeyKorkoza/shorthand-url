export const urlKeys = {
	list: ["urls", "list"],
	urlAnalytics: (shortUrl: UniqueShortUrl) => ["urls", "analytics", shortUrl],
	item: (shortUrl: UniqueShortUrl) => ["urls", "item", shortUrl],
};
