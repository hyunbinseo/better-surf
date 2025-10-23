const handle = (url: URL) => {
	if (
		// 2025-10-21 네이버 클라우드 플랫폼 온라인 문의하기 접수 불가
		// https://www.ncloud.com/support/notice/all/1388
		url.hostname === 'www.ncloud.com' &&
		url.pathname === '/support/question/service'
	)
		window.alert('파이어폭스에서 작동하지 않습니다. 크로미움 브라우저를 사용하세요.');
};

export default defineContentScript({
	include: ['firefox'],
	matches: ['https://www.ncloud.com/*'],
	runAt: 'document_start',
	main: (ctx) => {
		const url = new URL(window.location.href);
		handle(url);
		ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => handle(newUrl));
	},
});
