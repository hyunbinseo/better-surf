const handle = (url: URL) => {
	const { hostname, pathname } = url;
	if (
		// 2026-02-09 LG U+ Biz 웹팩스 보낼 문서 파일 첨부 불가
		(hostname === 'webfax.uplus.co.kr' && pathname === '/fax/send/new') ||
		// 2025-10-21 네이버 클라우드 플랫폼 온라인 문의하기 접수 불가
		// https://www.ncloud.com/support/notice/all/1388
		(hostname === 'www.ncloud.com' && pathname === '/support/question/service')
	) {
		window.alert('파이어폭스에서 오작동하는 페이지입니다.');
	}
};

export default defineContentScript({
	include: ['firefox'],
	matches: [
		'https://webfax.uplus.co.kr/*',
		'https://www.ncloud.com/*', //
	],
	runAt: 'document_start',
	main: (ctx) => {
		handle(new URL(window.location.href));
		ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => handle(newUrl));
	},
});
