export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: { url: 'https://contacts.google.com/' },
		},
		condition: {
			urlFilter: '|https://contacts.google.com/search/|',
			resourceTypes: ['main_frame'],
		},
	},
];
