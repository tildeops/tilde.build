"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  density?: number;
  opacity?: number;
  className?: string;
};

const RAMP = "=+*#%@";

export function HeroAsciiOverlay({
  src,
  density = 100,
  opacity = 0.55,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    let destroyed = false;
    let cols = 0;
    let rows = 0;
    let cell = density;
    let sample: Uint8ClampedArray | null = null;
    let baseIdx: Uint8Array | null = null;
    let nextSwapAt: Float64Array | null = null;
    let offsets: Int8Array | null = null;
    let jitter: Float32Array | null = null;
    let rafId: number | null = null;
    let imgRef: HTMLImageElement | null = null;

    const loadImage = () =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    const layout = (img: HTMLImageElement) => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = density;
      cols = Math.floor(rect.width / cell);
      rows = Math.floor(rect.height / cell);
      if (cols <= 0 || rows <= 0) {
        sample = null;
        return;
      }

      canvas.width = cols * cell * dpr;
      canvas.height = rows * cell * dpr;
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.textBaseline = "top";
      ctx.font = `${cell}px var(--font-geist-mono), ui-monospace, monospace`;

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
      sample = offCtx.getImageData(0, 0, cols, rows).data;

      const count = cols * rows;
      baseIdx = new Uint8Array(count);
      for (let i = 0; i < count; i++) {
        const p = i * 4;
        const lum =
          0.2126 * sample[p] + 0.7152 * sample[p + 1] + 0.0722 * sample[p + 2];
        baseIdx[i] = Math.floor((lum / 255) * (RAMP.length - 1));
      }

      const now = performance.now();
      nextSwapAt = new Float64Array(count);
      offsets = new Int8Array(count);
      jitter = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        nextSwapAt[i] = now + 80 + Math.random() * 520;
        offsets[i] = 0;
        jitter[i] = (Math.random() - 0.5) * 0.08;
      }
    };

    const rollOffset = () => {
      const r = Math.random();
      if (r < 0.55) return 0;
      if (r < 0.8) return 1;
      if (r < 0.92) return -1;
      return 2;
    };

    const paint = () => {
      if (!baseIdx || !offsets || !jitter) return;
      const w = cols * cell;
      const h = rows * cell;
      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          let idx = baseIdx[i] + offsets[i];
          if (idx < 0) idx = 0;
          else if (idx > RAMP.length - 1) idx = RAMP.length - 1;
          const ch = RAMP[idx];
          if (ch === " ") continue;
          const a = opacity + jitter[i];
          ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
          ctx.fillText(ch, x * cell, y * cell);
        }
      }
    };

    const tick = () => {
      if (destroyed) return;
      if (nextSwapAt && offsets) {
        const now = performance.now();
        const count = cols * rows;
        // Visit ~15% of cells per frame, starting from a random cursor,
        // so scheduling cost stays bounded on large grids.
        const budget = Math.max(1, Math.floor(count * 0.15));
        let cursor = Math.floor(Math.random() * count);
        for (let k = 0; k < budget; k++) {
          const i = cursor;
          cursor = (cursor + 1) % count;
          if (now >= nextSwapAt[i]) {
            offsets[i] = rollOffset();
            nextSwapAt[i] = now + 80 + Math.random() * 520;
          }
        }
      }
      paint();
      rafId = requestAnimationFrame(tick);
    };

    loadImage()
      .then((img) => {
        if (destroyed) return;
        imgRef = img;
        layout(img);
        paint();
        if (!reducedMotion) rafId = requestAnimationFrame(tick);
      })
      .catch(() => {
        /* leave canvas empty on load failure */
      });

    const ro = new ResizeObserver(() => {
      if (!imgRef) return;
      layout(imgRef);
      paint();
    });
    ro.observe(parent);

    return () => {
      destroyed = true;
      ro.disconnect();
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [src, density, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "absolute inset-0 h-full w-full pointer-events-none",
        className,
      )}
    />
  );
}
