export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'Referer',
					operation: 'set',
					value: 'https://www.nl.go.kr',
				},
			],
		},
		condition: {
			requestDomains: ['www.nl.go.kr'],
			resourceTypes: ['main_frame'],
		},
	},
];
