export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: { transform: { query: '' } },
		},
		condition: {
			urlFilter: '|https://mkt.shopping.naver.com/link/*?',
			resourceTypes: ['main_frame'],
		},
	},
];
