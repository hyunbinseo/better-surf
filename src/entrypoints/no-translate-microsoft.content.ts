export default defineContentScript({
	matches: ['https://learn.microsoft.com/ko-kr/*'],
	runAt: 'document_start',
	main: () => {
		const url = new URL(window.location.href);

		// referrer is an empty string in Firefox
		const switchToEnglish = import.meta.env.FIREFOX
			? window.confirm('Switch to English?')
			: document.referrer && //
				url.hostname !== new URL(document.referrer).hostname;

		if (!switchToEnglish) return;

		url.pathname = url.pathname.replace(/^\/ko-kr\//, '/en-us/');
		window.location.href = url.toString();
	},
});
