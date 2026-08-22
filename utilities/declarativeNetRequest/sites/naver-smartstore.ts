export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							'NaPm', //
							'n_ad',
							'n_ad_group',
							'n_ad_group_type',
							'n_campaign_type',
							'n_mall_id',
							'n_mall_pid',
							'n_match',
							'n_media',
							'n_query',
							'n_rank',
							'nl-query',
							'nl-ts-pid',
						],
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
