import { globSync } from 'node:fs';
import { resolve } from 'node:path';

// One ruleset per directory, not per file: Firefox silently ignores every
// static ruleset past the 20th (Chrome allows 50). Priority is global, so
// merging files doesn't change which rule wins.
export const dnrRulesets = (['sites', 'blocklists'] as const).map((name) => ({
	name,
	paths: globSync(`${name}/*.ts`, { cwd: import.meta.dirname })
		.sort()
		.map((file) => resolve(import.meta.dirname, file)),
}));
