type CaseSectionProps = {
  title: string;
  content: string;
};

export function CaseSection({ title, content }: CaseSectionProps) {
  return (
    <section className="h-full space-y-3 rounded-2xl border border-border/60 bg-white/60 p-6">
      <p className="section-kicker">{title}</p>
      <p className="body-copy">{content}</p>
    </section>
  );
}
