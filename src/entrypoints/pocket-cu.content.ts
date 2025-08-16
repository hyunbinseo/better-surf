export default defineContentScript({
	matches: ['https://pocketcu.co.kr/*'],
	runAt: 'document_start',
	main: () => {
		// 포켓CU 앱 설치하고 신규 가입 혜택을 받아보세요.
		cookieStore.set('webAppChoice', 'N');
	},
});
