export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			requestDomains: ['blux.ai'],
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];
