"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState, type JSX } from "react";

import { Typography } from "~/components/typography";
import { cn } from "~/lib/utils";

import { CarouselButton } from "./button";

interface CarouselItem {
  image: string;
  name: string;
  link: string;
}

type Props = JSX.IntrinsicElements["div"] & {
  items: CarouselItem[];
  description?: React.ReactNode;
};

export function Carousel({ items, description, className, ...props }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + items.length) % items.length;
    setPage([page + newDirection, newDirection]);
    setCurrentIndex(newIndex);
  };

  // Base container with aspect ratio
  const containerClasses = cn(
    "relative w-full",
    "before:content-[''] before:block before:pb-[56.25%]", // 16:9 aspect ratio
    className
  );

  // If no items, show placeholder
  if (!items.length) {
    return (
      <div className={containerClasses} {...props}>
        <div className="absolute inset-0 bg-tertiary" />
      </div>
    );
  }

  return (
    <div className={containerClasses} {...props}>
      {/* Content wrapper */}
      <div className="absolute inset-0">
        {/* Carousel content with overflow hidden */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 1000 : -1000,
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                },
                exit: (direction: number) => ({
                  zIndex: 0,
                  x: direction < 0 ? 1000 : -1000,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 50 },
              }}
              className="absolute inset-0"
            >
              {/* Main Image */}
              <Link href={items[currentIndex].link as any} className="block w-full h-full">
                <Image
                  src={items[currentIndex].image}
                  alt={items[currentIndex].name}
                  fill
                  className="object-cover"
                  priority
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <CarouselButton direction="left" onClick={() => paginate(-1)}>PREV</CarouselButton>
          <CarouselButton direction="right" onClick={() => paginate(1)}>NEXT</CarouselButton>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 translate-y-full left-0 right-0 py-2 flex justify-between items-start">
          {/* Description */}
          <div className="text-start">{description}</div>

          {/* Pagination */}
          <Typography.P className="text-primary">
            {String(currentIndex + 1).padStart(2, "0")} — {String(items.length).padStart(2, "0")}
          </Typography.P>
        </div>
      </div>
    </div>
  );
}
