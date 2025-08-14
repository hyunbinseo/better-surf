export default defineContentScript({
	matches: ['https://booking.naver.com/'],
	runAt: 'document_start',
	main: () => {
		window.location.href = 'https://m.place.naver.com/my/timeline?tab=RESERVATION';
	},
});
