export default defineContentScript({
	include: ['firefox'], // NOTE Fallback for `declarativeNetRequest`
	matches: [
		'https://youtube.com/shorts/*', //
		'https://www.youtube.com/shorts/*',
	],
	runAt: 'document_start',
	main: () => {
		const id = window.location.pathname.replace(/^\/shorts\//, '');
		const url = new URL('https://www.youtube.com/watch');
		url.searchParams.set('v', id);
		window.location.href = url.toString();
	},
});
