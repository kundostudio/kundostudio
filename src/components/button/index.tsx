import * as Typography from "~/components/typography";
import { cn } from "~/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, children, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={cn(
				"relative rounded-full h-8 px-6 flex items-center justify-center cursor-pointer",
				"backdrop-blur-[6px] bg-white/0.2 hover:bg-white/12 transition-all ease-out-circ duration-300 border-0",
				className,
			)}
			style={{
				boxShadow: `
					inset -1px -1px 0px -0.5px rgba(255, 255, 255, 0.24),
					inset 1px 1px 0px -0.5px rgba(255, 255, 255, 0.24),
					inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.12),
					0px 4.12px 9.21px 0px rgba(0, 0, 0, 0.1),
					0px 16.73px 16.73px 0px rgba(0, 0, 0, 0.09),
					0px 37.82px 22.79px 0px rgba(0, 0, 0, 0.05),
					0px 67.15px 26.91px 0px rgba(0, 0, 0, 0.01),
					0px 104.97px 29.33px 0px rgba(0, 0, 0, 0)
				`,
			}}
			{...props}
		>
			{/* First angular gradient layer */}
			<div
				className="absolute inset-0 rounded-full"
				style={{
					mask: `
					linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0)
				`,
					maskComposite: "xor",
					WebkitMask: `
					linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0)
				`,
					WebkitMaskComposite: "xor",
					padding: "1px",
				}}
			>
				<div
					className="absolute inset-0 aspect-square m-auto"
					style={{
						background: `
					radial-gradient(ellipse 64px 32px at 25% 50%, 
					rgba(255, 255, 255, 0) 0%,
					rgba(255, 255, 255, 0.24) 100%
					)
					`,
						transform: "rotate(125deg)",
					}}
				/>
			</div>
			{/* Second angular gradient layer */}
			<div
				className="absolute inset-0 rounded-full"
				style={{
					mask: `
					linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0)
				`,
					maskComposite: "xor",
					WebkitMask: `
					linear-gradient(#fff 0 0) content-box,
					linear-gradient(#fff 0 0)
				`,
					WebkitMaskComposite: "xor",
					padding: "1px",
				}}
			>
				<div
					className="absolute inset-0 aspect-square m-auto"
					style={{
						background: `
					radial-gradient(ellipse 64px 32px at 25% 50%, 
					rgba(255, 255, 255, 0) 0%,
					rgba(255, 255, 255, 0.24) 100%
					)
					`,
						transform: "rotate(25deg)",
					}}
				/>
			</div>

			<span className={cn(Typography.buttonStyles, "text-white relative z-10")}>{children}</span>
		</button>
	);
}
