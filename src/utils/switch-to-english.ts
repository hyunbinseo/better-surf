/**
 * Chrome: switch when arriving from another origin (e.g. a search result).
 * Firefox: `document.referrer` is always an empty string, so ask instead.
 */
export const switchToEnglish = (url: URL): boolean => {
	if (import.meta.env.FIREFOX) return window.confirm('Switch to English?');
	if (!document.referrer) return false;
	return url.hostname !== new URL(document.referrer).hostname;
};
