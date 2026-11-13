export default function SectionTitle({ eyebrow, title, sub }) {
  return (
    <div className="mb-8 text-center">
      <p className="text-[11px] tracking-[0.3em] text-rosegold/80">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl text-gold">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-[30ch] text-sm text-blush/70">{sub}</p>}
    </div>
  );
}
