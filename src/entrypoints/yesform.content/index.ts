import './style.css';

export default defineContentScript({
	matches: ['https://*.yesform.com/*'],
	main: () => {},
});
