import './style.css';

export default defineContentScript({
	matches: ['https://prdm.daisomall.co.kr/*'],
	main: () => {
		// 다이소몰 앱에서는 상품 검색도, 결제도 편리해요!
		sessionStorage.setItem('appPopupClose', 'true');
	},
});
