export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: { type: 'block' },
		condition: {
			// See https://github.com/celenityy/BadBlock/issues/78
			requestDomains: [
				'content-load.com',
				'content-loader.com',
				'css-load.com',
				'error-report.com', // e.g. https://info.error-report.com/modal?eventId=&error=... (dogdrip.net)
				'html-load.cc',
				'html-load.com',
				'js-load.com',
			],
			resourceTypes: ['script', 'xmlhttprequest', 'sub_frame'],
		},
	},
];
