export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		priority: 1,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							'ad_id',
							'campaign_id',
							'utm_campaign',
							'utm_content',
							'utm_id',
							'utm_medium',
							'utm_source',
							'utm_term',
							'_openstat', // Yandex
							'dclid', // Google
							'epik', // Pinterest
							'fbclid', // Facebook
							'gbraid', // Google
							'gclid', // Google
							'igshid', // Instagram
							'li_fat_id', // LinkedIn
							'mc_eid', // Mailchimp
							'mkt_tok', // Marketo
							'msclkid', // Microsoft
							'rb_clickid', // Rakuten
							'rdt_cid', // Reddit
							's_cid', // Adobe
							'ScCid', // Snapchat
							'srsltid', // Google
							'ttclid', // TikTok
							'twclid', // Twitter/X
							'wbraid', // Google
							'yclid', // Yandex
						],
					},
				},
			},
		},
		condition: {
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		priority: 2,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							'airbridge_referrer',
							'ad_creative_id',
							'ad_group',
							'ad_group_id',
							'adfrom',
							'campaign',
							'campaign_id',
							'click_id',
							'gaid_raw',
							'ifa_raw',
							'routing_short_id',
							'sub1',
							'sub2',
							'sub_id',
							'tracking_template_id',
							'utm_campaign',
							'utm_medium',
							'utm_source',
						],
					},
				},
			},
		},
		condition: {
			urlFilter: 'airbridge_referrer=',
			resourceTypes: ['main_frame'],
		},
	},
];
