import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Flower from "./Flowers";
import SectionTitle from "./SectionTitle";
import { bouquetFlowers } from "../data/memories";
import { petalBurst } from "../utils/fx";

const BY_ID = Object.fromEntries(bouquetFlowers.map((f) => [f.id, f]));
const PILLS = bouquetFlowers.filter((f) => f.pill);
const SLOTS = [[160, 62], [102, 88], [218, 88], [58, 128], [160, 112], [262, 128], [108, 152], [212, 152], [26, 170], [294, 170], [160, 160], [78, 196], [242, 196], [130, 184]];
const INITIAL = ["tulip", "rose", "peony", "peony", "rose", "champagne", "gypso", "gypso"];
const SIZE = { rose: 84, peony: 92, tulip: 78, sparkle: 58 };
const ANCHOR = [160, 300];
let uid = 0;

const make = (id, i) => {
  const [sx, sy] = SLOTS[i % SLOTS.length];
  const extra = i >= SLOTS.length;
  const x = sx + (Math.random() - 0.5) * (extra ? 60 : 8);
  const y = sy + (Math.random() - 0.5) * (extra ? 40 : 8);
  return { key: `b${uid++}`, id, x, y, rot: (x - 160) / 9 + (Math.random() - 0.5) * 8 };
};

export default function BouquetSection() {
  const [blooms, setBlooms] = useState(() => INITIAL.map(make));
  const [sel, setSel] = useState(null);
  const [opened, setOpened] = useState(false);
  const [tied, setTied] = useState(true);
  const [sent, setSent] = useState(false);
  const [intro, setIntro] = useState(true);

  const toggleTie = () => {
    if (!opened) { setOpened(true); setTied(false); setTimeout(() => setIntro(false), 1600); }
    else if (tied) { setTied(false); setSent(false); }
  };
  const add = (id) => {
    if (!opened || blooms.length >= 26) return;
    const b = make(id, blooms.length);
    setBlooms((l) => [...l, b]); setSel(b.key); setTied(false); setSent(false);
    navigator.vibrate?.(12);
  };
  const wrap = () => {
    if (!opened) return;
    setTied(true); setSel(null); setSent(true); petalBurst(); navigator.vibrate?.([20, 30, 20]);
  };
  const selB = blooms.find((b) => b.key === sel);
  const selF = selB && BY_ID[selB.id];

  return (
    <section id="bouquet" className="scroll-mt-24 px-4 py-16">
      <SectionTitle eyebrow="A little something for you" title="Your Bouquet" sub="Unwrap it, tap every bloom, and add more of your favorites." />
      <div className="relative mx-auto h-[440px] w-[320px] max-w-full" onClick={() => setSel(null)}>
        <div className="absolute left-1/2 top-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle,rgba(244,160,180,.4),transparent 70%)" }} />

        <svg viewBox="0 0 320 440" className="pointer-events-none absolute inset-0 h-full w-full">
          {blooms.map((b, i) => (
            <motion.path key={b.key} d={`M${b.x} ${b.y}Q${(b.x + ANCHOR[0]) / 2} ${(b.y + ANCHOR[1]) / 2 + 20} ${ANCHOR[0]} ${ANCHOR[1]}`}
              fill="none" stroke={BY_ID[b.id].shape === "sparkle" ? "#a9c8a4" : "#6f9a6f"} strokeWidth={BY_ID[b.id].shape === "sparkle" ? 1.5 : 3} strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: opened ? 1 : 0 }} transition={{ duration: 0.8, delay: intro ? i * 0.07 : 0 }} />
          ))}
        </svg>

        <div className="absolute left-[44px] top-[240px] h-[190px] w-[232px]"
          style={{
            clipPath: "polygon(0 0,100% 0,62% 100%,38% 100%)", backdropFilter: "blur(8px)",
            background: "linear-gradient(165deg,rgba(255,232,236,.93),rgba(246,190,205,.8) 55%,rgba(255,222,226,.92))",
          }}>
          <div className="absolute inset-0 opacity-40" style={{ background: "repeating-linear-gradient(100deg,transparent 0 14px,rgba(255,255,255,.7) 15px 16px)" }} />
        </div>

        {blooms.map((b, i) => {
          const f = BY_ID[b.id];
          const size = SIZE[f.shape];
          const on = sel === b.key;
          return (
            <motion.button key={b.key} type="button" aria-label={f.name} className="absolute"
              style={{ left: b.x - size / 2, top: b.y - size / 2, width: size, height: size, zIndex: on ? 30 : 1,
                filter: on ? "drop-shadow(0 0 14px #ffd98a)" : "drop-shadow(0 4px 6px rgba(0,0,0,.35))" }}
              initial={{ scale: 0, opacity: 0, rotate: b.rot - 40 }}
              animate={opened ? { scale: on ? 1.28 : 1, opacity: 1, rotate: b.rot } : { scale: 0, opacity: 0, rotate: b.rot - 40 }}
              transition={{ type: "spring", stiffness: 280, damping: 12, delay: intro ? i * 0.07 : 0 }}
              whileTap={{ scale: 1.12 }}
              onClick={(e) => { e.stopPropagation(); setSel(b.key); navigator.vibrate?.(8); }}>
              <Flower shape={f.shape} colors={f.colors} size={size} />
            </motion.button>
          );
        })}

        <svg viewBox="0 0 320 440" className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fbeec6" /><stop offset=".5" stopColor="#e6c27a" /><stop offset="1" stopColor="#c99a4a" />
            </linearGradient>
          </defs>
          <motion.g onClick={(e) => { e.stopPropagation(); toggleTie(); }}
            style={{ pointerEvents: tied ? "auto" : "none", cursor: "pointer",
              filter: sent ? "drop-shadow(0 0 10px #ffe08a)" : "drop-shadow(0 2px 3px rgba(0,0,0,.3))" }}
            initial={false} animate={tied ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.25, y: -24 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}>
            <rect x="68" y="291" width="184" height="20" rx="4" fill="url(#gold)" />
            <path d="M160 300C118 252 92 296 146 304Z" fill="url(#gold)" />
            <path d="M160 300C202 252 228 296 174 304Z" fill="url(#gold)" />
            <path d="M153 306L126 356L146 348L152 366L166 308Z" fill="url(#gold)" />
            <path d="M167 306L194 356L174 348L168 366L154 308Z" fill="url(#gold)" />
            <circle cx="160" cy="302" r="9" fill="#d8aa5c" />
          </motion.g>
        </svg>

        {!opened && (
          <motion.p className="glass absolute left-1/2 top-[130px] -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm"
            animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.6, repeat: Infinity }}>
            Tap the ribbon to unwrap 🎀
          </motion.p>
        )}

        <AnimatePresence>
          {selF && (
            <motion.div key={selB.key} className="glass absolute left-1/2 top-0 z-40 w-[260px] -translate-x-1/2 rounded-2xl px-4 py-3 text-center"
              initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}>
              <p className="font-display text-sm text-champagne">{selF.name}</p>
              <p className="mt-0.5 text-xs text-blush/90">{selF.meaning}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-4 flex max-w-[360px] flex-wrap justify-center gap-2">
        {PILLS.map((f) => (
          <button key={f.id} onClick={() => add(f.id)} disabled={!opened}
            className="glass rounded-full px-4 py-2 text-sm transition active:scale-95 disabled:opacity-40">{f.pill}</button>
        ))}
      </div>
      <button onClick={wrap} disabled={!opened}
        className="mx-auto mt-4 block w-full max-w-[320px] rounded-full py-3 font-semibold text-wine shadow-lg transition active:scale-95 disabled:opacity-40"
        style={{ background: "linear-gradient(120deg,#f4e3bd,#e8b4a0 50%,#f9d9a0)" }}>
        Wrap & Send Bouquet
      </button>
      <AnimatePresence>
        {sent && (
          <motion.p className="mt-3 text-center text-sm text-champagne" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Wrapped with love and sent straight to your heart 💌
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
