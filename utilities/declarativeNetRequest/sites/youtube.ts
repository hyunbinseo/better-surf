export const rules: chrome.declarativeNetRequest.Rule[] = [
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
						removeParams: ['si'],
					},
				},
			},
		},
		condition: {
			requestDomains: ['youtube.com', 'youtu.be'],
			urlFilter: 'si=',
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 0,
		priority: 101,
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
			urlFilter: '|https://www.youtube.com/redirect^*redir_token=*',
			resourceTypes: ['main_frame'],
		},
	},
];
