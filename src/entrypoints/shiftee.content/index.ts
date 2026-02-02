import './style.css';

export default defineContentScript({
	matches: [
		// NOTE Style not reliably applied on Firefox 147.0.2
		// Fails: clicking the login button in the landing page (/)
		// Works: refreshing the company dashboard (/app/companies)
		'https://shiftee.io/',
	],
	main: () => {},
});
