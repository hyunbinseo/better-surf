const MIN_VALUE = 101;
const MAX_VALUE = 200;

export const rule_bloats: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
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
			regexFilter: '[?&]airbridge_referrer=',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: ['redir_token'],
					},
				},
			},
		},
		condition: {
			urlFilter: '|https://www.youtube.com/redirect^*',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: '|https://*.blux.ai/*',
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			// e.g. https://static.airbridge.io/sdk/latest/airbridge.min.js
			urlFilter: '|https://*.abr.ge/*',
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: '|https://buttr.dev/*',
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];

if (rule_bloats.length > MAX_VALUE - MIN_VALUE + 1) throw new RangeError();

for (const [index, rule] of rule_bloats.entries()) {
	rule.id = MIN_VALUE + rule_bloats.length - index - 1;
}
