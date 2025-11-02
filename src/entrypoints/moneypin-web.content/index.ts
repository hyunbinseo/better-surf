import { digits, nonEmpty, pipe, regex, safeParse, string, transform } from 'valibot';
import './style.css';

export default defineContentScript({
	matches: ['https://web.moneypin.biz/*'],
	main: (ctx) => {
		ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl: url }) => {
			if (url.pathname === '/bill/input') 세금계산서_작성();
		});
	},
});

const 세금계산서_작성 = async () => {
	const input = document.querySelector<HTMLInputElement>('input[placeholder="0원"]');
	if (!input) return;

	const isTotal = window.confirm('부가세 포함으로 발행하겠습니까?');
	if (!isTotal) return;

	const totalString = window.prompt('부가세 포함 금액을 입력하세요');
	if (totalString === null) return;

	const parsed = safeParse(
		pipe(
			string(),
			nonEmpty(),
			regex(/^ *₩?(?:\d+,)*\d+원? *$/),
			transform((v) => v.trim().replaceAll(/[₩,원]/g, '')),
			digits(),
		),
		totalString,
	);

	if (!parsed.success) {
		window.alert('유효하지 않은 금액입니다.');
		return;
	}

	const 합계 = Number(parsed.output);
	const 부가세 = Math.round(합계 / 11);
	const 공급가액 = 합계 - 부가세;

	input.value = 공급가액.toString();

	await new Promise((resolve) => setTimeout(resolve, 100));
	input.focus();

	await new Promise((resolve) => setTimeout(resolve, 100));
	document.querySelector<HTMLInputElement>('input[placeholder^="품목명"]')?.focus();

	if (공급가액 + 부가세 !== 합계) window.alert('합계가 맞도록 부가세를 수정하세요.');
};
