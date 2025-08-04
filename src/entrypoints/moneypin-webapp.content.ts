export default defineContentScript({
	matches: ['https://webapp.moneypin.biz/*'],
	main: () => {
		const url = new URL(window.location.href);
		url.hostname = 'web.moneypin.biz';
		window.location.href = url.toString();
	},
});
