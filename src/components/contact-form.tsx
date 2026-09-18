"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/lib/schemas";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-lg border hairline bg-bg px-4 py-3 text-base outline-none transition-colors placeholder:text-faint focus:border-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      projectType: String(fd.get("projectType") ?? ""),
      message: String(fd.get("message") ?? "").trim(),
      company: String(fd.get("company") ?? ""),
    };
    // Lightweight client checks; the API re-validates with Zod.
    const next: Record<string, string> = {};
    if (data.name.length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Please enter a valid email address";
    if (!data.projectType) next.projectType = "Choose the closest option";
    if (data.message.length < 20) next.message = "A couple of sentences helps me reply usefully";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setServerError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Could not send");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Could not send");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border hairline bg-bg-2 p-8" role="status">
        <p className="eyebrow !text-ok">Message sent</p>
        <h3 className="mt-3 text-2xl">Thanks. I read every message myself.</h3>
        <p className="mt-3 text-muted">
          You will hear back within one business day. If it is urgent, the Upwork profile link on this page is the fastest route.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl border hairline bg-bg-2 p-6 sm:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow block mb-2">Name</label>
          <input id="name" name="name" autoComplete="name" className={field} placeholder="Your name" />
          {errors.name && <p className="mt-1.5 text-xs text-[#ff8a80]">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="eyebrow block mb-2">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@company.com" />
          {errors.email && <p className="mt-1.5 text-xs text-[#ff8a80]">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="eyebrow block mb-2">What is it?</label>
        <select id="projectType" name="projectType" defaultValue="" className={field}>
          <option value="" disabled>Choose the closest option</option>
          {projectTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
        {errors.projectType && <p className="mt-1.5 text-xs text-[#ff8a80]">{errors.projectType}</p>}
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block mb-2">Tell me about it</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${field} resize-y`}
          placeholder="What it is, where it stands today, and when you need it."
        />
        {errors.message && <p className="mt-1.5 text-xs text-[#ff8a80]">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {serverError && <p className="text-sm text-[#ff8a80]">{serverError}</p>}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs text-faint">No newsletter, no automation. Your message goes straight to me.</p>
    </form>
  );
}
