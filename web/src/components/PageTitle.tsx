// Einheitlicher Seitentitel: kleine Zeile in Türkis darüber, grosse Überschrift
export function PageTitle({ eyebrow, title, className = "" }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={`mb-8 ${className}`}>
      {eyebrow && <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>}
      <h1 className="font-serif text-5xl leading-tight sm:text-6xl">{title}</h1>
    </div>
  );
}
