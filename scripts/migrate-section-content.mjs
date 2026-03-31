import { createClient } from "@sanity/client";
import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Parse .env.local
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
	console.error("Missing SANITY_API_WRITE_TOKEN in .env.local.");
	process.exit(1);
}

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-06",
	token: token || process.env.SANITY_API_READ_TOKEN,
	useCdn: false,
});

function key() {
	return randomBytes(6).toString("hex");
}

function toPortableText(text) {
	return [
		{
			_key: key(),
			_type: "block",
			children: [{ _key: key(), _type: "span", marks: [], text }],
			markDefs: [],
			style: "normal",
		},
	];
}

// Project name (case-insensitive match) → { challenge, solution }
const COPY = {
	scale: {
		challenge:
			"Scale had outgrown its digital presence. The existing site didn\u2019t reflect their position as a leader in AI infrastructure \u2014 it felt dated, cluttered, and disconnected from the ambition of the platform. They needed a site that could grow with them.",
		solution:
			"We redesigned every page around clarity and structure \u2014 rethinking layout, typography, and visual hierarchy to deliver an experience that feels as precise as the technology behind it. A modular design system ensures the site scales alongside the platform. The response was immediate: the site became a reference point in AI design circles.",
	},
	"emerge tools": {
		challenge:
			"Emerge Tools was growing fast, but their product suite felt scattered. Users struggled to understand the distinct value of each offering, and the brand lacked the cohesion needed to signal maturity in a competitive space.",
		solution:
			"We refined the visual identity and introduced a badge system that brought clarity to each product \u2014 allowing every tool to stand on its own while feeling part of a unified suite. The redesigned website simplified navigation and reinforced trust at every step. Emerge Tools entered its next chapter with a stronger, clearer presence \u2014 now part of Sentry\u2019s ecosystem.",
	},
	runreal: {
		challenge:
			"Runreal\u2019s tools were powerful, but their brand and product told a fragmented story. The experience felt disconnected \u2014 great technology hidden behind complexity, making sales conversations harder and credibility with enterprise buyers difficult to establish.",
		solution:
			"We rebuilt the brand from the ground up \u2014 sharp, modern, unmistakable. Working closely with the founders, we defined a visual and verbal system to ground the identity, designed an immersive site to tell their story, and streamlined product flows to make complex workflows feel simple. A bold new presence that resets the standard for gaming infrastructure.",
	},
	meow: {
		challenge:
			"Most crypto projects feel sterile and interchangeable. MEOW needed to break that pattern \u2014 not just as another token, but as a cultural moment that could turn skepticism into genuine engagement.",
		solution:
			"We built a retro-inspired experience packed with nostalgia, interactivity, and visual personality. Pixel textures, console-like UI, and playful motion gave MEOW a voice that felt nothing like crypto and everything like community. The launch debuted live in front of 3,000 people and captured attention across the space \u2014 and the momentum held. The community grew rapidly, fueling an open-world game that continues to expand.",
	},
	rebill: {
		challenge:
			"Rebill was building the payment infrastructure for Latin America, but their product and brand lacked the confidence to match that ambition. The dashboard felt fragmented, and the identity didn\u2019t convey the trust needed to compete with global players.",
		solution:
			"We redesigned the core product experience and built a new visual identity \u2014 bold, flexible, and engineered to scale. Every element was aligned to signal reliability and growth potential, from the visual system to the dashboard flows. Rebill emerged with a presence as sharp as the infrastructure behind it, ready to scale across the region.",
	},
	"fresh vintage": {
		challenge:
			"Casino gaming is often caught between outdated aesthetics and impersonal digital experiences. Fresh Vintage wanted to bridge that gap \u2014 honoring the nostalgia of classic gameplay while signaling modern innovation.",
		solution:
			"We built a bold, cinematic identity that fuses vintage soul with contemporary polish: rich palettes, expressive typography, and subtle nods to casino heritage. The system extends seamlessly across product and marketing, giving Fresh Vintage a distinctive voice in a crowded, fast-evolving space.",
	},
	netic: {
		challenge:
			"Netic was entering a competitive AI market without a clear identity or product foundation. To gain credibility with investors and early users, they needed more than a logo \u2014 they needed a cohesive brand and an interface that inspired trust from day one.",
		solution:
			"We developed a modern, flexible identity system that balanced clarity with confidence, and shaped the first product flows to feel simple and approachable for small businesses. Netic launched with a strong, unified presence that laid the foundation for early traction and investor confidence \u2014 momentum that carried into their $20M raise.",
	},
	basepub: {
		challenge:
			"AI research is accelerating, but the experience of following it was noisy. BasePub surfaced strong signals, but the interface made it easy to get lost in feeds, filters, and fragmented views. It needed to feel like a clear window into the work, not another layer of complexity.",
		solution:
			"We rebuilt the experience around focus and legibility \u2014 calmer layouts, clear hierarchy, and interactions that make dense information easy to scan and act on. Instead of a complete reset, we evolved the product: tighter spacing, clearer navigation, more deliberate typography. BasePub now presents AI research as something you move through with confidence, not fight against.",
	},
	pragma: {
		challenge:
			"Studios building multiplayer games face a fragmented backend landscape \u2014 tools that limit flexibility, slow iteration, and make scaling harder than it should be. Pragma needed a clear way to communicate that their infrastructure is different: powerful, transparent, and built to empower.",
		solution:
			"We crafted a confident identity that framed Pragma\u2019s platform as both technically advanced and approachable. The visual system, web architecture, and narrative were built around key platform pillars \u2014 giving developers immediate clarity on its value without losing the weight of its capabilities. A brand presence that feels cohesive, scalable, and built for what\u2019s next.",
	},
};

async function main() {
	const projects = await client.fetch(
		`*[_type == "project"]{ _id, name, secondaryDescription }`,
	);

	console.log(`Found ${projects.length} project(s)\n`);

	const toUpdate = [];

	for (const project of projects) {
		const copy = COPY[project.name.toLowerCase()];
		if (!copy) {
			console.log(`\u23ed  "${project.name}" \u2014 no new copy defined, skipping`);
			continue;
		}

		const sections = project.secondaryDescription?.sections;
		if (!sections || sections.length === 0) {
			console.log(`\u23ed  "${project.name}" \u2014 no sections, skipping`);
			continue;
		}

		const updated = sections.map((s) => {
			if (s.title === "The Challenge") {
				return { ...s, content: toPortableText(copy.challenge) };
			}
			if (s.title === "The Solution") {
				return { ...s, content: toPortableText(copy.solution) };
			}
			return s;
		});

		const preview = (text) =>
			text.length > 80 ? text.slice(0, 80) + "\u2026" : text;

		console.log(`\u2192  "${project.name}"`);
		console.log(`   The Challenge: ${preview(copy.challenge)}`);
		console.log(`   The Solution:  ${preview(copy.solution)}`);

		toUpdate.push({
			_id: project._id,
			name: project.name,
			sections: updated,
		});
	}

	console.log(`\n${toUpdate.length} project(s) to update`);

	if (DRY_RUN) {
		console.log(
			"\n\ud83c\udfc1 Dry run complete. Re-run without --dry-run to apply.\n",
		);
		return;
	}

	console.log("\nApplying patches...\n");

	for (const { _id, name, sections } of toUpdate) {
		await client
			.patch(_id)
			.set({ "secondaryDescription.sections": sections })
			.commit();
		console.log(`\u2713  Patched "${name}"`);
	}

	console.log("\n\ud83c\udfc1 Migration complete.\n");
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
