export const siteConfig = {
  name: "Adnan",
  brand: "ADNAN.DEV",
  title: "Adnan | Full-Stack Web & Mobile Developer",
  description:
    "Hi, I'm Adnan — I build high-performance web and mobile applications that drive growth. Specializing in React, Next.js, Flutter, and Node.js.",
  url: "https://adnanriaz.dev",
  email: "hello@adnanriaz.dev",
  location: "Global / Remote",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~01671c7ab4a7952104" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammadadnanriaz/" },
  { label: "Github", href: "https://github.com/MuhammadAdnanRiaz/" },
] as const;

export const skills = [
  "REACT",
  "NEXT.JS",
  "FLUTTER",
  "TAILWIND CSS",
  "TYPESCRIPT",
  "NODE.JS",
  "GRAPHQL",
  "POSTGRESQL",
] as const;

export const services = [
  {
    icon: "Globe" as const,
    title: "Web Development",
    description:
      "Specializing in high-performance React and Next.js ecosystems. I build SEO-optimized, fast-loading platforms that turn visitors into loyal users.",
    features: [
      "SPA & SSR Architectures",
      "Headless CMS Integration",
      "API Design & Optimization",
    ],
    accent: "primary" as const,
  },
  {
    icon: "Smartphone" as const,
    title: "Mobile App Development",
    description:
      "Native-feel experiences using Flutter and React Native. Focused on fluid animations, offline capabilities, and cross-platform consistency.",
    features: [
      "iOS & Android Deployment",
      "Real-time Data Syncing",
      "Push Notification Systems",
    ],
    accent: "secondary" as const,
  },
] as const;

export const terminalLines = [
  "> adnan init --project new-client",
  "> Scaffolding architecture...",
  "> Optimizing core web vitals...",
  "> Lighthouse: 100/100",
  "> Deployed to production ✓",
];

export const projectTypes = [
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile Application" },
  { value: "saas", label: "SaaS Infrastructure" },
  { value: "other", label: "Other" },
] as const;
