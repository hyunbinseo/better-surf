import './style.css';

export default defineContentScript({
	matches: [
		'https://zuzu.network/*', //
		'https://*.zuzu.network/*',
	],
	main: () => {},
});
