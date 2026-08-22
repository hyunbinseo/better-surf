/* NOTE 검사하기/다시쓰기 triggers a full page navigation, so CSS tweaks don't work:
- `filter: invert(1);` for dark mode flashes white in Firefox
- `display: none;` to hide elements causes UI shifts */

export default defineContentScript({
	matches: [
		'https://dic.daum.net/grammar_checker.do',
		'https://dic.daum.net/grammar_checker.do?nil_act=rewrite',
	],
	main: () => {
		const 교정문_복사 = document.querySelector<HTMLAnchorElement>('a#btnCopy');
		if (!교정문_복사) return;
		교정문_복사.focus();
		교정문_복사.onclick = () => {
			setTimeout(() => {
				const 다시쓰기 = document.querySelector<HTMLAnchorElement>('a#btnRewrite');
				다시쓰기?.focus();
			});
		};
	},
});
