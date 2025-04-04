export default defineContentScript({
	matches: ['https://sugang.snu.ac.kr/*'],
	runAt: 'document_start',
	main: () => {
		document.cookie = 'enter=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	},
});
