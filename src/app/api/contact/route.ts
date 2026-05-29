import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; projectType?: string; message?: string }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim() ?? "";
  const projectType = body.projectType ?? "unspecified";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress =
    process.env.RESEND_FROM ?? `tilde <${site.contactEmail}>`;
  const toAddress = process.env.RESEND_TO ?? site.contactEmail;

  if (!apiKey) {
    // Fail soft in development: log + return success so the UI flow can be tested.
    console.warn(
      "[contact] RESEND_API_KEY not set — would have sent:",
      { name, email, projectType, message }
    );
    return NextResponse.json({ ok: true, dev: true });
  }

  const resend = new Resend(apiKey);
  try {
    const html = `
      <h2>New enquiry from ${escapeHtml(name)}</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
      <p><strong>Message:</strong></p>
      <pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(message)}</pre>
    `;
    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New tilde enquiry — ${name}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] resend error", err);
    return NextResponse.json(
      { error: "Failed to send" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
