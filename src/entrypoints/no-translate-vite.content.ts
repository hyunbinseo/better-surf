export default defineContentScript({
	matches: ['https://ko.vite.dev/*'],
	runAt: 'document_start',
	main: () => {
		const url = new URL(window.location.href);
		if (!switchToEnglish(url)) return;

		url.hostname = 'vite.dev';
		window.location.href = url.toString();
	},
});
