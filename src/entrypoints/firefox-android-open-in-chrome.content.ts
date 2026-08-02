const redirect = (url: URL) => {
	url.hash = `#Intent;scheme=${url.protocol.slice(0, -1)};package=com.android.chrome;end`;
	// Cannot be changed using the URL protocol property
	// See https://github.com/whatwg/url/issues/674
	window.location.href = 'intent:' + url.href.slice(url.protocol.length);
};

// NOTE Check if ad block is interfering with open in app
// See https://github.com/hyunbinseo/better-surf/issues/15

export default defineContentScript({
	include: ['firefox'],
	matches: [
		'https://gift-talk.kakao.com/appredirect?to=*',
		'https://qr.kakaopay.com/*',
		'https://receipt.allink.io/*', // 소설 로그인 후 휴대폰 인증 불가, 빈 화면 표시됨
		'https://service.kakaomobility.com/launch/kakaot/*',
		'https://shoppinglive.kakao.com/bridge?redirect=*',
		'https://store.kakao.com/*',
	],
	runAt: 'document_start',
	main: (ctx) => {
		if (!navigator.userAgent.startsWith('Mozilla/5.0 (Android')) return;
		redirect(new URL(window.location.href));
		// e.g. 카카오 쇼핑라이브를 둘러보다가 '카카오톡에서 보기' [앱 열기] 버튼을 누르는 경우
		ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => redirect(newUrl));
	},
});
