import './style.css';

export default defineContentScript({
	matches: ['https://web.moneypin.biz/*'],
	main: (ctx) => {
		ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
			if (newUrl.toString() === 'https://web.moneypin.biz/bill/input') {
				const input = document.querySelector<HTMLInputElement>('input[placeholder="0원"]');
				if (!input) return;

				const isTotal = window.confirm('부가세 포함으로 발행하겠습니까?');
				if (!isTotal) return;

				const totalString = window.prompt('부가세 포함 금액을 입력하세요');
				if (totalString === null) return;

				if (!totalString || !/^\d+$/.test(totalString)) {
					window.alert('유효하지 않은 금액입니다.');
					return;
				}

				const total = Number(totalString);
				const supply = Math.ceil(total / 1.1); // 국세청 홈택스 로직

				input.value = supply.toString();
			}
		});
	},
});
