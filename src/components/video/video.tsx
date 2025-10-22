"use client";
import MuxPlayer from "@mux/mux-player-react";
import { type JSX, useState } from "react";

type Props = JSX.IntrinsicElements["video"] & {
	isStreaming?: boolean;
};

export function Video({ src, isStreaming = false, ...props }: Props) {
	const [muted, setMuted] = useState(true);

	// const MuteButton = () => (
	//   <button
	//     type="button"
	//     className="absolute h-10 w-10 bottom-0 flex justify-center items-center right-0 z-50 p-2 overflow-hidden"
	//     onClick={() => setMuted(!muted)}
	//   >
	//     <IoVolumeHigh className="h-5 w-5" />
	//     <div className="absolute flex justify-center items-center w-7 h-7 translate-x-[-4px] overflow-hidden">
	//       <AnimatePresence mode="wait">
	//         {muted && (
	//           <motion.div
	//             className="w-5 h-[1px] absolute bg-white"
	//             initial={{ x: -30, y: -30, rotate: "45deg", opacity: 0 }}
	//             animate={{ x: 0, y: 0, opacity: 1 }}
	//             exit={{ x: 30, y: 30, opacity: 0 }}
	//             transition={{ duration: 0.5 }}
	//           />
	//         )}
	//       </AnimatePresence>
	//     </div>
	//   </button>
	// );

	if (isStreaming) {
		return (
			<div className="relative h-full flex my-auto">
				<MuxPlayer
					streamType="on-demand"
					playbackId={src}
					autoPlay
					loop
					muted={muted}
					nohotkeys
					defaultHiddenCaptions
					thumbnailTime={0}
					className="h-full max-w-full [--controls:none] [--media-object-fit:contain]"
				/>
				{/* <MuteButton /> */}
			</div>
		);
	}

	return (
		<div className="relative h-full flex my-auto">
			<video loop autoPlay muted={muted} src={src} {...props} />
			{/* <MuteButton /> */}
		</div>
	);
}
