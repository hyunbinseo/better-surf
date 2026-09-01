// e.g. /main/products/123 should redirect to /<storeId>/products/123,
// but occasionally responds with 429 and an error page with a reload button —
// `location.reload()` or `location.assign()` to the same URL still returns 429.

export default defineContentScript({
	matches: ['https://smartstore.naver.com/main/products/*'],
	main: () => {
		const pattern = new URLPattern({ pathname: '/main/products/:productId' });
		const productId = pattern.exec(location.href)?.pathname.groups?.productId;
		if (!productId) return;

		const key = `better-surf:naver-smartstore-429:${productId}`;
		const href = `https://smartstore.naver.com/main/products/${productId}`;

		if (
			document.title.includes('에러') &&
			document.querySelector('[onclick*="location.reload()"]') &&
			!sessionStorage.getItem(key)
		) {
			sessionStorage.setItem(key, '1');
			const a = document.createElement('a');
			a.href = href;
			a.rel = 'noreferrer';
			document.body.appendChild(a);
			a.click();
		}
	},
});
