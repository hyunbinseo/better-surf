export default defineContentScript({
	include: ['firefox'],
	matches: ['https://gift-talk.kakao.com/appredirect?*'],
	runAt: 'document_start',
	main: () => {
		if (!navigator.userAgent.startsWith('Mozilla/5.0 (Android')) return;
		const url = new URL(window.location.href);
		url.hash = `#Intent;scheme=${url.protocol.slice(0, -1)};package=com.android.chrome;end`;
		// Cannot be changed using the URL protocol property
		// Reference https://github.com/whatwg/url/issues/674
		window.location.href = 'intent:' + url.href.slice(url.protocol.length);
	},
});
