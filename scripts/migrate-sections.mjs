import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Parse .env.local manually to avoid dotenv dependency
const envPath = resolve(import.meta.dirname, "..", ".env.local");
for (const line of readFileSync(envPath, "utf8").split("\n")) {
	const match = line.match(/^([^#=]+)=["']?(.+?)["']?$/);
	if (match && !process.env[match[1]]) {
		process.env[match[1]] = match[2];
	}
}

const DRY_RUN = process.argv.includes("--dry-run");

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token && !DRY_RUN) {
	console.error(
		"Missing SANITY_API_WRITE_TOKEN in .env.local. Add a write token from sanity.io/manage.",
	);
	process.exit(1);
}

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-06",
	token: token || process.env.SANITY_API_READ_TOKEN,
	useCdn: false,
});

const RENAME_MAP = {
	"[PROBLEM]": "The Challenge",
	"[SOLUTION]": "The Solution",
};

const REMOVE_TITLES = new Set(["[PROCESS]", "[RESULT]"]);

async function main() {
	const projects = await client.fetch(
		`*[_type == "project"]{ _id, name, secondaryDescription }`,
	);

	console.log(`Found ${projects.length} project(s)\n`);

	const toUpdate = [];

	for (const project of projects) {
		const sections = project.secondaryDescription?.sections;
		if (!sections || sections.length === 0) {
			console.log(`⏭  "${project.name}" — no sections, skipping`);
			continue;
		}

		const before = sections.map((s) => s.title || "(untitled)");

		const updated = sections
			.filter((s) => !REMOVE_TITLES.has(s.title))
			.map((s) => {
				if (RENAME_MAP[s.title]) {
					return { ...s, title: RENAME_MAP[s.title] };
				}
				return s;
			});

		const after = updated.map((s) => s.title || "(untitled)");

		const changed =
			before.length !== after.length ||
			before.some((t, i) => t !== after[i]);

		if (!changed) {
			console.log(`✓  "${project.name}" — already up to date`);
			continue;
		}

		console.log(`→  "${project.name}"`);
		console.log(`   Before: ${JSON.stringify(before)}`);
		console.log(`   After:  ${JSON.stringify(after)}`);

		toUpdate.push({ _id: project._id, name: project.name, sections: updated });
	}

	console.log(`\n${toUpdate.length} project(s) need updating`);

	if (DRY_RUN) {
		console.log("\n🏁 Dry run complete. Re-run without --dry-run to apply.\n");
		return;
	}

	console.log("\nApplying patches...\n");

	for (const { _id, name, sections } of toUpdate) {
		await client
			.patch(_id)
			.set({ "secondaryDescription.sections": sections })
			.commit();
		console.log(`✓  Patched "${name}"`);
	}

	console.log("\n🏁 Migration complete.\n");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
