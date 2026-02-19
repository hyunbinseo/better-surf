import { FIREFOX_RULE_ID_OFFSET } from './firefox';

export const rules: chrome.declarativeNetRequest.Rule[] = [
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
			type: 'modifyHeaders',
			responseHeaders: [
				{
					header: 'access-control-allow-credentials',
					operation: 'set',
					value: 'true',
				},
				{
					header: 'access-control-allow-headers',
					operation: 'set',
					value: '*',
				},
				{
					header: 'access-control-allow-methods',
					operation: 'set',
					value: '*',
				},
				{
					header: 'access-control-allow-origin',
					operation: 'set',
					value: 'https://hyunb.in',
				},
			],
		},
		condition: {
			initiatorDomains: ['hyunb.in'],
			urlFilter: 'https://member.navienhouse.com/*',
			resourceTypes: ['xmlhttprequest'],
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
