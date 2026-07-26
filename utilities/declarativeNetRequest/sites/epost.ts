export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: '|https://www.epost.go.kr/nonActiveX/*',
			resourceTypes: ['script'],
		},
	},
];
