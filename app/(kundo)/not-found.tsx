"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/button";
import { Page } from "~/components/page";
import * as Typography from "~/components/typography";

export default function NotFound() {
	const router = useRouter();

	return (
		<Page>
			<div className="container mt-[88px] sm:mt-[160px]">
				<Typography.H1 className="text-primary">Not the page you were looking for.</Typography.H1>
				<div className="mt-12">
					<Button onClick={() => router.push("/")}>Back to Homepage</Button>
				</div>
			</div>
		</Page>
	);
}
