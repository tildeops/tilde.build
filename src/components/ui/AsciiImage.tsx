"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Cell size in px. Smaller = denser. */
  density?: number;
  /** Enable cursor-reactive brightness. */
  interactive?: boolean;
  /** Hex or rgb color for the radial glow behind the image. */
  glowColor?: string;
  className?: string;
  /** Blur in px applied to the underlying image. */
  blur?: number;
};

// Luminance ramp (light → dark). Picked to read well on black.
const RAMP = " .·:-=+*#%@";

export function AsciiImage({
  src,
  alt,
  density = 7,
  interactive = true,
  glowColor = "#0b2a6b",
  className,
  blur = 18,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const sampleRef = useRef<Uint8ClampedArray | null>(null);
  const cellsRef = useRef<{ cols: number; rows: number; cell: number }>({
    cols: 0,
    rows: 0,
    cell: density,
  });
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Offscreen canvas for sampling the image
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    let destroyed = false;

    const loadImage = () =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    const layout = (img: HTMLImageElement) => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cell = density;
      const cols = Math.floor(rect.width / cell);
      const rows = Math.floor(rect.height / cell);
      if (cols <= 0 || rows <= 0) {
        cellsRef.current = { cols: 0, rows: 0, cell };
        sampleRef.current = null;
        return;
      }
      cellsRef.current = { cols, rows, cell };

      canvas.width = cols * cell * dpr;
      canvas.height = rows * cell * dpr;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      ctx.scale(dpr, dpr);
      ctx.textBaseline = "top";
      ctx.font = `${cell}px ui-monospace, monospace`;

      // Sample the image at cols × rows using a cover fit
      off.width = cols;
      off.height = rows;
      const imgAspect = img.width / img.height;
      const boxAspect = cols / rows;
      let sw = img.width;
      let sh = img.height;
      let sx = 0;
      let sy = 0;
      if (imgAspect > boxAspect) {
        sw = img.height * boxAspect;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / boxAspect;
        sy = (img.height - sh) / 2;
      }
      offCtx.clearRect(0, 0, cols, rows);
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      sampleRef.current = offCtx.getImageData(0, 0, cols, rows).data;
    };

    const draw = () => {
      if (destroyed) return;
      const data = sampleRef.current;
      const { cols, rows, cell } = cellsRef.current;
      if (!data) return;

      const w = cols * cell;
      const h = rows * cell;
      ctx.clearRect(0, 0, w, h);

      const { x: mx, y: my, active } = mouseRef.current;
      const radius = 180;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          let idx = Math.floor((lum / 255) * (RAMP.length - 1));

          const px = x * cell + cell / 2;
          const py = y * cell + cell / 2;

          let alpha = 0.55;
          let tint = "255, 255, 255";

          if (interactive && active) {
            const dx = px - mx;
            const dy = py - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < radius) {
              const t = 1 - dist / radius;
              alpha = 0.55 + t * 0.4;
              idx = Math.min(RAMP.length - 1, idx + Math.floor(t * 3));
              tint = "186, 214, 255";
            }
          }

          const ch = RAMP[idx];
          if (ch === " ") continue;
          ctx.fillStyle = `rgba(${tint}, ${alpha})`;
          ctx.fillText(ch, x * cell, y * cell);
        }
      }
    };

    const scheduleDraw = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        draw();
      });
    };

    let img: HTMLImageElement;
    loadImage()
      .then((loaded) => {
        if (destroyed) return;
        img = loaded;
        imgRef.current = img;
        layout(img);
        draw();
      })
      .catch(() => {
        /* image failed to load — leave canvas empty; the blurred <img> still shows */
      });

    const ro = new ResizeObserver(() => {
      if (imgRef.current) {
        layout(imgRef.current);
        draw();
      }
    });
    ro.observe(wrap);

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
      if (!reducedMotionRef.current) scheduleDraw();
    };

    const onLeave = () => {
      mouseRef.current.active = false;
      scheduleDraw();
    };

    if (interactive) {
      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
    }

    return () => {
      destroyed = true;
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [src, density, interactive]);

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative isolate overflow-hidden rounded-2xl noise",
        className
      )}
    >
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(60% 60% at 50% 55%, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      {/* Blurred base image */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: `blur(${blur}px) saturate(0.9)` }}
        loading="lazy"
        decoding="async"
        aria-hidden
      />
      {/* Linear gradient, black → transparent from left */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,6,10,0.92) 0%, rgba(5,6,10,0.55) 40%, rgba(5,6,10,0) 75%)",
        }}
      />
      {/* ASCII canvas */}
      <canvas ref={canvasRef} className="relative h-full w-full" />
    </div>
  );
}
