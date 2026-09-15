export default defineContentScript({
	matches: ['https://brandconnect.naver.com/affiliates/*'],
	runAt: 'document_start',
	main: () => {
		// https://brandconnect.naver.com/affiliates/000000000000000?channelProductNo=00000000000
		const productId = new URL(window.location.href).searchParams.get('channelProductNo');
		if (!productId) return;
		window.location.replace(`https://smartstore.naver.com/main/products/${productId}`);
	},
});
