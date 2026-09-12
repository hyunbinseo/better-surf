export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							// af_dp
							// af_force_deeplink
							'af_channel',
							'af_referrer_customer_id',
							'af_referrer_uid',
							'af_siteid',
							'is_retargeting',
							'pid',
							'referrer',
							'shortlink',
							'source_caller',
						],
					},
				},
			},
		},
		condition: {
			requestDomains: ['musinsa.com'],
			urlFilter: 'af_dp=',
			resourceTypes: ['main_frame'],
		},
	},
];
