export const rules: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 0,
		action: {
			type: 'redirect',
			redirect: {
				transform: {
					queryTransform: {
						removeParams: [
							'asc_campaign',
							'asc_refurl',
							'asc_source',
							'ascsubtag',
							'camp',
							'content-id',
							'creative',
							'creativeASIN',
							'crid',
							'keywords',
							'linkCode',
							'pd_rd_i',
							'pd_rd_r',
							'pd_rd_w',
							'pd_rd_wg',
							'pf_rd_i',
							'pf_rd_m',
							'pf_rd_p',
							'pf_rd_r',
							'pf_rd_s',
							'pf_rd_t',
							'psc',
							'qid',
							'ref',
							'ref_',
							'sprefix',
							'sr',
							'tag', // affiliate
							'th',
						],
					},
				},
			},
		},
		condition: {
			requestDomains: ['amazon.com'],
			resourceTypes: ['main_frame'],
		},
	},
];
