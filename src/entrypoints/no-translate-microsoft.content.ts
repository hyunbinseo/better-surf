export default defineContentScript({
	matches: ['https://learn.microsoft.com/ko-kr/*'],
	runAt: 'document_start',
	main: () => {
		const url = new URL(window.location.href);
		if (url.pathname.startsWith('/ko-kr/answers/questions/')) return; // locale mismatch
		if (!switchToEnglish(url)) return;

		url.pathname = url.pathname.replace(/^\/ko-kr\//, '/en-us/');
		window.location.href = url.toString();
	},
});
