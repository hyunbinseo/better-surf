export default defineContentScript({
	matches: [
		'https://www.sejongpac.or.kr/portal/performance/performance/performList.do?*', // 공연일정(목록)
		'https://www.sejongpac.or.kr/portal/performance/exhibit/performList.do?*', // 전시일정(목록)
		'https://www.sejongpac.or.kr/portal/academy/academyProgram/list.do?*', // 교육일정(목록)
		'https://www.sejongpac.or.kr/portal/performance/packageList/showPerformList.do?*', // 패키지(목록)
	],
	main: () => {
		const intervalId = window.setInterval(() => {
			const anchors = document.querySelectorAll<HTMLAnchorElement>('ul.show_list > li > a');
			if (anchors.length > 0) {
				anchors.forEach((a) => (a.target = '_blank'));
				window.clearInterval(intervalId);
			}
		}, 100);
	},
});
