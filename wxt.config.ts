import { env, loadEnvFile } from 'node:process';
import { defineConfig } from 'wxt';

loadEnvFile();

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: ({ browser }) => ({
		name: 'Better Surf',
		description: '더 나은 웹 서핑을 위한 소소하지만 강력한 도구들',
		browser_specific_settings: {
			...(browser === 'firefox' && {
				gecko: {
					id: env.FIREFOX_EXTENSION_ID,
					strict_min_version: '121.0', // CSS :has() support
				},
				// To continue marking your extension as Android compatible on AMO,
				// ensure that your manifest.json file includes a "browser_specific_settings.gecko_android" object.
				// Reference https://blog.mozilla.org/addons/2023/10/05/changes-to-android-extension-signing
				gecko_android: {},
			}),
		},
	}),
	vite: () => ({ build: { cssTarget: ['firefox121'] } }),
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
				css: ['content-scripts/x.css'],
				matches: ['https://x.com/*'],
			});
		},
	},
});
