"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "~/components/button";
import { Page } from "~/components/page";
import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";

const SERVICE_OPTIONS = [
	"All",
	"Landing Page",
	"Website",
	"Product Design",
	"Motion",
	"Not sure yet",
] as const;

const BUDGET_OPTIONS = [
	"$10K\u2013$25K",
	"$25K\u2013$50K",
	"$50K\u2013$100K",
	"$100K+",
] as const;

const STAGE_OPTIONS = [
	"Founder",
	"Pre-Seed",
	"Seed",
	"Series A+",
	"Established",
] as const;

type FormData = {
	name: string;
	email: string;
	company: string;
	website: string;
	services: string[];
	details: string;
	budget: string;
	stage: string;
};

function PillButton({
	selected,
	onClick,
	children,
}: {
	selected: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"h-8 rounded-full px-5 py-[5px] font-inter text-[14px] font-normal transition-all duration-200",
				selected
					? "bg-white text-black"
					: "glass-btn text-secondary hover:text-primary",
			)}
		>
			<span className="relative z-10">{children}</span>
		</button>
	);
}

function TextInput({
	label,
	required,
	placeholder,
	value,
	onChange,
	type = "text",
}: {
	label: string;
	required?: boolean;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	type?: string;
}) {
	return (
		<div className="flex flex-col gap-[10px]">
			<label className="font-inter text-[14px] font-medium leading-[19px] text-primary">
				{label}
				{required && "*"}
			</label>
			<input
				type={type}
				required={required}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(
					"h-8 w-full md:w-[340px] rounded-lg border border-white/20 bg-transparent px-4",
					"font-inter text-[14px] font-normal text-primary placeholder:text-secondary",
					"outline-none transition-all duration-200",
					"focus:border-white focus:backdrop-blur-[12px] focus:bg-[linear-gradient(182.51deg,rgba(255,255,255,0.02)_27.09%,rgba(90,90,90,0.02)_58.59%,rgba(0,0,0,0.02)_92.75%)]",
					"focus:shadow-[0px_4.12px_9.21px_0px_rgba(0,0,0,0.1),0px_16.73px_16.73px_0px_rgba(0,0,0,0.09),0px_37.82px_22.79px_0px_rgba(0,0,0,0.05),0px_67.15px_26.91px_0px_rgba(0,0,0,0)]",
				)}
			/>
		</div>
	);
}

function TextArea({
	label,
	placeholder,
	value,
	onChange,
}: {
	label: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="flex flex-col gap-[10px]">
			<label className="font-inter text-[14px] font-medium leading-[19px] text-primary">
				{label}
			</label>
			<textarea
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(
					"min-h-[64px] rounded-lg px-4 py-3 resize-y",
					"border border-white/20 backdrop-blur-[12px] focus:border-white",
					"bg-[linear-gradient(182.51deg,rgba(255,255,255,0.02)_27.09%,rgba(90,90,90,0.02)_58.59%,rgba(0,0,0,0.02)_92.75%)]",
					"shadow-[0px_4.12px_9.21px_0px_rgba(0,0,0,0.1),0px_16.73px_16.73px_0px_rgba(0,0,0,0.09),0px_37.82px_22.79px_0px_rgba(0,0,0,0.05),0px_67.15px_26.91px_0px_rgba(0,0,0,0)]",
					"font-inter text-[14px] font-normal text-primary placeholder:text-secondary",
					"outline-none transition-all duration-200",
				)}
			/>
		</div>
	);
}

function PillGroup({
	label,
	required,
	options,
	selected,
	onSelect,
	multi = false,
}: {
	label: string;
	required?: boolean;
	options: readonly string[];
	selected: string | string[];
	onSelect: (value: string | string[]) => void;
	multi?: boolean;
}) {
	const handleClick = (option: string) => {
		if (multi) {
			const current = selected as string[];
			if (option === "All") {
				onSelect(current.includes("All") ? [] : ["All"]);
			} else {
				const withoutAll = current.filter((s) => s !== "All");
				if (withoutAll.includes(option)) {
					onSelect(withoutAll.filter((s) => s !== option));
				} else {
					onSelect([...withoutAll, option]);
				}
			}
		} else {
			onSelect(option === selected ? "" : option);
		}
	};

	const isSelected = (option: string) => {
		if (multi) return (selected as string[]).includes(option);
		return selected === option;
	};

	return (
		<div className="flex flex-col gap-[10px]">
			<label className="font-inter text-[14px] font-medium leading-[19px] text-primary">
				{label}
				{required && "*"}
			</label>
			<div className="flex flex-wrap gap-2">
				{options.map((option) => (
					<PillButton
						key={option}
						selected={isSelected(option)}
						onClick={() => handleClick(option)}
					>
						{option}
					</PillButton>
				))}
			</div>
		</div>
	);
}

function SuccessState() {
	return (
		<div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6">
			<div className="flex flex-col items-center gap-4 text-center">
				<h1 className={cn(textStyles.h1, "text-primary")}>
					Thanks for reaching out.
				</h1>
				<p className="font-inter text-[16px] font-semibold leading-[25px] text-secondary">
					We&apos;ll follow up within 48 hours, or as soon as we can.
				</p>
				<div className="mt-4">
					<Link href="/">
						<Button>Back to Homepage</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export function ContactPage() {
	const [submitted, setSubmitted] = useState(false);
	const [sending, setSending] = useState(false);
	const [error, setError] = useState("");
	const [form, setForm] = useState<FormData>({
		name: "",
		email: "",
		company: "",
		website: "",
		services: [],
		details: "",
		budget: "",
		stage: "",
	});

	const isValid =
		form.name.trim() !== "" &&
		form.email.trim() !== "" &&
		form.company.trim() !== "" &&
		form.services.length > 0 &&
		form.budget !== "" &&
		form.stage !== "";

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isValid || sending) return;

		setSending(true);
		setError("");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || "Something went wrong. Please try again.");
				return;
			}

			setSubmitted(true);
		} catch {
			setError("Failed to send. Please check your connection and try again.");
		} finally {
			setSending(false);
		}
	};

	if (submitted) {
		return (
			<Page>
				<SuccessState />
			</Page>
		);
	}

	return (
		<Page className="pb-24 lg:pb-32">
			<div className="container">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-28 sm:pt-32 lg:pt-40"
				>
					{/* Left column — heading + subtitle */}
					<div className="lg:w-[440px] xl:w-[480px] shrink-0 lg:sticky lg:top-40 lg:self-start">
						<h1 className={cn(textStyles.h1, "text-primary")}>
							Let&apos;s talk about what&apos;s next.
						</h1>
						<p className="font-inter text-[16px] font-semibold leading-[25px] text-secondary mt-4">
							A few details to help us understand where you are
							and what you need. We&apos;ll get back to you as
							soon as we can.
						</p>
					</div>

					{/* Right column — form fields */}
					<div className="flex flex-col gap-6 flex-1 min-w-0">
						<TextInput
							label="Your name"
							required
							value={form.name}
							onChange={(v) => setForm({ ...form, name: v })}
						/>

						<TextInput
							label="Your email"
							required
							type="email"
							value={form.email}
							onChange={(v) => setForm({ ...form, email: v })}
						/>

						<TextInput
							label="Company name"
							required
							value={form.company}
							onChange={(v) => setForm({ ...form, company: v })}
						/>

						<TextInput
							label="Website"
							placeholder="Feel free to skip this..."
							value={form.website}
							onChange={(v) => setForm({ ...form, website: v })}
						/>

						<PillGroup
							label="What are you looking for?"
							required
							options={SERVICE_OPTIONS}
							selected={form.services}
							onSelect={(v) =>
								setForm({ ...form, services: v as string[] })
							}
							multi
						/>

						<TextArea
							label="Tell us a bit more about your project:"
							placeholder="Goals, timeline, and anything else we should know."
							value={form.details}
							onChange={(v) => setForm({ ...form, details: v })}
						/>

						<PillGroup
							label="Budget range"
							required
							options={BUDGET_OPTIONS}
							selected={form.budget}
							onSelect={(v) =>
								setForm({ ...form, budget: v as string })
							}
						/>

						<PillGroup
							label="Company stage"
							required
							options={STAGE_OPTIONS}
							selected={form.stage}
							onSelect={(v) =>
								setForm({ ...form, stage: v as string })
							}
						/>

						{error && (
							<p className="font-inter text-[14px] text-red-400">
								{error}
							</p>
						)}

						<div className="mt-4">
							<button
								type="submit"
								disabled={!isValid || sending}
								className={cn(
									"glass-btn rounded-full h-12 px-8 min-w-[160px]",
									"transition-opacity duration-200",
									(!isValid || sending) && "opacity-40 cursor-not-allowed",
								)}
							>
								<span
									className={cn(
										textStyles.button,
										"text-primary relative z-10",
									)}
								>
									{sending ? "Sending..." : "Submit"}
								</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</Page>
	);
}
