import { resolve } from 'node:path';
import { loadEnvFile } from 'node:process';
import { pathToFileURL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import { object, parse, pipe, string, uuid } from 'valibot';
import { defineConfig } from 'wxt';
import svelteConfig from './svelte.config.js';
import { dnrRulesets } from './utilities/declarativeNetRequest';
import { rules as trackerRules } from './utilities/declarativeNetRequest/trackers';

const DNR_DEFAULT_SITE_PRIORITY = 100;

loadEnvFile(resolve(import.meta.dirname, '.env.submit'));

const env = parse(object({ FIREFOX_EXTENSION_UUID: pipe(string(), uuid()) }), process.env);

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
				{ id: 'trackers', path: 'rules/trackers.json', enabled: true },
				...dnrRulesets.map(({ name }) => ({
					id: name,
					path: `rules/${name}.json`,
					enabled: true,
				})),
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
		'build:publicAssets': async (_wxt, assets) => {
			for (const [index, rule] of trackerRules.entries()) {
				rule.id = index + 1;
			}

			assets.push(
				{
					relativeDest: 'rules/trackers.json',
					contents: JSON.stringify(trackerRules),
				},
				...(await Promise.all(
					dnrRulesets.map(async ({ name, path }) => {
						const rules = (await import(pathToFileURL(path).href))
							.rules as chrome.declarativeNetRequest.Rule[];
						for (const [index, rule] of rules.entries()) {
							rule.priority ??= DNR_DEFAULT_SITE_PRIORITY;
							rule.id = index + 1;
						}
						return {
							relativeDest: `rules/${name}.json`,
							contents: JSON.stringify(rules),
						};
					}),
				)),
			);
		},
	},
});
