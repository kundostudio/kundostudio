import type { Metadata } from "next";
import { Manifesto } from "./manifesto";

export const metadata: Metadata = {
	title: {
		absolute: "Manifesto | Kundo Studio",
	},
	description: "The Way of the Ninja Generalist. A manifesto by Kundo Studio.",
	robots: {
		index: false,
		follow: false,
	},
};

export default function ManifestoPage() {
	return <Manifesto />;
}
