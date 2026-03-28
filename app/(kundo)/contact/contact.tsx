"use client";

import { type FormEvent, useState } from "react";
import { cn } from "~/lib/utils";

const SERVICE_OPTIONS = [
	"All",
	"Visual Identity",
	"Landing Page / Website",
	"Product Design",
	"Motion Design",
] as const;

const BUDGET_OPTIONS = [
	"Under $10K",
	"$10-25K",
	"$25-50K",
	"$50-100K",
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

const text = "font-inter text-[12px] font-normal leading-[14px] tracking-[0.2px]";

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
				text,
				"rounded-[5px] px-4 py-[10px] tabular-nums transition-colors duration-150",
				selected
					? "bg-primary text-[#fafafa]"
					: "bg-[#ebebeb] text-[#808080]",
			)}
		>
			{children}
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
		<div className="flex flex-col gap-2">
			<label className={cn(text, "text-primary")}>
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
					text,
					"w-full max-w-[320px] rounded-[5px] bg-[#ebebeb] px-4 py-[10px]",
					"text-primary placeholder:text-[#808080]",
					"border-none outline-none",
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
		<div className="flex flex-col gap-2">
			<label className={cn(text, "text-primary")}>
				{label}
			</label>
			<textarea
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={cn(
					text,
					"w-full max-w-[352px] min-h-[80px] rounded-[5px] bg-[#ebebeb] px-4 py-[10px] resize-y",
					"text-primary placeholder:text-[#808080]",
					"border-none outline-none",
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
		<div className="flex flex-col gap-2">
			<label className={cn(text, "text-primary")}>
				{label}
				{required && "*"}
			</label>
			<div className="flex flex-wrap gap-1">
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
			<div className="pt-[56px] px-6">
				<p className={cn(text, "leading-[18px] text-primary max-w-[400px] text-balance animate-enter")}>
					Thanks for reaching out. We&apos;ll follow up within 48 hours, or as soon as we can.
				</p>
			</div>
		);
	}

	return (
		<div className="pt-[56px] px-6 pb-24">
			<p
				className={cn(text, "leading-[18px] text-primary max-w-[400px] mb-16 text-balance animate-enter")}
				style={{ "--stagger": 0 } as React.CSSProperties}
			>
				Let&apos;s talk about what&apos;s next. A few details to help us understand where you are and what you need.
			</p>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-6 animate-enter"
				style={{ "--stagger": 1 } as React.CSSProperties}
			>
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
					onSelect={(v) => setForm({ ...form, services: v as string[] })}
					multi
				/>

				<TextArea
					label="Tell us a bit more about your project:"
					placeholder="Type your answer here..."
					value={form.details}
					onChange={(v) => setForm({ ...form, details: v })}
				/>

				<PillGroup
					label="Budget range"
					required
					options={BUDGET_OPTIONS}
					selected={form.budget}
					onSelect={(v) => setForm({ ...form, budget: v as string })}
				/>

				<PillGroup
					label="Company stage"
					required
					options={STAGE_OPTIONS}
					selected={form.stage}
					onSelect={(v) => setForm({ ...form, stage: v as string })}
				/>

				{error && (
					<p className={cn(text, "text-[#dc2626]")}>{error}</p>
				)}

				<button
					type="submit"
					disabled={!isValid || sending}
					className={cn(
						text,
						"w-fit rounded-[5px] bg-[#ebebeb] px-4 py-[10px] text-[#808080]",
						"transition-opacity duration-150",
						(!isValid || sending) && "opacity-40 cursor-not-allowed",
					)}
				>
					{sending ? "Sending..." : "Submit"}
				</button>
			</form>
		</div>
	);
}
