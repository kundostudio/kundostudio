import { textStyles } from "~/components/typography";
import { cn } from "~/lib/utils";
import ArrowLink from "~/public/icons/arrow-link.svg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	isExternal?: boolean;
};

export function Button({ className, children, isExternal, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				"glass-btn rounded-full h-9 min-w-32 px-6",
				className,
			)}
			{...props}
		>
			<span className={cn(textStyles.button, "text-white relative z-10")}>{children}</span>
			{isExternal && <ArrowLink className="ml-2 size-[14px] relative z-10" />}
		</button>
	);
}
