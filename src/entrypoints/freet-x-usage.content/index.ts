import { mount, unmount } from 'svelte';
import App from './App.svelte';

export default defineContentScript({
	matches: ['https://www.freet.co.kr/x/usage'],
	cssInjectionMode: 'ui',
	main: async (ctx) => {
		const ui = await createShadowRootUi(ctx, {
			name: 'freet-x-usage',
			position: 'modal',
			onMount: (container) => mount(App, { target: container }),
			onRemove: (app) => {
				if (app) unmount(app);
			},
		});
		ui.mount();
	},
});
