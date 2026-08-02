export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: ['nl-query', 'nl-ts-pid', 'NaPm'],
					},
				},
			},
		},
		condition: {
			requestDomains: ['smartstore.naver.com'],
			resourceTypes: ['main_frame'],
		},
	},
];
