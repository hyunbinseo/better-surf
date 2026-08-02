export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							'a',
							'abt',
							'bh',
							'bw',
							'bx',
							'by',
							'cr',
							'f',
							'i',
							'ie',
							'm',
							'p',
							'px',
							'py',
							'q',
							'r',
							'rev',
							's',
							'ssc',
							'sx',
							'sy',
							'time',
							'vh',
							'vw',
							'w',
						],
					},
				},
			},
		},
		condition: {
			// https://search.naver.com/p/crd/rd?m=1&px=410&...&u=<destination>&...
			urlFilter: '|https://search.naver.com/p/crd/rd?*',
			resourceTypes: ['main_frame'],
		},
	},
];
