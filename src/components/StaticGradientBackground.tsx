"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Same shader as the hero's AnimatedBackground — rendered once with a fixed
// u_time so the gradient is a true static "frame" of the hero gradient.
const fragmentShader = /* glsl */ `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

const vec3 c0 = vec3(0.024, 0.024, 0.078); // #060614 deep ink
const vec3 c1 = vec3(0.078, 0.063, 0.275); // #141046 night royal
const vec3 c2 = vec3(0.224, 0.106, 0.510); // #391b82 violet
const vec3 c3 = vec3(0.376, 0.110, 0.400); // #601c66 burgundy-purple
const vec3 c4 = vec3(0.620, 0.196, 0.604); // #9e329a mauve crest

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
  if(seg < 1.0) return mix(c0, c1, seg);
  if(seg < 2.0) return mix(c1, c2, seg - 1.0);
  if(seg < 3.0) return mix(c2, c3, seg - 2.0);
  return mix(c3, c4, seg - 3.0);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
  float t = u_time;

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

  float crest = smoothstep(0.58, 0.95, f);
  col += crest * mix(vec3(0.10, 0.04, 0.18), vec3(0.20, 0.06, 0.22), 0.5 + 0.5 * sin(t * 0.6));

  float trough = 1.0 - smoothstep(0.0, 0.50, f);
  col = mix(col, c0 * 0.5, trough * 0.55);

  float vig = smoothstep(1.15, 0.25, length(uv));
  col *= mix(0.55, 1.0, vig);

  col = pow(col, vec3(1.08));

  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = /* glsl */ `
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

export default function StaticGradientBackground({
  seed = 7.4,
}: {
  // Different seeds yield different "snapshots" of the same shader. Tuned to
  // produce a composition with the mauve crest off to one side.
  seed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      u_time: { value: seed },
      u_resolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const render = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h, false);
      const dpr = renderer.getPixelRatio();
      uniforms.u_resolution.value.set(w * dpr, h * dpr);
      renderer.render(scene, camera);
    };
    render();

    // Re-render only when the container resizes — the gradient stays static
    // otherwise (no animation loop).
    const ro = new ResizeObserver(render);
    ro.observe(container);

    return () => {
      ro.disconnect();
      mesh.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [seed]);

  return <div ref={containerRef} className="absolute inset-0" />;
}
