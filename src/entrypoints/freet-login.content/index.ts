import './style.css';

export default defineContentScript({
	matches: ['https://www.freet.co.kr/login*'],
	main: () => {},
});
