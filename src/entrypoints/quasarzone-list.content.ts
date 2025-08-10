export default defineContentScript({
	matches: [
		'https://quasarzone.com/bbs/qb_saleinfo', //
		'https://quasarzone.com/bbs/qb_saleinfo?*',
	],
	runAt: 'document_end',
	main: () => {
		const isMobile = !!document.querySelector('header#top-header');
		if (!isMobile) return;

		const url = new URL(window.location.href);
		const viewType = url.searchParams.get('view_type');
		if (viewType === 'list2') return;

		url.searchParams.set('view_type', 'list2');
		window.location.href = url.toString();
	},
});
