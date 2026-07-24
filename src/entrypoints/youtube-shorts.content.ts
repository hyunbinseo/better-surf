export default defineContentScript({
	matches: [
		'https://www.youtube.com/shorts/*',
		'https://youtube.com/shorts/*', //
	],
	runAt: 'document_start',
	main: () => {
		// https://youtube.com/shorts/RZ5OtdsXBsg
		const pattern = new URLPattern({ pathname: '/shorts/:id' });
		const match = pattern.exec(window.location.href);
		if (!match) return;

		if (!window.confirm('Watch in normal player?')) return;
		window.location.href = `https://www.youtube.com/watch?v=${match.pathname.groups.id}`;
	},
});
