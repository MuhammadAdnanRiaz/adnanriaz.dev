export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  id?: string;
}) {
  return (
    <div className="max-w-3xl" data-reveal>
      <p className="eyebrow" id={id}>{eyebrow}</p>
      <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">{title}</h2>
      {lede && <p className="mt-5 text-lg text-muted leading-relaxed">{lede}</p>}
    </div>
  );
}
