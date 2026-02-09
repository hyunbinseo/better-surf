const handle = (url: URL) => {
	if (
		// 2026-02-09 LG U+ Biz 웹팩스 보낼 문서 파일 첨부 불가
		(url.hostname === 'webfax.uplus.co.kr' && //
			url.pathname === '/fax/send/new') ||
		// 2025-10-21 네이버 클라우드 플랫폼 온라인 문의하기 접수 불가
		// https://www.ncloud.com/support/notice/all/1388
		(url.hostname === 'www.ncloud.com' && //
			url.pathname === '/support/question/service')
	)
		window.alert('파이어폭스에서 정상 작동하지 않습니다. 크로미움 브라우저를 사용하세요.');
};

export default defineContentScript({
	include: ['firefox'],
	matches: [
		'https://webfax.uplus.co.kr/*',
		'https://www.ncloud.com/*', //
	],
	runAt: 'document_start',
	main: (ctx) => {
		const url = new URL(window.location.href);
		handle(url);
		ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => handle(newUrl));
	},
});
