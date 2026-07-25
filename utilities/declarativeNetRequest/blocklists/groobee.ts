export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			requestDomains: ['groobee.io'],
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];
