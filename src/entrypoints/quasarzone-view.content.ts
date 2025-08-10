export default defineContentScript({
	matches: ['https://quasarzone.com/bbs/qb_saleinfo/views/*'],
	runAt: 'document_end',
	main: () => {
		document
			.querySelectorAll<HTMLAnchorElement>(
				'table.market-info-view-table a[href^="javascript:goToLink("]',
			)
			.forEach((a) => {
				if (!a.textContent) return;
				a.href = a.textContent;
				a.target = '_blank';
			});
	},
});
