import { useEffect, useState } from "react";

const ITEMS = [["home", "🏠", "Home"], ["bouquet", "💐", "Bouquet"], ["cards", "💌", "Love Cards"], ["memories", "📸", "Memories"], ["wish", "🎂", "Wish & Letter"]];

export default function BottomDock() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -45% 0px" });
    ITEMS.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="glass fixed bottom-[max(env(safe-area-inset-bottom),12px)] left-1/2 z-40 flex w-[92vw] max-w-[420px] -translate-x-1/2 justify-between rounded-full p-1.5">
      {ITEMS.map(([id, icon, label]) => (
        <button key={id} onClick={() => go(id)} aria-label={label}
          className={`flex flex-1 flex-col items-center gap-0.5 rounded-full px-1 py-1.5 transition-colors ${active === id ? "bg-white/20" : ""}`}>
          <span className="text-lg leading-none">{icon}</span>
          <span className={`whitespace-nowrap text-[9px] leading-tight ${active === id ? "text-champagne" : "text-blush/60"}`}>{label}</span>
        </button>
      ))}
    </nav>
  );
}
