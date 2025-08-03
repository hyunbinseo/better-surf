export default defineContentScript({
	matches: [
		'https://cloud.google.com/*',
		'https://developer.android.com/*',
		'https://developer.chrome.com/*',
		'https://developers.google.com/*',
		'https://source.android.com/*',
	],
	runAt: 'document_start',
	main: () => {
		if (!document.referrer) return;
		const url = new URL(window.location.href);
		const referrer = new URL(document.referrer);
		if (url.hostname !== referrer.hostname && url.searchParams.has('hl')) {
			document.cookie = 'django_language=en; path=/';
			url.searchParams.delete('hl');
			window.location.href = url.toString();
		}
	},
});
