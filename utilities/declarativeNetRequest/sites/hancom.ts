export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'Referer',
					operation: 'set',
					value: 'https://store.hancom.com/',
				},
			],
		},
		condition: {
			requestDomains: ['cdn.hancom.com'],
			resourceTypes: ['main_frame'],
		},
	},
];
