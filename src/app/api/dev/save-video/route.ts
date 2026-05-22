import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

/**
 * Dev-only endpoint used by /dev/record-liquid to write recorded video blobs
 * directly into public/video/. Gated to non-production so it ships nothing
 * dangerous if accidentally deployed.
 */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 403 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const name = String(form.get("name") ?? "");

  if (!(file instanceof Blob) || !name) {
    return NextResponse.json({ error: "Missing file or name" }, { status: 400 });
  }
  if (!/^[a-z0-9._-]+$/i.test(name)) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "public", "video");
  await mkdir(dir, { recursive: true });
  const dest = path.join(dir, name);

  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(dest, bytes);

  return NextResponse.json({ ok: true, path: `/video/${name}`, bytes: bytes.length });
}
