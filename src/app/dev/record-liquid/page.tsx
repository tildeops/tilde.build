"use client";

import { useCallback, useRef, useState } from "react";
import LiquidCanvas from "@/components/effects/liquid-canvas";
import type { Theme } from "@/lib/theme";

const RECORD_SECONDS = 50;
const RECORD_FPS = 60;
const BITRATE = 10_000_000; // 10 Mbps — raw, will be re-encoded by ffmpeg

type Status = "idle" | "recording" | "saving" | "saved" | "error";

export default function RecordLiquidPage() {
  const [theme, setTheme] = useState<Theme>("purple");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [savedPath, setSavedPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onCanvasReady = useCallback((c: HTMLCanvasElement) => {
    canvasRef.current = c;
  }, []);

  const record = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setError("Canvas not ready");
      setStatus("error");
      return;
    }
    setStatus("recording");
    setError(null);
    setSavedPath(null);
    setProgress(0);

    // Prefer VP9; fall back to VP8 if unavailable
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : MediaRecorder.isTypeSupported("video/webm;codecs=vp8")
        ? "video/webm;codecs=vp8"
        : "video/webm";

    const stream = canvas.captureStream(RECORD_FPS);
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream, {
      mimeType: mime,
      videoBitsPerSecond: BITRATE,
    });
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    const stopped = new Promise<void>((resolve) => {
      rec.onstop = () => resolve();
    });

    rec.start(1000);
    const startedAt = performance.now();
    const tick = () => {
      const elapsed = (performance.now() - startedAt) / 1000;
      setProgress(Math.min(1, elapsed / RECORD_SECONDS));
      if (elapsed >= RECORD_SECONDS) {
        rec.stop();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    await stopped;
    stream.getTracks().forEach((t) => t.stop());

    const blob = new Blob(chunks, { type: mime });
    setStatus("saving");

    try {
      const fd = new FormData();
      fd.append("file", blob, `liquid-${theme}-raw.webm`);
      fd.append("name", `liquid-${theme}-raw.webm`);
      const res = await fetch("/api/dev/save-video", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSavedPath(data.path);
      setStatus("saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setStatus("error");
    }
  }, [theme]);

  const downloadLocal = useCallback(async () => {
    // Backup path: trigger a regular browser download if the API save fails
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9"
      : "video/webm";
    const stream = canvas.captureStream(RECORD_FPS);
    const chunks: Blob[] = [];
    const rec = new MediaRecorder(stream, {
      mimeType: mime,
      videoBitsPerSecond: BITRATE,
    });
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    rec.start(1000);
    setStatus("recording");
    setProgress(0);
    const startedAt = performance.now();
    await new Promise<void>((resolve) => {
      const tick = () => {
        const elapsed = (performance.now() - startedAt) / 1000;
        setProgress(Math.min(1, elapsed / RECORD_SECONDS));
        if (elapsed >= RECORD_SECONDS) {
          rec.onstop = () => resolve();
          rec.stop();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    stream.getTracks().forEach((t) => t.stop());
    const blob = new Blob(chunks, { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `liquid-${theme}-raw.webm`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("saved");
  }, [theme]);

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 18, marginBottom: 12 }}>
        Liquid recorder
      </h1>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <label>
          Theme&nbsp;
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            disabled={status === "recording" || status === "saving"}
            style={{ padding: 6, background: "#111", color: "#fff", border: "1px solid #333" }}
          >
            <option value="purple">purple</option>
            <option value="red">red</option>
          </select>
        </label>

        <button
          type="button"
          onClick={record}
          disabled={status === "recording" || status === "saving"}
          style={{
            padding: "8px 14px",
            background: "#3a1480",
            color: "#fff",
            border: 0,
            borderRadius: 6,
            cursor: status === "idle" || status === "saved" || status === "error" ? "pointer" : "not-allowed",
          }}
        >
          Record {RECORD_SECONDS}s → save to public/video/
        </button>

        <button
          type="button"
          onClick={downloadLocal}
          disabled={status === "recording" || status === "saving"}
          style={{
            padding: "8px 14px",
            background: "#222",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: 6,
          }}
        >
          Alt: record &amp; download locally
        </button>

        <span style={{ fontSize: 13, color: "#aaa" }}>
          Status: {status}
          {status === "recording" && ` · ${Math.round(progress * 100)}%`}
          {savedPath && ` · saved to ${savedPath}`}
          {error && ` · error: ${error}`}
        </span>
      </div>

      <p style={{ fontSize: 13, color: "#999", marginBottom: 16, maxWidth: 700 }}>
        Renders the shader at exactly 1920×1080 with DPR 1 so the captured stream
        is deterministic and small. Records for {RECORD_SECONDS}s at {RECORD_FPS}fps,
        VP9 WebM ~{BITRATE / 1_000_000} Mbps. Output is written to
        <code style={{ margin: "0 4px" }}>public/video/liquid-&lt;theme&gt;-raw.webm</code>,
        then encoded into final assets with the ffmpeg commands listed in the plan.
      </p>

      <div
        style={{
          width: 1920,
          height: 1080,
          position: "relative",
          // Scale the preview down to fit the page; the canvas internally
          // still renders at 1920×1080 because the container is 1920×1080.
          transform: "scale(0.5)",
          transformOrigin: "top left",
          marginBottom: -540,
        }}
      >
        <LiquidCanvas
          animated
          themeOverride={theme}
          recordingMode
          pixelRatio={1}
          onCanvasReady={onCanvasReady}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
}
