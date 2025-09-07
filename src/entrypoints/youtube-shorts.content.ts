export default defineContentScript({
	matches: [
		'https://youtube.com/shorts/*', //
		'https://www.youtube.com/shorts/*',
	],
	runAt: 'document_start',
	main: () => {
		// https://youtube.com/shorts/RZ5OtdsXBsg
		// https://www.youtube.com/shorts/RZ5OtdsXBsg
		// https://www.youtube.com/watch?v=RZ5OtdsXBsg
		const id = new URL(window.location.href).pathname.replace(/^\/shorts\//, '');
		const url = new URL('https://www.youtube.com/watch');
		url.searchParams.set('v', id);
		window.location.href = url.toString();
	},
});
