import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
	srcDir: 'src',
	modules: [
		'@wxt-dev/auto-icons', //
		'@wxt-dev/module-svelte',
	],
	autoIcons: { baseIconPath: './assets/icon.svg' },
	hooks: {
		'build:manifestGenerated': (wxt, manifest) => {
			manifest.content_scripts ??= [];
			manifest.content_scripts.push({
				css: ['content-scripts/moneypin-web.css'],
				matches: ['https://web.moneypin.biz/*'],
			});
		},
	},
});
