import './style.css';

export default defineContentScript({
	matches: [
		'https://calendar.google.com/*', //
		'https://chat.google.com/*',
		'https://docs.google.com/*',
		'https://drive.google.com/drive/*',
		'https://mail.google.com/*',
		'https://meet.google.com/*',
	],
	main: () => {},
});
