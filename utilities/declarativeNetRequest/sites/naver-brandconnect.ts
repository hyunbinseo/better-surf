export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: { regexSubstitution: 'https://brandconnect.naver.com/affiliates/0\\1' },
		},
		condition: {
			// https://brandconnect.naver.com/affiliates/000000000000000?channelProductNo=00000000000
			regexFilter: '^https://brandconnect\\.naver\\.com/affiliates/\\d{2,}(\\?.*)$',
			requestDomains: ['brandconnect.naver.com'],
			resourceTypes: ['main_frame'],
		},
	},
	{
		id: 1,
		action: { type: 'block' },
		condition: {
			// https://brandconnect.pstatic.net/bridge/2026.08.20/assets/index-BkWlYaHD.js
			requestDomains: ['brandconnect.pstatic.net'],
			resourceTypes: ['script'],
		},
	},
];
