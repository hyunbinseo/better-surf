export default defineContentScript({
	matches: [
		'https://cloud.google.com/*',
		'https://developer.android.com/*',
		'https://developer.chrome.com/*',
		'https://developers.google.com/*',
		'https://source.android.com/*',
		'https://web.dev/*',
	],
	runAt: 'document_start',
	main: async () => {
		const url = new URL(window.location.href);
		const referrer = new URL(document.referrer);

		// referrer is an empty string in Firefox.
		const switchToEnglish = import.meta.env.FIREFOX
			? url.searchParams.has('hl') && window.confirm('Switch to English?')
			: url.hostname !== referrer.hostname && url.searchParams.has('hl');

		if (!switchToEnglish) return;
		await cookieStore.set('django_language', 'en');
		url.searchParams.delete('hl');
		window.location.href = url.toString();
	},
});
