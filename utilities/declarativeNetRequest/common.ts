import { FIREFOX_RULE_ID_OFFSET } from './firefox';

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
			urlFilter: 'https://pbs.twimg.com/media/*?format=*',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: 'https://buttr.dev/*',
			resourceTypes: ['script', 'sub_frame'],
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
			urlFilter: 'https://cdn.hancom.com/*',
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
			urlFilter: 'https://www.nl.go.kr/*',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			urlFilter: 'https://www.epost.go.kr/nonActiveX/*',
			resourceTypes: ['script'],
		},
	},
];

if (rules.length > FIREFOX_RULE_ID_OFFSET) throw new Error();

rules.forEach((rule, index) => (rule.id = rules.length - index));
