const MIN_VALUE = 1;
const MAX_VALUE = 100;

export const rule_utilities: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				// https://www.youtube.com/watch?v=RZ5OtdsXBsg
				regexSubstitution: 'https://www.youtube.com/watch?v=\\1',
			},
		},
		condition: {
			// https://youtube.com/shorts/RZ5OtdsXBsg
			// https://www.youtube.com/shorts/RZ5OtdsXBsg
			regexFilter: '^https://(?:www\\.)?youtube\\.com/shorts/([a-zA-Z0-9_-]+)',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'User-Agent',
					operation: 'set',
					value: 'Mozilla/5.0 (Linux; Android 12) Cobalt/22.2.3-gold (PS4)',
				},
			],
		},
		condition: {
			urlFilter: '|https://www.youtube.com/tv^',
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
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: ['si'],
					},
				},
			},
		},
		condition: {
			regexFilter: '^https://((www\\.)?youtube\\.com|youtu\\.be)/',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'Referer',
					operation: 'set',
					value: 'https://store.hancom.com/',
				},
			],
		},
		condition: {
			urlFilter: '|https://cdn.hancom.com/*',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'Referer',
					operation: 'set',
					value: 'https://www.nl.go.kr',
				},
			],
		},
		condition: {
			urlFilter: '|https://www.nl.go.kr/*',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: '|https://www.epost.go.kr/nonActiveX/*',
			resourceTypes: ['script'],
		},
	},
];

if (rule_utilities.length > MAX_VALUE - MIN_VALUE + 1) throw new RangeError();

for (const [index, rule] of rule_utilities.entries()) {
	rule.id = MIN_VALUE + rule_utilities.length - index - 1;
}
