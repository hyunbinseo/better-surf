import './style.css';

export default defineContentScript({
	matches: ['https://x.com/*'],
	main: () => {},
});
