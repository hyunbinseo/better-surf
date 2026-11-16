export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			// https://push.alphwidget.com/api/script/onsite/active?platform=pc
			// https://static.alphwidget.com/script/Push-Script/PRODUCTION/alphapush_onsite.js
			requestDomains: ['alphwidget.com', 'alpha-core.click'],
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];
