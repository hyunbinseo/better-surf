export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						addOrReplaceParams: [{ key: 'name', value: 'orig' }],
					},
				},
			},
		},
		condition: {
			urlFilter: '|https://pbs.twimg.com/media/*^format=*',
			resourceTypes: ['main_frame'],
		},
	},
];
