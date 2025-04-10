import { env, loadEnvFile } from 'node:process';
import { defineConfig } from 'wxt';

loadEnvFile();

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: {
		name: 'Better Surf',
		description: '더 나은 웹 서핑을 위한 소소하지만 강력한 도구들',
		browser_specific_settings: { gecko: { id: env.FIREFOX_EXTENSION_ID } },
	},
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
