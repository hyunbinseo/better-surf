export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'allow' },
		condition: {
			// e.g. https://static.airbridge.io/sdk/latest/airbridge.deeplink_page.min.js
			// e.g. https://static.airbridge.io/sdk/latest/airbridge.deeplink_compatibility.min.js
			// e.g. https://static.airbridge.io/sdk/latest/airbridge.deeplink.min.js
			requestDomains: ['airbridge.io'],
			urlFilter: '/airbridge.deeplink',
			resourceTypes: ['script'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			// e.g. https://static.airbridge.io/sdk/latest/airbridge.min.js
			requestDomains: ['airbridge.io'],
			excludedRequestDomains: ['www.airbridge.io'], // landing
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			requestDomains: ['abr.ge'],
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];
