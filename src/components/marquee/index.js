"use client";

import { useIntersectionObserver } from "@studio-freight/hamo";
import cn from "clsx";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import s from "./marquee.module.scss";

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });

  let length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });
  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }

  return tl;
}

const Marquee = ({
  children,
  repeat = 2,
  speed = 1,
  slowDownOnHover = false,
  offset = 0,
  inverted = false,
  className,
  animationStart = true,
  ...props
}) => {
  const [setIntersectionRef, intersection] = useIntersectionObserver({
    threshold: 0,
  });
  const containerRef = useRef(null);
  const loopRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (intersection?.isIntersecting && animationStart) {
      const boxes = gsap.utils.toArray(container.children);
      loopRef.current = horizontalLoop(boxes, {
        paused: false,
        repeat: -1,
        speed: inverted ? -speed : speed,
      });

      const handleMouseEnter = () => {
        if (loopRef.current && slowDownOnHover) {
          gsap.to(loopRef.current, {
            timeScale: 0.5,
            ease: "power1.inOut",
            duration: 0.3,
          });
        }
      };

      const handleMouseLeave = () => {
        if (loopRef.current && slowDownOnHover) {
          gsap.to(loopRef.current, {
            timeScale: 1,
            ease: "power1.inOut",
            duration: 0.3,
          });
        }
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);

        if (loopRef.current) {
          loopRef.current.kill();
        }
      };
    }
  }, [intersection?.isIntersecting, animationStart, speed, inverted, slowDownOnHover]);

  return (
    <div
      ref={(el) => {
        setIntersectionRef(el);
        containerRef.current = el;
      }}
      {...props}
      className={cn(className, s.marquee)}
      style={{ cursor: "pointer" }}
    >
      {new Array(repeat).fill(children).map((_, i) => (
        <div
          key={i}
          className={s.inner}
          aria-hidden={i !== 0 ?? undefined}
          data-nosnippet={i !== 0 ? "" : undefined}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export { Marquee };
