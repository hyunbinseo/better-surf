import './style.css';

export default defineContentScript({
	// NOTE Landing page [로그인] anchor is handled by client-side navigation
	// Custom styles should be applied when redirected to /app in this manner
	matches: ['https://shiftee.io/*'],
	main: () => {},
});
