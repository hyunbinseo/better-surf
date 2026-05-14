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
						removeParams: ['redir_token'],
					},
				},
			},
		},
		condition: {
			urlFilter: 'https://www.youtube.com/redirect*',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: 'https://*.blux.ai/*',
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			// e.g. https://static.airbridge.io/sdk/latest/airbridge.min.js
			urlFilter: 'https://*.abr.ge/*',
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: 'https://buttr.dev/*',
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];

if (rule_bloats.length > MAX_VALUE - MIN_VALUE + 1) throw new RangeError();

for (const [index, rule] of rule_bloats.entries()) {
	rule.id = MIN_VALUE + rule_bloats.length - index - 1;
}
