import { FIREFOX_RULE_ID_OFFSET } from './firefox';

export const rules: chrome.declarativeNetRequest.Rule[] = [
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
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'User-Agent',
					operation: 'set',
					value:
						'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
				},
			],
		},
		condition: {
			urlFilter: 'https://pocketcu.co.kr/*',
			resourceTypes: ['main_frame'],
		},
	},
];

if (rules.length > FIREFOX_RULE_ID_OFFSET) throw new Error();

rules.forEach((rule, index) => (rule.id = rules.length - index));
