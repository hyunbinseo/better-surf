import { globSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

// Directory-qualified (e.g. `sites/youtube`, `blocklists/airbridge`) so
// same-named files in sites/ and blocklists/ can't collide on ruleset id.
export const dnrRulesets = globSync('{sites,blocklists}/*.ts', {
	cwd: import.meta.dirname,
})
	.sort()
	.map((file) => ({
		name: `${basename(dirname(file))}/${basename(file, '.ts')}`,
		path: resolve(import.meta.dirname, file),
	}));
