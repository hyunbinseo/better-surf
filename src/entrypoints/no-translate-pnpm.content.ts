export default defineContentScript({
	matches: ['https://pnpm.io/ko/*'],
	runAt: 'document_start',
	main: () => {
		const url = new URL(window.location.href);
		if (!switchToEnglish(url)) return;

		url.pathname = url.pathname.replace(/^\/ko\//, '/');
		window.location.href = url.toString();
	},
});
