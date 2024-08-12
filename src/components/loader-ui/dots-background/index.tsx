"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useRef } from "react";

import styles from "./dots-background.module.scss";

export function DotsBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(wrapperRef.current, {
      "--mask-opacity-max": 0.4,
      "--mask-opacity-mid": 0.2,
      duration: 0.2,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(wrapperRef.current, {
      "--mask-opacity-max": 0.15,
      "--mask-opacity-mid": 0.15,
      duration: 0.2,
    });
  };

  const handleMouseMove = (e) => {
    // Adjust the offset to ensure the cursor is within the mask
    const offsetX = window.innerWidth * 0.5;
    const offsetY = window.innerHeight * 0.5;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    gsap.to(wrapperRef.current, {
      maskPosition: `${x}px ${y}px`,
      duration: 0.2,
    });
  };

  return (
    <motion.div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    ></motion.div>
  );
}
