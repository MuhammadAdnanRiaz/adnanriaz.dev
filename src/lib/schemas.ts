import { z } from "zod/v4";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid email address"),
  projectType: z.string().min(1, "Choose the closest option"),
  message: z
    .string()
    .trim()
    .min(20, "A couple of sentences helps me reply usefully")
    .max(5000),
  company: z.string().max(0).optional(), // honeypot
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const projectTypes = [
  { value: "web", label: "Web app or dashboard" },
  { value: "api", label: "API, backend or integration" },
  { value: "mobile", label: "Mobile app (React Native)" },
  { value: "takeover", label: "Take over an existing codebase" },
  { value: "other", label: "Something else" },
] as const;
