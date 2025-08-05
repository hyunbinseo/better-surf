export default defineContentScript({
	matches: ['https://www.reddit.com/*'],
	runAt: 'document_start',
	main: () => {
		const url = new URL(window.location.href);
		if (url.searchParams.has('tl')) {
			url.searchParams.delete('tl');
			window.location.href = url.toString();
		}
	},
});
