import { readdirSync, readFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { createLinter } from 'actionlint';

const dir = '.github/workflows';

// The workflow that broke the deploy was valid YAML: a run step had picked up a "with" key
// after a bad indent. Only a schema aware linter sees that, so this runs actionlint.
const lint = await createLinter();
const files = readdirSync(dir).filter((name) => name.endsWith('.yml') || name.endsWith('.yaml'));

let problems = 0;

for (const name of files) {
	// The path goes back out inside actionlint's JSON, where a Windows backslash would not survive
	// the parse, so it travels with forward slashes.
	const results = lint(readFileSync(join(dir, name), 'utf8'), posix.join(dir, name));
	for (const result of results) {
		console.error(`${posix.join(dir, name)}:${result.line}:${result.column} [${result.kind}] ${result.message}`);
		problems++;
	}
}

if (problems > 0) {
	console.error(`\n${problems} problem(s) in ${files.length} workflow file(s).`);
	process.exit(1);
}

console.log(`${files.length} workflow file(s), no problems.`);
