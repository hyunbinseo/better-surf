const closeDetails = () => {
	const detailsArray = Array.from(
		document.querySelectorAll<HTMLDetailsElement>('details[open]'),
	).filter((detail) => {
		const text = detail.querySelector('summary')?.textContent?.toLowerCase() || '';
		return text.includes('tutorial') || text.includes('examples');
	});

	detailsArray.forEach((details) => (details.open = false));
};

export default defineContentScript({
	matches: ['https://svelte.dev/search?q=*'],
	main: (ctx) => {
		closeDetails();
		ctx.addEventListener(window, 'wxt:locationchange', closeDetails);
	},
});
