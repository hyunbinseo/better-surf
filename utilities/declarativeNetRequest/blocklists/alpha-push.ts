export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			// e.g. https://push.alphwidget.com/api/script/onsite/active?platform=pc
			// e.g. https://static.alphwidget.com/script/Push-Script/PRODUCTION/alphapush_onsite.js
			requestDomains: ['alphwidget.com', 'alpha-core.click'],
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];
