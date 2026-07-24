export default defineContentScript({
	matches: ['https://www.threads.com/*/post/*'],
	runAt: 'document_start',
	main: () => {
		// https://www.threads.com/@presseum/post/DTuHk16Eu_5/동아일보-사옥-99년-열어보기-프로그램을-2월-15일까지-연장합니다-동아일보-사옥-99년-열어보기2025년-12월-4일목2026년-2월-15일일/
		const pattern = new URLPattern({ pathname: '/@:username/post/:postId{/*}?' });
		const match = pattern.exec(window.location.href);
		if (!match) return;

		const { username, postId } = match.pathname.groups;
		const cleaned = new URL(`/@${username}/post/${postId}`, window.location.origin);
		if (cleaned.href !== window.location.href) window.location.href = cleaned.href;
	},
});
