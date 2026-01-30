import './style.css';

export default defineContentScript({
	matches: ['https://shiftee.io/app/companies/*'],
	main: () => {},
});
