"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);
  const sentRef = useRef<HTMLDivElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to send");
      }
      setStatus("sent");
      // Lead conversion — no PII (only the project-type bucket).
      trackEvent("generate_lead", {
        form_type: "contact",
        project_type: payload.projectType || "unspecified",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }

  useGSAP(
    () => {
      if (error && errorRef.current) {
        gsap.fromTo(
          errorRef.current,
          { x: -6 },
          {
            x: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.4)",
          }
        );
      }
    },
    { dependencies: [error] }
  );

  useGSAP(
    () => {
      if (status === "sent" && sentRef.current) {
        const root = sentRef.current;
        const icon = root.querySelector("[data-sent-icon]");
        const heading = root.querySelector("[data-sent-heading]");
        const body = root.querySelector("[data-sent-body]");
        gsap.set(root, { opacity: 0, y: 40, scale: 0.96 });
        gsap.set([icon, heading, body], { opacity: 0, y: 14 });
        const tl = gsap.timeline({ defaults: { ease: "editorial" } });
        tl.to(root, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
        })
          .to(icon, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
          .to(heading, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .to(body, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      }
    },
    { dependencies: [status] }
  );

  if (status === "sent") {
    return (
      <div
        ref={sentRef}
        className="rounded-2xl border border-accent bg-accent-soft/40 p-8 text-center"
      >
        <div
          data-sent-icon
          className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-on-accent"
        >
          <Check className="size-5" />
        </div>
        <h3 data-sent-heading className="mt-5 font-display text-2xl">
          Got it.
        </h3>
        <p data-sent-body className="mt-2 text-sm text-ink-muted">
          We&apos;ll get back to you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <SelectField
        label="What are you looking to build?"
        name="projectType"
        options={[
          { v: "shopify-headless", l: "Headless Shopify rebuild" },
          { v: "custom-ecom", l: "Custom e-commerce" },
          { v: "whatsapp", l: "WhatsApp sales channel" },
          { v: "ads", l: "Meta Ads setup" },
          { v: "other", l: "Something else" },
        ]}
      />
      <Field label="Tell us about your project" name="message" textarea />

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={status === "sending"}
        className="w-full"
      >
        <span className="relative inline-flex items-center gap-2">
          {status === "sending" ? (
            <>
              <SendingDots /> Sending
            </>
          ) : (
            <>
              Send message <ArrowUpRight />
            </>
          )}
        </span>
      </Button>

      {error && (
        <p
          ref={errorRef}
          className="text-sm text-accent"
        >
          {error}
        </p>
      )}
    </form>
  );
}

function SendingDots() {
  return (
    <span
      aria-hidden
      className="inline-flex items-center gap-0.5"
      style={{ width: 22 }}
    >
      <span className="size-1 rounded-full bg-current animate-pulse [animation-duration:1s]" />
      <span className="size-1 rounded-full bg-current animate-pulse [animation-delay:0.15s] [animation-duration:1s]" />
      <span className="size-1 rounded-full bg-current animate-pulse [animation-delay:0.3s] [animation-duration:1s]" />
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label className="group relative block">
      <span
        className={cn(
          "pointer-events-none absolute left-4 z-10 origin-left font-mono uppercase tracking-[0.18em] text-ink-muted transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          textarea ? "top-3.5" : "top-1/2 -translate-y-1/2",
          "text-[13px]",
          // Float on focus / when filled
          "group-focus-within:top-2 group-focus-within:translate-y-0 group-focus-within:text-[10px] group-focus-within:text-accent",
          textarea ? "" : "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px]"
        )}
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          placeholder=" "
          className="peer block w-full rounded-xl border border-rule bg-bg px-4 pt-7 pb-3 text-base text-ink placeholder:text-transparent transition-colors duration-300 focus:border-accent focus:outline-none focus:shadow-[0_0_0_4px_rgb(var(--accent-rgb)/0.08)]"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder=" "
          className="peer block w-full rounded-xl border border-rule bg-bg px-4 pt-7 pb-3 text-base text-ink placeholder:text-transparent transition-colors duration-300 focus:border-accent focus:outline-none focus:shadow-[0_0_0_4px_rgb(var(--accent-rgb)/0.08)]"
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { v: string; l: string }[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </span>
      <select
        name={name}
        className="mt-2 w-full rounded-xl border border-rule bg-bg px-4 py-3 text-base text-ink transition-colors duration-300 focus:border-accent focus:outline-none focus:shadow-[0_0_0_4px_rgb(var(--accent-rgb)/0.08)]"
        defaultValue=""
      >
        <option value="" disabled>
          Pick one…
        </option>
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {o.l}
          </option>
        ))}
      </select>
    </label>
  );
}
