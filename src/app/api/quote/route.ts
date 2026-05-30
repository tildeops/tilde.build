import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { escapeHtml } from "@/lib/html";
import { SERVICES_MAP } from "@/lib/pricing/services";
import { formatMoney, toCurrency } from "@/lib/pricing/currency";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as
    | {
        name?: string;
        email?: string;
        service?: string;
        selectedFeatures?: unknown;
        message?: string;
        currency?: string;
      }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const serviceSlug = body.service ?? "";
  const currency = toCurrency(body.currency);
  const message = body.message?.trim() ?? "";
  const selectedFeatures = Array.isArray(body.selectedFeatures)
    ? body.selectedFeatures.filter(
        (f): f is string => typeof f === "string" && f.trim().length > 0,
      )
    : [];

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const service = SERVICES_MAP[serviceSlug];
  if (!service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM ?? `tilde <${site.contactEmail}>`;
  const toAddress = process.env.RESEND_TO ?? site.contactEmail;

  if (!apiKey) {
    // Fail soft in development: log + return success so the UI flow can be tested.
    console.warn("[quote] RESEND_API_KEY not set — would have sent:", {
      name,
      email,
      service: service.name,
      selectedFeatures,
      message,
    });
    return NextResponse.json({ ok: true, dev: true });
  }

  const featuresHtml = selectedFeatures.length
    ? `<ul>${selectedFeatures
        .map((f) => `<li>${escapeHtml(f)}</li>`)
        .join("")}</ul>`
    : "<p><em>No add-on features selected — base scope only.</em></p>";

  const resend = new Resend(apiKey);
  try {
    const html = `
      <h2>Quote request from ${escapeHtml(name)}</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Service:</strong> ${escapeHtml(service.name)}</p>
      <p><strong>Base (${currency}):</strong> ${escapeHtml(service.basePrice ? formatMoney(service.basePrice, currency) : "on call")} (${escapeHtml(service.priceNote)})</p>
      <p><strong>Selected add-on features:</strong></p>
      ${featuresHtml}
      ${
        message
          ? `<p><strong>Message:</strong></p><pre style="font-family:inherit;white-space:pre-wrap">${escapeHtml(message)}</pre>`
          : ""
      }
    `;
    await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `Quote request — ${service.name} — ${name}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[quote] resend error", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
