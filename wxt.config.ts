import { globSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
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
		'build:publicAssets': (wxt, assets) => {
			if (wxt.config.browser === 'firefox') {
				for (const path of globSync('./static/ff_*')) {
					assets.push({
						relativeDest: basename(path),
						contents: readFileSync(path, 'utf-8'),
					});
				}
			}
		},
		'build:manifestGenerated': (wxt, manifest) => {
			if (wxt.config.browser === 'firefox') {
				//
				manifest.host_permissions ??= [];
				manifest.host_permissions.push('*://*.swit.io/*');
				//
				manifest.permissions ??= [];
				manifest.permissions.push('declarativeNetRequest');
				//
				manifest.declarative_net_request ??= {
					rule_resources: [
						{
							id: 'ff_user_agent',
							path: 'ff_user_agent.json',
							enabled: true,
						},
					],
				};
			}
			manifest.content_scripts ??= [];
			manifest.content_scripts.push({
				css: ['content-scripts/x.css'],
				matches: ['https://x.com/*'],
			});
		},
	},
});
