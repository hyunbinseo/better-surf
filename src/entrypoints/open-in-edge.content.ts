export default defineContentScript({
	include: ['firefox'],
	matches: [
		'https://app.swit.io/*', //
		'https://auth.swit.io/*',
	],
	runAt: 'document_start',
	main: () => {
		if (/android/i.test(navigator.userAgent)) return;
		if (window.confirm('Firefox 미지원 웹사이트입니다. Edge에서 여시겠습니까?')) {
			document.documentElement.remove();
			window.location.href = `microsoft-edge:${window.location.href}`;
		}
	},
});
