import { useIntersectionObserver } from "@studio-freight/hamo";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

import styles from "./hacker-text.module.scss";

type Props = {
  as?: React.ElementType;
  children: string;
  iterationsToAdvance?: number;
  randomLettersAmount?: number;
  speed?: number;
  letters?: string;
  startsComplete?: boolean;
  repeatsComplete?: boolean;
  minRepeatTime?: number;
  maxRepeatTime?: number;
  preventRepeat?: boolean;
} & JSX.IntrinsicElements["div"];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const RANDOM_LETTERS_AMOUNT = 5;
const ITERATIONS_TO_ADVANCE = 3;
const ITERATION_SPEED = 20;

export function HackerText({
  children,
  className,
  randomLettersAmount = RANDOM_LETTERS_AMOUNT,
  iterationsToAdvance = ITERATIONS_TO_ADVANCE,
  speed = ITERATION_SPEED,
  letters = LETTERS,
  startsComplete = false,
  repeatsComplete = true,
  minRepeatTime = 1000,
  maxRepeatTime = 2000,
  preventRepeat = false,
  ...props
}: Props) {
  const interval = useRef<any>(null);
  const timeout = useRef<any>(null);

  const [text, setText] = useState(children);
  const [wasRevealed, setWasRevealed] = useState(false);
  const [isTextComplete, setIsTextComplete] = useState(startsComplete);

  const [intersectionRef, intersection] = useIntersectionObserver();
  const isVisible = intersection.isIntersecting;

  const getRandomLetter = useCallback(() => {
    return letters[Math.floor(Math.random() * letters.length)];
  }, [letters]);

  const animateText = useCallback(() => {
    if (typeof children !== "string") return;

    let iteration = 0;

    interval.current = setInterval(() => {
      const isCompleted = iteration > children.length + randomLettersAmount;

      const newText = children
        .toString()
        .split("")
        .map((letter, index) => {
          if (letter === " ") {
            return letter;
          }
          if (index < iteration - randomLettersAmount) {
            return letter;
          }
          if (index >= iteration - randomLettersAmount && index < iteration) {
            return getRandomLetter();
          }

          return index === 0 || isTextComplete ? getRandomLetter() : "";
        })
        .join("");

      if (isCompleted) {
        clearInterval(interval.current);
        if (!wasRevealed) {
          setWasRevealed(true);
          if (repeatsComplete) {
            setIsTextComplete(true);
          }
        }

        // repeats the animation in a random time between minRepeatTime and maxRepeatTime
        if (!preventRepeat) {
          const randomTime = Math.random() * (maxRepeatTime - minRepeatTime) + minRepeatTime;
          timeout.current = setTimeout(animateText, randomTime);
        }
      }

      iteration += 1 / iterationsToAdvance;
      setText(newText);
    }, speed);
  }, [
    children,
    speed,
    randomLettersAmount,
    iterationsToAdvance,
    isTextComplete,
    getRandomLetter,
    wasRevealed,
    preventRepeat,
    repeatsComplete,
    maxRepeatTime,
    minRepeatTime,
  ]);

  useEffect(() => {
    const shouldAnimate = !preventRepeat || (preventRepeat && !wasRevealed);

    if (isVisible && shouldAnimate) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      animateText();
    }

    return () => {
      if (!isVisible) {
        clearInterval(interval.current);
        clearTimeout(timeout.current);
      }
    };
  }, [isVisible, animateText, preventRepeat, wasRevealed]);

  const originalWords = children.split(" ");
  const randomWords = text.split(" ");

  return (
    <span ref={intersectionRef} className={cn(styles.wrapper, className)} {...props}>
      {originalWords.map((word, index) => (
        <span key={index} className={styles.text}>
          <span className={styles.animatedText}>
            {randomWords[index]}
            {index !== originalWords.length - 1 && "\u00A0"}
          </span>
          <span className={styles.spacerText}>
            {word}
            {index !== originalWords.length - 1 && "\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}
