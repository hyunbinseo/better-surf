import './style.css';

export default defineContentScript({
	matches: [
		'https://www.daisomall.co.kr/*', //
		'https://prdm.daisomall.co.kr/*',
	],
	main: () => {},
});
