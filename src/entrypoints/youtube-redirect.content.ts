export default defineContentScript({
	matches: ['https://www.youtube.com/redirect?*'],
	runAt: 'document_start',
	main: () => {
		// NOTE Redirect hangs on Firefox for Android
		// https://www.youtube.com/redirect?event=channel_description&redir_token=-&q=https%3A%2F%2Fwww.instagram.com&html_redirect=1
		const q = new URL(window.location.href).searchParams.get('q');
		if (q) window.location.replace(q);
	},
});
