import { globSync, readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { env, loadEnvFile } from 'node:process';
import { defineConfig, type UserManifest } from 'wxt';

loadEnvFile();

// See https://wxt.dev/api/config.html
export default defineConfig({
	manifest: ({ browser }) => {
		const manifest = {
			name: 'Better Surf',
			description: '더 나은 웹 서핑을 위한 소소하지만 강력한 도구들',
			host_permissions: [
				'https://*.epost.go.kr/*', //
				'https://pocketcu.co.kr/*',
			],
			permissions: ['declarativeNetRequest'],
			declarative_net_request: {
				rule_resources: [
					{
						id: 'block_security_modules',
						path: 'block_security_modules.json',
						enabled: true,
					},
					{
						id: 'mobile_user_agent',
						path: 'mobile_user_agent.json',
						enabled: true,
					},
				],
			},
			browser_specific_settings: {
				...(browser === 'firefox' && {
					gecko: {
						id: env.FIREFOX_EXTENSION_ID,
						strict_min_version: '140.0', // https://developer.mozilla.org/en-US/docs/Web/API/CookieStore
					},
					// To continue marking your extension as Android compatible on AMO,
					// ensure that your manifest.json file includes a "browser_specific_settings.gecko_android" object.
					// Reference https://blog.mozilla.org/addons/2023/10/05/changes-to-android-extension-signing
					gecko_android: {},
				}),
			},
		} satisfies UserManifest;

		if (browser === 'firefox') {
			manifest.host_permissions.push('https://*.swit.io/*');
			manifest.declarative_net_request.rule_resources.push({
				id: 'ff_user_agent',
				path: 'ff_user_agent.json',
				enabled: true,
			});
		}

		return manifest;
	},
	vite: () => ({
		build: {
			cssTarget: ['firefox121'],
			// Firefox 121 - CSS :has()
			// Firefox 117 - CSS Nesting
		},
	}),
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
	},
});
