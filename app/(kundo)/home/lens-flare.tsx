"use client";

import { useEffect, useRef } from "react";

// ─── SVG Geometry (adapted to actual viewBox 1222×766) ───
const SVG_W = 1222;
const SVG_H = 766;
const PATH_START_X = 530;
const PATH_END_X = 1174;
const PATH_Y = 4;
const DURATION = 1100;

// ─── Math Helpers ───
function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}
function ss(t: number) {
	return t * t * (3 - 2 * t);
}
function sss(t: number) {
	return t * t * t * (t * (t * 6 - 15) + 10);
}
function clamp01(x: number) {
	return Math.max(0, Math.min(1, x));
}

function edgeFade(t: number) {
	return sss(clamp01(t / 0.14)) * (1 - sss(clamp01((t - 0.8) / 0.2)));
}

function flareEnv(t: number) {
	const up = sss(clamp01(t / 0.6));
	const peak = Math.exp(-Math.pow((t - 0.7) / 0.055, 2));
	const down = 1 - sss(clamp01((t - 0.74) / 0.14));
	return Math.min(1, up * down * 0.5 + peak * 0.75) * edgeFade(t);
}

function boomDetailEnv(t: number) {
	const up = sss(clamp01((t - 0.5) / 0.18));
	const down = 1 - sss(clamp01((t - 0.72) / 0.18));
	return up * down * edgeFade(t);
}

function glowEnv(t: number) {
	return (
		sss(clamp01(t / 0.5)) *
		(1 - sss(clamp01((t - 0.7) / 0.25))) *
		edgeFade(t)
	);
}

function borderEnv(t: number) {
	return (
		sss(clamp01(t / 0.35)) *
		(1 - sss(clamp01((t - 0.65) / 0.3))) *
		edgeFade(t)
	);
}

function motionCurve(t: number) {
	return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function flareRotation(t: number) {
	return clamp01((t - 0.5) / 0.35) * 0.26;
}

function streakSize(t: number) {
	const base = lerp(40, 175, ss(clamp01(t / 0.65)));
	const explode = Math.exp(-Math.pow((t - 0.7) / 0.06, 2)) * 80;
	const shrink = t > 0.76 ? clamp01((t - 0.76) / 0.18) : 0;
	return Math.max(15, (base + explode) * (1 - shrink * 0.8));
}

function streakW(t: number) {
	return (
		lerp(1.2, 2.5, ss(clamp01(t / 0.65))) +
		Math.exp(-Math.pow((t - 0.7) / 0.06, 2)) * 1.5
	);
}

// ─── Seeded Random ───
function seededRand(seed: number) {
	let s = seed;
	return () => {
		s = (s * 16807) % 2147483647;
		return s / 2147483647;
	};
}

type MicroStreak = {
	angle: number;
	len: number;
	width: number;
	opacity: number;
	offset: number;
	delay: number;
};
type BokehCircle = {
	dx: number;
	dy: number;
	radius: number;
	opacity: number;
	ringWidth: number;
	delay: number;
};

function generateMicroStreaks(): MicroStreak[] {
	const result: MicroStreak[] = [];
	const rng = seededRand(42);
	for (let i = 0; i < 28; i++) {
		result.push({
			angle: (i / 28) * Math.PI * 2 + (rng() - 0.5) * 0.2,
			len: lerp(8, 42, rng()),
			width: rng() < 0.5 ? lerp(0.2, 0.6, rng()) : lerp(0.8, 2, rng()),
			opacity: lerp(0.12, 0.45, rng()),
			offset: (rng() - 0.5) * 3,
			delay: rng() * 0.06,
		});
	}
	for (let i = 0; i < 14; i++) {
		result.push({
			angle: rng() * Math.PI * 2,
			len: lerp(4, 18, rng()),
			width: lerp(0.15, 0.5, rng()),
			opacity: lerp(0.08, 0.3, rng()),
			offset: (rng() - 0.5) * 2,
			delay: rng() * 0.08,
		});
	}
	return result;
}

function generateBokehCircles(): BokehCircle[] {
	const result: BokehCircle[] = [];
	const rng = seededRand(99);
	for (let i = 0; i < 4; i++) {
		const angle = rng() * Math.PI * 2;
		const dist = lerp(18, 140, rng());
		result.push({
			dx: Math.cos(angle) * dist,
			dy: Math.sin(angle) * dist,
			radius: lerp(5, 22, rng()),
			opacity: lerp(0.06, 0.2, rng()),
			ringWidth: rng() < 0.5 ? lerp(0.5, 1.5, rng()) : 0,
			delay: rng() * 0.08,
		});
	}
	return result;
}

const MICRO_STREAKS = generateMicroStreaks();
const BOKEH_CIRCLES = generateBokehCircles();

// ─── Component ───
type LensFlareProps = {
	targetRef: React.RefObject<HTMLDivElement | null>;
};

export function LensFlare({ targetRef }: LensFlareProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const target = targetRef.current;
		if (!canvas || !target) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let W = 0;
		let H = 0;
		let scaleX = 1;
		let scaleY = 1;
		let pad = 0;
		let fullW = 0;
		let fullH = 0;

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const targetRect = target!.getBoundingClientRect();
			const offsetParent = canvas!.offsetParent;
			const parentRect = offsetParent
				? offsetParent.getBoundingClientRect()
				: { top: 0, left: 0 };
			W = targetRect.width;
			H = targetRect.height;
			scaleX = W / SVG_W;
			scaleY = H / SVG_H;
			pad = 200 * scaleX;
			fullW = W + 2 * pad;
			fullH = H + 2 * pad;
			canvas!.style.top = targetRect.top - parentRect.top - pad + "px";
			canvas!.style.left = targetRect.left - parentRect.left - pad + "px";
			canvas!.style.width = fullW + "px";
			canvas!.style.height = fullH + "px";
			canvas!.width = fullW * dpr;
			canvas!.height = fullH * dpr;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx!.translate(pad, pad);
		}

		function getP(t: number) {
			const tc = clamp01(t);
			return {
				x: (PATH_START_X + tc * (PATH_END_X - PATH_START_X)) * scaleX,
				y: PATH_Y * scaleY,
			};
		}

		function drawSoftStreak(
			cx: number,
			cy: number,
			angle: number,
			len: number,
			width: number,
			alpha: number,
		) {
			if (alpha < 0.002) return;
			const l = len * scaleX;
			const w = Math.max(0.2, width * scaleY);
			ctx!.save();
			ctx!.translate(cx, cy);
			ctx!.rotate(angle);
			const sg = ctx!.createLinearGradient(-l, 0, l, 0);
			sg.addColorStop(0, "rgba(255,255,255,0)");
			sg.addColorStop(0.15, `rgba(255,255,255,${0.15 * alpha})`);
			sg.addColorStop(0.4, `rgba(255,255,255,${0.7 * alpha})`);
			sg.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
			sg.addColorStop(0.6, `rgba(255,255,255,${0.7 * alpha})`);
			sg.addColorStop(0.85, `rgba(255,255,255,${0.15 * alpha})`);
			sg.addColorStop(1, "rgba(255,255,255,0)");
			ctx!.fillStyle = sg;
			ctx!.beginPath();
			ctx!.ellipse(0, 0, l, w, 0, 0, Math.PI * 2);
			ctx!.fill();
			ctx!.restore();
		}

		function drawBokeh(
			cx: number,
			cy: number,
			dx: number,
			dy: number,
			radius: number,
			opacity: number,
			ringWidth: number,
		) {
			if (opacity < 0.002) return;
			const bx = cx + dx * scaleX;
			const by = cy + dy * scaleY;
			const r = radius * scaleX;
			if (ringWidth > 0) {
				const rw = ringWidth * scaleX;
				const outer = r + rw;
				const inner = Math.max(0, r - rw);
				const g = ctx!.createRadialGradient(bx, by, inner, bx, by, outer);
				g.addColorStop(0, "rgba(255,255,255,0)");
				g.addColorStop(0.3, `rgba(255,255,255,${opacity * 0.3})`);
				g.addColorStop(0.5, `rgba(255,255,255,${opacity})`);
				g.addColorStop(0.7, `rgba(255,255,255,${opacity * 0.3})`);
				g.addColorStop(1, "rgba(255,255,255,0)");
				ctx!.fillStyle = g;
				ctx!.beginPath();
				ctx!.arc(bx, by, outer, 0, Math.PI * 2);
				ctx!.fill();
			} else {
				const g = ctx!.createRadialGradient(bx, by, 0, bx, by, r);
				g.addColorStop(0, `rgba(255,255,255,${opacity * 1.2})`);
				g.addColorStop(0.25, `rgba(255,255,255,${opacity * 0.7})`);
				g.addColorStop(0.6, `rgba(255,255,255,${opacity * 0.2})`);
				g.addColorStop(1, "rgba(255,255,255,0)");
				ctx!.fillStyle = g;
				ctx!.beginPath();
				ctx!.arc(bx, by, r, 0, Math.PI * 2);
				ctx!.fill();
			}
		}

		function render(t: number) {
			ctx!.clearRect(-pad, -pad, fullW, fullH);

			const et = motionCurve(t);
			const p = getP(et);
			const fA = flareEnv(t);
			const gA = glowEnv(t);
			const bA = borderEnv(t);
			const dA = boomDetailEnv(t);
			if (fA < 0.002 && gA < 0.002 && bA < 0.002) return;

			const cx = p.x;
			const cy = p.y;
			const rot = flareRotation(t);
			const sLen = streakSize(t);
			const sW = streakW(t);

			// 1. Veiling glare
			if (gA > 0.002) {
				const vr = 180 * scaleX;
				const vg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, vr);
				vg.addColorStop(0, `rgba(255,255,255,${0.065 * gA})`);
				vg.addColorStop(0.15, `rgba(245,250,255,${0.025 * gA})`);
				vg.addColorStop(1, "rgba(245,250,255,0)");
				ctx!.fillStyle = vg;
				ctx!.fillRect(-pad, -pad, fullW, fullH);
			}

			// 2. Bloom
			if (gA > 0.002) {
				const br = 90 * scaleX;
				const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, br);
				bg.addColorStop(0, `rgba(255,255,255,${0.3 * gA})`);
				bg.addColorStop(0.05, `rgba(250,253,255,${0.18 * gA})`);
				bg.addColorStop(0.18, `rgba(240,248,255,${0.055 * gA})`);
				bg.addColorStop(0.4, `rgba(235,245,255,${0.014 * gA})`);
				bg.addColorStop(1, "rgba(235,245,255,0)");
				ctx!.fillStyle = bg;
				ctx!.fillRect(-pad, -pad, fullW, fullH);
			}

			// 3. Main anamorphic streak
			if (fA > 0.004) {
				drawSoftStreak(cx, cy, rot, sLen, sW * 0.6, 0.6 * fA);
				drawSoftStreak(cx, cy, rot, sLen * 0.85, sW * 2.5, 0.16 * fA);
				drawSoftStreak(cx, cy, rot, sLen * 0.65, sW * 7, 0.04 * fA);
			}

			// 4. Perpendicular streak
			if (fA > 0.01) {
				drawSoftStreak(cx, cy, rot + Math.PI / 2, 30, 0.5, 0.16 * fA);
			}

			// 5. Micro-streaks
			if (dA > 0.005) {
				for (const ms of MICRO_STREAKS) {
					const staggered = clamp01(
						(dA - ms.delay * 2) / (1 - ms.delay * 2),
					);
					const a = ms.opacity * staggered;
					if (a < 0.003) continue;
					drawSoftStreak(
						cx + ms.offset * scaleX,
						cy + ms.offset * scaleY * 0.3,
						rot + ms.angle,
						ms.len,
						ms.width,
						a,
					);
				}
			}

			// 6. Bokeh circles
			if (dA > 0.005) {
				const sizeMult = lerp(0.2, 1.5, Math.pow(dA, 0.6));
				for (const bk of BOKEH_CIRCLES) {
					const staggered = clamp01(
						(dA - bk.delay * 2) / (1 - bk.delay * 2),
					);
					const a = bk.opacity * staggered;
					const r = bk.radius * sizeMult;
					const ring = bk.ringWidth > 0 ? bk.ringWidth * sizeMult : 0;
					drawBokeh(cx, cy, bk.dx, bk.dy, r, a, ring);
				}
			}

			// 7. Ghost rings
			if (fA > 0.01) {
				const perpAng = rot + Math.PI / 2;
				const ghosts = [
					{ d: 38, r: 13, o: 0.028, fill: false },
					{ d: 68, r: 8, o: 0.02, fill: false },
					{ d: 105, r: 22, o: 0.012, fill: true },
					{ d: -28, r: 6, o: 0.025, fill: false },
					{ d: -58, r: 11, o: 0.015, fill: false },
					{ d: 145, r: 5, o: 0.016, fill: false },
				];
				for (const g of ghosts) {
					const gx = cx + Math.cos(perpAng) * g.d * scaleX;
					const gy = cy + Math.sin(perpAng) * g.d * scaleY;
					const a = g.o * fA;
					if (a < 0.002) continue;
					const gr = g.r * scaleX;
					if (g.fill) {
						const gg = ctx!.createRadialGradient(
							gx,
							gy,
							gr * 0.6,
							gx,
							gy,
							gr,
						);
						gg.addColorStop(0, "rgba(255,255,255,0)");
						gg.addColorStop(0.5, `rgba(255,255,255,${a * 0.4})`);
						gg.addColorStop(0.8, `rgba(255,255,255,${a})`);
						gg.addColorStop(1, "rgba(255,255,255,0)");
						ctx!.fillStyle = gg;
						ctx!.beginPath();
						ctx!.arc(gx, gy, gr, 0, Math.PI * 2);
						ctx!.fill();
					} else {
						ctx!.beginPath();
						ctx!.arc(gx, gy, gr, 0, Math.PI * 2);
						ctx!.strokeStyle = `rgba(255,255,255,${a})`;
						ctx!.lineWidth = 0.6;
						ctx!.stroke();
					}
				}
			}

			// 8. Specular core
			if (fA > 0.005) {
				ctx!.save();
				ctx!.translate(cx, cy);
				ctx!.rotate(rot);
				ctx!.scale(3, 1);
				const sp = ctx!.createRadialGradient(
					0,
					0,
					0,
					0,
					0,
					11 * scaleX,
				);
				sp.addColorStop(0, `rgba(255,255,255,${0.9 * fA})`);
				sp.addColorStop(0.07, `rgba(252,254,255,${0.55 * fA})`);
				sp.addColorStop(0.22, `rgba(245,250,255,${0.15 * fA})`);
				sp.addColorStop(1, "rgba(245,250,255,0)");
				ctx!.fillStyle = sp;
				ctx!.beginPath();
				ctx!.arc(0, 0, 11 * scaleX, 0, Math.PI * 2);
				ctx!.fill();
				ctx!.restore();

				ctx!.save();
				ctx!.translate(cx, cy);
				ctx!.rotate(rot);
				ctx!.scale(1.5, 1);
				const cpg = ctx!.createRadialGradient(
					0,
					0,
					0,
					0,
					0,
					3.5 * scaleX,
				);
				cpg.addColorStop(
					0,
					`rgba(255,255,255,${Math.min(1, 1.15 * fA)})`,
				);
				cpg.addColorStop(0.2, `rgba(255,255,255,${0.7 * fA})`);
				cpg.addColorStop(1, "rgba(255,255,255,0)");
				ctx!.fillStyle = cpg;
				ctx!.beginPath();
				ctx!.arc(0, 0, 3.5 * scaleX, 0, Math.PI * 2);
				ctx!.fill();
				ctx!.restore();
			}

			// 9. Border illumination
			if (bA > 0.003) {
				ctx!.save();
				ctx!.globalCompositeOperation = "lighter";
				const illumN = 90;
				const illumR = 0.14;
				for (let i = -illumN; i <= illumN; i++) {
					const st = et + (i / illumN) * illumR;
					if (st < 0 || st > 1) continue;
					const sp = getP(st);
					const dist = Math.abs(i / illumN);
					const ia = Math.exp(-dist * dist * 12) * bA * 0.6;
					if (ia < 0.003) continue;
					ctx!.beginPath();
					ctx!.arc(sp.x, sp.y, 0.6 * scaleX, 0, Math.PI * 2);
					ctx!.fillStyle = `rgba(255,255,255,${ia})`;
					ctx!.fill();
					if (ia > 0.03) {
						const ig = ctx!.createRadialGradient(
							sp.x,
							sp.y,
							0,
							sp.x,
							sp.y,
							5 * scaleX,
						);
						ig.addColorStop(0, `rgba(255,255,255,${ia * 0.3})`);
						ig.addColorStop(1, "rgba(255,255,255,0)");
						ctx!.fillStyle = ig;
						ctx!.fillRect(
							sp.x - 5 * scaleX,
							sp.y - 5 * scaleY,
							10 * scaleX,
							10 * scaleY,
						);
					}
				}
				ctx!.restore();
			}

			// 10. Trailing glow
			if (gA > 0.003) {
				for (let i = 1; i <= 14; i++) {
					const tt = t - i * 0.004;
					if (tt < 0) continue;
					const tp = getP(motionCurve(tt));
					const ta = glowEnv(tt) * Math.exp(-i * 0.3) * 0.5;
					if (ta < 0.002) continue;
					const tg = ctx!.createRadialGradient(
						tp.x,
						tp.y,
						0,
						tp.x,
						tp.y,
						(7 + i * 2) * scaleX,
					);
					tg.addColorStop(0, `rgba(255,255,255,${0.055 * ta})`);
					tg.addColorStop(0.35, `rgba(255,255,255,${0.014 * ta})`);
					tg.addColorStop(1, "rgba(255,255,255,0)");
					ctx!.fillStyle = tg;
					ctx!.fillRect(-pad, -pad, fullW, fullH);
				}
			}

			// 11. Starburst
			if (fA > 0.35) {
				const sa = ((fA - 0.35) / 0.65) * 0.2;
				ctx!.save();
				ctx!.translate(cx, cy);
				ctx!.globalAlpha = sa;
				for (let r = 0; r < 6; r++) {
					const ra = (r / 6) * Math.PI + rot;
					const sl = (r % 2 === 0 ? 24 : 14) * scaleX;
					const slg = ctx!.createLinearGradient(
						-Math.cos(ra) * sl,
						-Math.sin(ra) * sl,
						Math.cos(ra) * sl,
						Math.sin(ra) * sl,
					);
					slg.addColorStop(0, "rgba(255,255,255,0)");
					slg.addColorStop(0.43, "rgba(255,255,255,0.5)");
					slg.addColorStop(0.5, "rgba(255,255,255,1)");
					slg.addColorStop(0.57, "rgba(255,255,255,0.5)");
					slg.addColorStop(1, "rgba(255,255,255,0)");
					ctx!.strokeStyle = slg;
					ctx!.lineWidth = 0.4;
					ctx!.beginPath();
					ctx!.moveTo(-Math.cos(ra) * sl, -Math.sin(ra) * sl);
					ctx!.lineTo(Math.cos(ra) * sl, Math.sin(ra) * sl);
					ctx!.stroke();
				}
				ctx!.restore();
			}
		}

		let raf: number;
		let startTs: number | null = null;

		function tick(ts: number) {
			if (!startTs) startTs = ts;
			const elapsed = ts - startTs;
			const progress = clamp01(elapsed / DURATION);
			render(progress);
			if (progress < 1) {
				raf = requestAnimationFrame(tick);
			}
		}

		const observer = new ResizeObserver(() => resize());
		observer.observe(target);
		resize();
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			observer.disconnect();
		};
	}, [targetRef]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className="pointer-events-none absolute hidden sm:block"
			style={{ mixBlendMode: "screen", zIndex: 50 }}
		/>
	);
}
