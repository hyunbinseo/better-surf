export default defineContentScript({
	matches: ['https://smartstore.naver.com/main/products/*'],
	main: () => {
		// e.g. /main/products/123 should redirect to /<storeId>/products/123,
		// but occasionally serves an error page with a reload button instead
		const key = `better-surf:naver-smartstore-main-redirect:${location.href}`;
		if (
			document.title.includes('에러') &&
			document.querySelector('[onclick^="location.reload()"]') &&
			!sessionStorage.getItem(key)
		) {
			sessionStorage.setItem(key, '1');
			location.reload();
		}
	},
});
