export default defineContentScript({
	matches: ['https://www.newdaily.co.kr/*', 'https://newdaily.co.kr/*'],
	main: () => {
		alert('뉴데일리는 윤서인 씨 연재 매체입니다.');
	},
});
