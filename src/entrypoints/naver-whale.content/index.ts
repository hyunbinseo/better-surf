import './style.css';

export default defineContentScript({
	matches: [
		'https://www.naver.com/*', //
		'https://search.naver.com/*',
	],
	main: () => {},
});
