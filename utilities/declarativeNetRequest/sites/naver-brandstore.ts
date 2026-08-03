export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							'nt_detail', //
							'nt_keyword',
							'nt_medium',
							'nt_source',
						],
					},
				},
			},
		},
		condition: {
			requestDomains: ['brand.naver.com'],
			resourceTypes: ['main_frame'],
		},
	},
];
