import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, projectTypes } from "@/lib/schemas";

export const runtime = "nodejs";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Please check the form and try again" }, { status: 400 });
  }

  const { name, email, projectType, message, company } = result.data;
  // Honeypot filled in: pretend success, send nothing.
  if (company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "Contact form is not configured" }, { status: 503 });
  }

  const typeLabel = projectTypes.find((t) => t.value === projectType)?.label ?? projectType;

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio <hello@adnanriaz.dev>",
      to,
      replyTo: email,
      subject: `New inquiry: ${typeLabel} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${typeLabel}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escape(name)}<br/><strong>Email:</strong> ${escape(email)}<br/><strong>Type:</strong> ${escape(typeLabel)}</p><hr/><p>${escape(message).replace(/\n/g, "<br/>")}</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not send right now" }, { status: 500 });
  }
}
