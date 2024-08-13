"use client";

import html2canvas from "html2canvas";
import { useControls } from "leva";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { useKeyPress } from "~/hooks/useKeyPress";
import { cn } from "~/lib/utils";
import ConsoleBottom from "~/public/console-bottom.svg";
import ConsoleTop from "~/public/console-top.svg";

import styles from "./app.module.scss";
import { PostProcessing } from "./postprocessing";
import { Scene } from "./scene";
import { UIKitScene } from "./uikit-scene";
const Canvas = dynamic(() => import("./canvas").then((mod) => mod.Canvas), {
  ssr: false,
});

type Props = {
  children: React.ReactNode;
};

const colors = [
  {
    name: "stereo",
    color: "212, 254, 0",
  },
  {
    name: "grid",
    color: "255, 255, 255",
  },
  {
    name: "horizon",
    color: "128, 233, 255",
  },
  {
    name: "wave",
    color: "180, 130, 255",
  },
];

export function App({ children }: Props) {
  const [themeIndex, setThemeIndex] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useKeyPress(["c", "C"], () => {
    setThemeIndex((prevIndex) => (prevIndex + 1) % colors.length);
    document.documentElement.style.setProperty("--current-color", colors[themeIndex].color);
  });

  const { method } = useControls({
    method: {
      options: ["original", "uikit", "html2canvas", "getComputedStyle"],
      value: "original",
    },
  });

  const handleOriginal = useCallback(() => {
    contentRef.current!.style.visibility = "visible";
    setTexture(null);
  }, []);

  const handleUikit = useCallback(() => {
    contentRef.current!.style.visibility = "hidden";
    setTexture(null);
  }, []);

  const handleHtml2canvas = useCallback(() => {
    contentRef.current!.style.visibility = "visible";

    html2canvas(contentRef.current!).then((canvas) => {
      const generatedTexture = new THREE.Texture(canvas);
      generatedTexture.needsUpdate = true;
      setTexture(generatedTexture);

      contentRef.current!.style.visibility = "hidden";
    });
  }, []);

  const handleGetComputedStyle = useCallback(() => {
    contentRef.current!.style.visibility = "visible";
    const element = contentRef.current!;
    const dpr = window.devicePixelRatio || 1;
    const scale = Math.max(1, Math.min(2, dpr)); // Limitar la escala entre 1 y 2

    const canvas = document.createElement("canvas");
    canvas.width = element.offsetWidth * scale;
    canvas.height = element.offsetHeight * scale;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.scale(scale, scale); // Escalar el contexto

      // Función para aplicar text-transform
      const applyTextTransform = (text: string, textTransform: string): string => {
        switch (textTransform) {
          case "uppercase":
            return text.toUpperCase();
          case "lowercase":
            return text.toLowerCase();
          case "capitalize":
            return text.replace(/\b\w/g, (l) => l.toUpperCase());
          default:
            return text;
        }
      };

      // Función recursiva para renderizar elementos
      const renderElement = (el: Element | Text, x: number, y: number) => {
        if (el instanceof Element) {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          const relativeX = rect.left - element.getBoundingClientRect().left;
          const relativeY = rect.top - element.getBoundingClientRect().top;

          // Renderizar fondo
          ctx.fillStyle = style.backgroundColor;
          ctx.fillRect(relativeX, relativeY, rect.width, rect.height);

          // Renderizar borde
          if (style.borderWidth !== "0px") {
            ctx.strokeStyle = style.borderColor;
            ctx.lineWidth = parseFloat(style.borderWidth);
            ctx.strokeRect(relativeX, relativeY, rect.width, rect.height);
          }

          // Renderizar texto para elementos inline
          if (el instanceof HTMLElement && el.innerText && style.display.includes("inline")) {
            ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
            ctx.fillStyle = style.color;
            const transformedText = applyTextTransform(el.innerText, style.textTransform);
            ctx.fillText(transformedText, relativeX, relativeY + parseFloat(style.fontSize));
          }

          // Renderizar imágenes
          if (el instanceof HTMLImageElement) {
            ctx.drawImage(el, relativeX, relativeY, rect.width, rect.height);
          }

          // Renderizar hijos recursivamente
          el.childNodes.forEach((child) => {
            renderElement(child as Element | Text, relativeX, relativeY);
          });
        } else if (el instanceof Text && el.textContent?.trim()) {
          // Renderizar nodos de texto
          const parentEl = el.parentElement!;
          const parentStyle = getComputedStyle(parentEl);
          const parentRect = parentEl.getBoundingClientRect();
          const relativeX = parentRect.left - element.getBoundingClientRect().left;
          const relativeY = parentRect.top - element.getBoundingClientRect().top;

          ctx.font = `${parentStyle.fontWeight} ${parentStyle.fontSize} ${parentStyle.fontFamily}`;
          ctx.fillStyle = parentStyle.color;
          const transformedText = applyTextTransform(
            el.textContent.trim(),
            parentStyle.textTransform
          );
          ctx.fillText(transformedText, relativeX, relativeY + parseFloat(parentStyle.fontSize));
        }
      };

      // Iniciar renderizado desde el elemento raíz
      renderElement(element, 0, 0);

      // Crear un nuevo canvas con las dimensiones originales
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = element.offsetWidth;
      finalCanvas.height = element.offsetHeight;
      const finalCtx = finalCanvas.getContext("2d");

      if (finalCtx) {
        // Habilitar antialiasing
        finalCtx.imageSmoothingEnabled = true;
        finalCtx.imageSmoothingQuality = "high";

        // Dibujar el canvas escalado en el canvas final
        finalCtx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          finalCanvas.width,
          finalCanvas.height
        );

        // Crear textura
        const newTexture = new THREE.Texture(finalCanvas);
        newTexture.needsUpdate = true;
        setTexture(newTexture);

        contentRef.current!.style.visibility = "hidden";
      }
    }
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    switch (method) {
      case "original":
        handleOriginal();
        break;
      case "html2canvas":
        handleHtml2canvas();
        break;
      case "getComputedStyle":
        handleGetComputedStyle();
        break;
      case "uikit":
        handleUikit();
        break;
    }
  }, [handleOriginal, handleUikit, handleGetComputedStyle, handleHtml2canvas, method]);

  return (
    <div className={styles.wrapper}>
      <ConsoleTop className="absolute top-0" />
      <div ref={contentRef} className={styles.content}>
        <div className={cn(styles.lineVertical, styles.verticalLeftLine)} />
        <div className={cn(styles.lineHorizontal, styles.headerTopLine)} />
        <Header />
        <div className={cn(styles.lineHorizontal, styles.headerBottomLine)} />
        {children}
        <div className={cn(styles.lineHorizontal, styles.footerTopLine)} />
        <Footer />
        <div className={cn(styles.lineHorizontal, styles.footerBottomLine)} />
        <div className={cn(styles.lineVertical, styles.verticalRightLine)} />
      </div>
      <Canvas>
        {method === "uikit" ? <UIKitScene /> : <Scene texture={texture} />}
        <PostProcessing />
      </Canvas>
      <ConsoleBottom className="absolute bottom-0" />
    </div>
  );
}
