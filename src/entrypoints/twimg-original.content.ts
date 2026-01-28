export default defineContentScript({
	matches: ['https://pbs.twimg.com/media/*'],
	main: () => {
		const url = new URL(window.location.href);
		if (url.searchParams.has('format')) {
			url.searchParams.set('name', 'orig');
			window.location.replace(url.toString());
		}
	},
});
