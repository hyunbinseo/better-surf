export default defineContentScript({
	matches: ['https://webapp.moneypin.biz/*'],
	main: () => {
		const url = new URL(location.href);
		url.hostname = 'web.moneypin.biz';
		location.href = url.toString();
	},
});
