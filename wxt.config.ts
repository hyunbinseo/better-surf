import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { object, parse, pipe, string, uuid } from 'valibot';
import { defineConfig } from 'wxt';
import svelteConfig from './svelte.config.js';
import { rule_utilities } from './utilities/declarativeNetRequest/001_utilities';
import { rule_bloats } from './utilities/declarativeNetRequest/101_bloats';
import { rule_firefox } from './utilities/declarativeNetRequest/201_firefox';

loadEnvFile(resolve(import.meta.dirname, '.env.submit'));

const env = parse(
	object({
		FIREFOX_EXTENSION_UUID: pipe(string(), uuid()),
	}),
	process.env,
);

// See https://wxt.dev/api/config.html
export default defineConfig({
	// See https://developer.chrome.com/docs/extensions/reference/manifest
	manifest: ({ browser }) => ({
		name: 'Better Surf',
		description: '더 나은 웹 서핑을 위한 소소하지만 강력한 도구들',
		host_permissions: ['*://*/*'],
		permissions: ['declarativeNetRequest', 'tabs'],
		// See https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest
		declarative_net_request: {
			rule_resources: [
				{
					id: 'utilities',
					path: 'rules/utilities.json',
					enabled: true,
				},
				{
					id: 'bloats',
					path: 'rules/bloats.json',
					enabled: true,
				},
			],
		},
		browser_specific_settings: {
			...(browser === 'firefox' && {
				gecko: {
					id: `{${env.FIREFOX_EXTENSION_UUID}}`,
					strict_min_version: '142.0', // https://developer.mozilla.org/en-US/docs/Web/API/URLPattern
					// See https://extensionworkshop.com/documentation/develop/firefox-builtin-data-consent
					data_collection_permissions: { required: ['none'] },
				},
				// Mark the extension as Android compatible on AMO (addons.mozilla.org)
				// See https://blog.mozilla.org/addons/2023/10/05/changes-to-android-extension-signing
				gecko_android: {},
			}),
		},
	}),
	vite: () => ({
		// See https://caniuse.com/css-nesting
		build: { cssTarget: ['firefox117'] },
		plugins: [tailwindcss()],
	}),
	srcDir: 'src',
	modules: [
		'@wxt-dev/auto-icons', //
		'@wxt-dev/module-svelte',
	],
	svelte: { vite: svelteConfig },
	autoIcons: {
		baseIconPath: './assets/icon.svg',
		developmentIndicator: 'overlay',
	},
	hooks: {
		'build:manifestGenerated': (wxt, manifest) => {
			if (wxt.config.browser === 'firefox') {
				manifest.declarative_net_request?.rule_resources?.push({
					id: 'firefox',
					path: 'rules/firefox.json',
					enabled: true,
				});
			}
		},
		'build:publicAssets': (wxt, assets) => {
			assets.push(
				{
					relativeDest: 'rules/utilities.json',
					contents: JSON.stringify(rule_utilities),
				},
				{
					relativeDest: 'rules/bloats.json',
					contents: JSON.stringify(rule_bloats),
				},
			);

			if (wxt.config.browser === 'firefox') {
				assets.push({
					relativeDest: 'rules/firefox.json',
					contents: JSON.stringify(rule_firefox),
				});
			}
		},
	},
});
