const MIN_VALUE = 201;

export const rule_firefox: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'modifyHeaders',
			requestHeaders: [
				{
					header: 'User-Agent',
					operation: 'set',
					value:
						'Mozilla/5.0 (; ; ) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
				},
			],
		},
		condition: {
			urlFilter: '|https://*.swit.io/*',
			resourceTypes: ['main_frame'],
		},
	},
];

for (const [index, rule] of rule_firefox.entries()) {
	rule.id = MIN_VALUE + rule_firefox.length - index - 1;
}
