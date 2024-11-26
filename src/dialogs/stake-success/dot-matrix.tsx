import { useMediaQuery, useRect } from "@studio-freight/hamo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Dot = {
  id: number;
  x: number;
  y: number;
};

export function DotMatrix({ className }: JSX.IntrinsicElements["div"]) {
  const [dots, setDots] = useState<Dot[]>([]);
  const [setRef, rect] = useRect();

  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (!rect || isMobile) return;

    const padding = 20;
    const minX = padding;
    const maxX = rect.width - padding - 2;
    const minY = padding;
    const maxY = rect.height - padding - 2;

    if (maxX <= minX || maxY <= minY) return;

    const newDots = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.floor(minX + Math.random() * (maxX - minX)),
      y: Math.floor(minY + Math.random() * (maxY - minY)),
    }));

    setDots(newDots);
  }, [rect, isMobile]);

  return (
    <div ref={setRef} className={className}>
      {!isMobile &&
        dots.map((dot) => (
          <motion.span
            key={dot.id}
            className="dot"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random(),
              repeatDelay: Math.random() * 2,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${dot.x}px`,
              top: `${dot.y}px`,
              width: "2px",
              height: "2px",
              backgroundColor: "rgb(var(--current-color))",
            }}
          />
        ))}
    </div>
  );
}
