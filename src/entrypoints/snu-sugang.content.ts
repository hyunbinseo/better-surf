export default defineContentScript({
	matches: ['https://sugang.snu.ac.kr/*'],
	runAt: 'document_start',
	main: () => {
		void cookieStore.delete('enter');
	},
});
