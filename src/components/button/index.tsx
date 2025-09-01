import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				className,
				"rounded-full border border-primary h-8 px-6 flex items-center justify-center cursor-pointer",
			)}
			{...props}
		>
			<span className={cn(Typography.buttonStyles, "text-primary")}>{children}</span>
		</button>
	);
}
