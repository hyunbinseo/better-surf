export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: ['xmt'],
					},
				},
			},
		},
		condition: {
			requestDomains: ['threads.com', 'threads.net'],
			urlFilter: 'xmt=',
			resourceTypes: ['main_frame'],
		},
	},
];
