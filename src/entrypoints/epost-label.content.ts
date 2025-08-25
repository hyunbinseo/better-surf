// 우정사업본부 우정정보관리원 인터넷우체국팀 (2025-08-25 16:31:23)
// 현재 인터넷우체국에서는 간편사전접수(등기통상) 주소라벨 인쇄서비스를 제공하고 있으며, 라벨 인쇄 과정에서 환경설정 등 유의사항을 팝업으로만 안내해 드리고 있습니다.
// 이에 이용자가 별도 팝업창 없이도 인쇄 유의사항을 확인할 수 있도록 주소라벨 인쇄 본문페이지 내에 해당 안내사항을 포함하여 개선 조치(‘25년 10월 중)하도록 하겠습니다.

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
