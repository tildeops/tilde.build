"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { activeTheme, themes, type Theme } from "@/lib/theme";

const fragmentShader = /* glsl */ `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;

uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;
uniform vec3 u_crestLow;
uniform vec3 u_crestHigh;
uniform vec3 u_trough;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.86, -0.50, 0.50, 0.86);
  for(int i = 0; i < 6; i++){
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

vec3 palette(float t){
  t = clamp(t, 0.0, 1.0);
  float seg = t * 4.0;
  if(seg < 1.0) return mix(u_c0, u_c1, seg);
  if(seg < 2.0) return mix(u_c1, u_c2, seg - 1.0);
  if(seg < 3.0) return mix(u_c2, u_c3, seg - 2.0);
  return mix(u_c3, u_c4, seg - 3.0);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time * u_speed;

  vec2 q = vec2(
    fbm(uv * 1.6 + vec2(0.0, t * 0.6)),
    fbm(uv * 1.6 + vec2(5.2, -t * 0.5))
  );
  vec2 r = vec2(
    fbm(uv * 2.2 + 4.0 * q + vec2(1.7 + t * 0.3, 9.2)),
    fbm(uv * 2.2 + 4.0 * q + vec2(8.3 - t * 0.2, 2.8))
  );
  float f = fbm(uv * 2.6 + 4.0 * r);

  float hue = fract(f * 1.10 + t * 0.16);
  vec3 col = palette(hue);

  // Specular crests
  float crest = smoothstep(0.58, 0.95, f);
  col += crest * mix(u_crestLow, u_crestHigh, 0.5 + 0.5 * sin(t * 0.6));

  // Troughs sink toward the theme's trough color
  float trough = 1.0 - smoothstep(0.0, 0.50, f);
  col = mix(col, u_trough, trough * 0.55);

  // Gentle vignette so corners stay rich
  float vig = smoothstep(1.20, 0.30, length(uv));
  col *= mix(0.60, 1.0, vig);

  // Subtle gamma for depth
  col = pow(col, vec3(1.08));

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = /* glsl */ `
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

const v3 = (rgb: readonly [number, number, number]) =>
  new THREE.Vector3(rgb[0], rgb[1], rgb[2]);

export default function LiquidCanvas({
  animated = true,
  seed = 7.4,
  speed = 0.06,
  className,
  themeOverride,
  recordingMode = false,
  pixelRatio,
  onCanvasReady,
}: {
  animated?: boolean;
  seed?: number;
  speed?: number;
  className?: string;
  /** Override the global active theme for this instance (used by the recorder). */
  themeOverride?: Theme;
  /**
   * Enable `preserveDrawingBuffer` and skip the DPR cap so `canvas.captureStream()`
   * always sees a fresh frame at the canvas's native resolution.
   */
  recordingMode?: boolean;
  /** Explicit pixel ratio (recording uses 1 for deterministic output). */
  pixelRatio?: number;
  /** Receives the underlying WebGL canvas once it's mounted (used by the recorder). */
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shouldAnimate = animated && !reduced;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        // Fullscreen quad has no geometry edges; multi-sampling here is pure overhead.
        antialias: false,
        alpha: false,
        // We never write or test depth/stencil — skip the framebuffer allocations.
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: recordingMode,
      });
    } catch {
      return;
    }
    // Render at 1 device pixel per CSS pixel. For slow FBM noise the browser's
    // bilinear upscale to native DPR is visually indistinguishable from running
    // the shader at 2x, but costs 4x fewer fragment invocations.
    renderer.setPixelRatio(pixelRatio ?? 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const palette = themeOverride
      ? themes[themeOverride]
      : activeTheme;
    const [c0, c1, c2, c3, c4] = palette.liquidPalette;

    const uniforms = {
      u_time: { value: shouldAnimate ? 0 : seed },
      u_speed: { value: speed },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_c0: { value: v3(c0) },
      u_c1: { value: v3(c1) },
      u_c2: { value: v3(c2) },
      u_c3: { value: v3(c3) },
      u_c4: { value: v3(c4) },
      u_crestLow: { value: v3(palette.liquidCrest.low) },
      u_crestHigh: { value: v3(palette.liquidCrest.high) },
      u_trough: { value: v3(palette.liquidTrough) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    container.appendChild(renderer.domElement);
    const style = renderer.domElement.style;
    style.position = "absolute";
    style.inset = "0";
    style.width = "100%";
    style.height = "100%";
    style.display = "block";
    // Promote the canvas to its own compositor layer so the browser doesn't
    // re-composite the entire page on each shader paint during scroll.
    style.willChange = "transform";
    onCanvasReady?.(renderer.domElement);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      const dpr = renderer.getPixelRatio();
      uniforms.u_resolution.value.set(w * dpr, h * dpr);
      renderer.render(scene, camera);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf = 0;
    let visible = true;
    let onScreen = true;
    const start = performance.now();
    // Cap at 30 fps — for a slow painterly noise (u_speed=0.06) the human eye
    // can't distinguish 30 from 60. Half the GPU dispatches.
    const FRAME_MS = 1000 / 30;
    let lastRender = 0;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || !onScreen) return;
      if (now - lastRender < FRAME_MS) return;
      lastRender = now;
      uniforms.u_time.value = (now - start) / 1000;
      renderer.render(scene, camera);
    };

    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    // Pause the render loop when this section is fully off-screen.
    // rootMargin gives a 100px lead so the canvas wakes a beat before entering view.
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0, rootMargin: "100px" }
    );
    io.observe(container);

    if (shouldAnimate) {
      raf = requestAnimationFrame(tick);
    } else {
      renderer.render(scene, camera);
    }

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      material.dispose();
      mesh.geometry.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
    // recordingMode, themeOverride, pixelRatio, onCanvasReady are read on mount;
    // re-running the effect on changes would re-create the canvas which is fine.
  }, [animated, seed, speed, recordingMode, themeOverride, pixelRatio, onCanvasReady]);

  return <div ref={containerRef} className={className} aria-hidden />;
}
