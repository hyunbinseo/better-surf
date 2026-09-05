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
		if (!url.searchParams.has('hl')) return;
		if (!switchToEnglish(url)) return;

		await cookieStore.set('django_language', 'en');
		url.searchParams.delete('hl');
		window.location.href = url.toString();
	},
});
