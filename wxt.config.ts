import { env, loadEnvFile } from 'node:process';
import { defineConfig } from 'wxt';
import { rules } from './utilities/declarativeNetRequest/common';
import { firefoxRules } from './utilities/declarativeNetRequest/firefox';

loadEnvFile();

// See https://wxt.dev/api/config.html
export default defineConfig({
	// Reference https://developer.chrome.com/docs/extensions/reference/manifest
	manifest: ({ browser }) => ({
		name: 'Better Surf',
		description: '더 나은 웹 서핑을 위한 소소하지만 강력한 도구들',
		host_permissions: [
			'https://*.epost.go.kr/*',
			'https://cdn.hancom.com/*',
			'https://member.navienhouse.com/*',
			'https://pocketcu.co.kr/*',
			'https://www.nl.go.kr/*',
			'https://www.youtube.com/*',
			'https://youtu.be/*',
			'https://youtube.com/*',
		],
		permissions: ['declarativeNetRequest'],
		// Reference https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest
		declarative_net_request: {
			rule_resources: [
				{
					id: 'rules',
					path: 'rules.json',
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
	}),
	vite: () => ({
		// Reference https://caniuse.com/css-nesting
		build: { cssTarget: ['firefox117'] },
	}),
	srcDir: 'src',
	modules: [
		'@wxt-dev/auto-icons', //
		'@wxt-dev/module-svelte',
	],
	autoIcons: {
		baseIconPath: './assets/icon.svg',
		developmentIndicator: 'overlay',
	},
	hooks: {
		'build:manifestGenerated': (wxt, manifest) => {
			if (wxt.config.browser === 'firefox') {
				// FIXME Inferred as any, not as string[] | undefined.
				manifest.host_permissions.push('https://*.swit.io/*');
				manifest.declarative_net_request.rule_resources.push({
					id: 'rules-firefox',
					path: 'rules-firefox.json',
					enabled: true,
				});
			}
		},
		'build:publicAssets': (wxt, assets) => {
			assets.push({
				relativeDest: 'rules.json',
				contents: JSON.stringify(rules),
			});
			if (wxt.config.browser === 'firefox') {
				assets.push({
					relativeDest: 'rules-firefox.json',
					contents: JSON.stringify(firefoxRules),
				});
			}
		},
	},
});
