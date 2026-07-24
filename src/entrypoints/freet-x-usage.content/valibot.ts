import { array, digits, entriesFromList, literal, object, pipe, string, transform } from 'valibot';
import { BAR_WIDTH } from './config';

export type ResourceType = (typeof RESOURCE_TYPES)[number];
export const RESOURCE_TYPES = ['DATA', 'SMS', 'VOICE'] as const;

export const UsageSchema = pipe(
	object({
		status: literal('success'),
		data: object(
			entriesFromList(
				RESOURCE_TYPES,
				array(
					pipe(
						object({
							name: string(),
							...entriesFromList(
								['total', 'use', 'remain'],
								pipe(string(), digits(), transform(Number)),
							),
						}),
						transform((v) => {
							const filled = v.total === 0 ? 0 : Math.round((v.use / v.total) * BAR_WIDTH);
							return {
								name: v.name,
								total: v.total,
								used: v.use,
								remaining: v.remain,
								bar: '█'.repeat(filled) + '░'.repeat(BAR_WIDTH - filled),
							};
						}),
					),
				),
			),
		),
	}),
	transform((v) => ({ updatedAt: new Date(), ...v.data })),
);
