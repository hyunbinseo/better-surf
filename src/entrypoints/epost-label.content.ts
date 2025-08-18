export default defineContentScript({
	matches: ['https://service.epost.go.kr/front.commonpostplus.AcceptPlusLabelPrint.postal'],
	main: () => {
		const ul = document.querySelector<HTMLUListElement>('#subForm > div:first-of-type ul');
		if (!ul) return;

		const textContent = //
			import.meta.env.CHROME
				? '라벨 인쇄 옵션 - 설정 더보기 / 용지 크기: A4 / 배율: 인쇄 가능 영역에 맞춤'
				: import.meta.env.FIREFOX
					? '라벨 인쇄 옵션 - 용지 크기: A4 / 여백: 최소값 (기본값 아님)'
					: null;

		if (!textContent) return;

		const mark = document.createElement('mark');
		mark.textContent = textContent;

		const li = document.createElement('li');
		li.appendChild(mark);
		ul.appendChild(li);
	},
});
