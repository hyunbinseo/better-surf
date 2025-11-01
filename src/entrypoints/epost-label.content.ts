export default defineContentScript({
	include: ['firefox'],
	matches: ['https://service.epost.go.kr/front.commonpostplus.AcceptPlusLabelPrint.postal'],
	main: () => {
		const ul = document.querySelector<HTMLUListElement>('#subForm > div:first-of-type ul');
		if (!ul) return;

		const mark = document.createElement('mark');
		mark.textContent =
			"(Firefox 브라우저) '인쇄' 버튼 / '설정 자세히' 선택 / '여백' 항목에서 '최소값' 선택 - 기본값 아님";

		const li = document.createElement('li');
		li.appendChild(mark);
		ul.appendChild(li);
	},
});
