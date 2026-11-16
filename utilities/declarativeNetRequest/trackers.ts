// Stripped on every site, so add only unambiguous trackers:
// - Generic tracking names (e.g. `ad_id`, `utm_source`)
// - Vendor params, commented with the vendor (e.g. `dclid`, `fbclid`)
// Params a site may use for content (e.g. `ref`, `tag`) belong in `sites/`.
// Firefox builds also merge these into every `sites/` redirect (`wxt.config.ts`).
export const trackerParams = [
	'ad_creative',
	'ad_id',
	'ad_type',
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
	'igsh', // Instagram
	'igshid', // Instagram
	'igsi', // Instagram
	'li_fat_id', // LinkedIn
	'mc_eid', // Mailchimp
	'mkt_tok', // Marketo
	'msclkid', // Microsoft
	'psln', // Instagram
	'rb_clickid', // Rakuten
	'rdt_cid', // Reddit
	's_cid', // Adobe
	'ScCid', // Snapchat
	'srsltid', // Google
	'ttclid', // TikTok
	'twclid', // Twitter/X
	'wbraid', // Google
	'yclid', // Yandex
];

export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		priority: 1,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: trackerParams,
					},
				},
			},
		},
		condition: {
			// Avoid conflicts with Firefox `modifyHeaders`
			excludedRequestDomains: [
				'cdn.hancom.com', //
				'www.nl.go.kr',
				'www.youtube.com', // `/tv`; also skips `utm_*` on every www.youtube.com page
			],
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
							...trackerParams,
							'airbridge_referrer',
							'ad_creative_id',
							'ad_group',
							'ad_group_id',
							'adfrom',
							'campaign',
							'click_id',
							'gaid_raw',
							'ifa_raw',
							'routing_short_id',
							'sub1',
							'sub2',
							'sub_id',
							'tracking_template_id',
						],
					},
				},
			},
		},
		condition: {
			urlFilter: '^airbridge_referrer=',
			resourceTypes: ['main_frame'],
		},
	},
];
