export default defineContentScript({
	matches: ['https://www.aladin.co.kr/order/worder_chk_order_real.aspx*'],
	main: () => {
		document.body.scrollIntoView({ behavior: 'instant', block: 'end' });
	},
});
