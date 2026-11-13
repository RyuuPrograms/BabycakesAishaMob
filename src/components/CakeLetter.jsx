import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { config, loveLetter } from "../data/memories";
import { cakeConfetti, useScrollLock } from "../utils/fx";

const CANDLES = [118, 150, 182];
const wave = (x, y, n, w) => `M${x} ${y}q${w / 2} 18 ${w} 0${` t${w} 0`.repeat(n - 1)}`;

function Letter({ onClose }) {
  useScrollLock();
  const [broken, setBroken] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBroken(true), 1400); return () => clearTimeout(t); }, []);
  const ps = loveLetter.paragraphs;
  const reveal = (i) => ({ initial: { opacity: 0, y: 10 }, animate: broken ? { opacity: 1, y: 0 } : {}, transition: { delay: 1.3 + i * 0.5 } });

  return (
    <motion.div className="fixed inset-0 z-[80] overflow-y-auto bg-[radial-gradient(circle_at_50%_30%,#5a1330,#14060c)]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button onClick={onClose} aria-label="Close letter" className="glass fixed right-4 top-[max(env(safe-area-inset-top),16px)] z-30 h-10 w-10 rounded-full">✕</button>
      <motion.div className="pointer-events-none fixed left-1/2 top-1/2 z-20 -ml-14 -mt-14 flex h-28 w-28 items-center justify-center rounded-full font-script text-6xl text-champagne"
        style={{ background: "radial-gradient(circle at 35% 30%,#e04a68,#8a0f2a 70%)", boxShadow: "0 10px 30px rgba(0,0,0,.5), inset 0 -6px 12px rgba(0,0,0,.35)" }}
        initial={{ scale: 0, rotate: -30 }} animate={broken ? { scale: 1.9, opacity: 0, rotate: 25 } : { scale: 1, rotate: 0 }}
        transition={broken ? { duration: 0.7 } : { type: "spring", stiffness: 200, damping: 12 }}>A</motion.div>

      <div className="flex min-h-full flex-col items-center justify-center px-4 py-20">
        <motion.article className="relative w-full max-w-[380px] origin-top rounded-md px-6 py-10 text-wine shadow-2xl"
          style={{ background: "linear-gradient(#fff9f0,#fbeedd)", transformPerspective: 900 }}
          initial={{ scaleY: 0, opacity: 0, rotateX: -50 }} animate={broken ? { scaleY: 1, opacity: 1, rotateX: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
          <motion.h3 className="font-script text-4xl" {...reveal(0)}>{loveLetter.greeting}</motion.h3>
          {ps.map((p, i) => (
            <motion.p key={i} className="mt-4 font-script text-[22px] leading-8" {...reveal(i + 1)}>{p}</motion.p>
          ))}
          <motion.p className="mt-6 font-script text-2xl" {...reveal(ps.length + 1)}>{loveLetter.closing}</motion.p>
          <svg viewBox="0 0 320 84" className="mt-1 w-64 overflow-visible">
            <motion.text x="6" y="60" fontFamily='"Dancing Script",cursive' fontSize="54" fill="#8a1f3a" stroke="#8a1f3a" strokeWidth="1"
              initial={{ strokeDasharray: 1500, strokeDashoffset: 1500, fillOpacity: 0 }}
              animate={broken ? { strokeDashoffset: 0, fillOpacity: 1 } : {}}
              transition={{ duration: 3, delay: 1.5 + (ps.length + 1) * 0.5, fillOpacity: { delay: 3.6 + (ps.length + 1) * 0.5, duration: 0.8 } }}>
              {loveLetter.signature}
            </motion.text>
          </svg>
        </motion.article>
        <button onClick={onClose} className="glass mt-6 rounded-full px-6 py-2.5 text-sm">Back to my cake 🎂</button>
      </div>
    </motion.div>
  );
}

export default function CakeLetter() {
  const [lit, setLit] = useState(true);
  const [open, setOpen] = useState(false);

  const blow = () => {
    if (!lit) return;
    setLit(false); cakeConfetti(); navigator.vibrate?.([40, 30, 80]);
    setTimeout(() => setOpen(true), 1700);
  };

  return (
    <section id="wish" className="scroll-mt-24 px-4 py-16">
      <SectionTitle eyebrow={`Happy ${config.age}th, Princess`} title="Make a Wish" sub={lit ? "Close your eyes, then tap the candles to blow them out." : "Your wish is on its way ✨"} />
      <svg viewBox="0 0 300 330" className="mx-auto w-[78vw] max-w-[320px] cursor-pointer overflow-visible" onClick={blow} role="button" aria-label="Blow out the candles">
        <defs>
          <linearGradient id="cPink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffd3e0" /><stop offset="1" stopColor="#f08fb0" /></linearGradient>
          <linearGradient id="cCream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff1f4" /><stop offset="1" stopColor="#ffc9d9" /></linearGradient>
          <radialGradient id="glow"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".9" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="150" cy="314" rx="142" ry="14" fill="#f4e3bd" opacity=".9" />
        <rect x="26" y="228" width="248" height="86" rx="16" fill="url(#cPink)" />
        <rect x="58" y="170" width="184" height="64" rx="14" fill="url(#cCream)" />
        <rect x="88" y="120" width="124" height="56" rx="12" fill="url(#cPink)" />
        <path d={`${wave(26, 234, 8, 31)}V226H26Z`} fill="rgba(255,255,255,.93)" />
        <path d={`${wave(58, 176, 6, 30.67)}V168H58Z`} fill="rgba(255,255,255,.93)" />
        <path d={`${wave(88, 126, 4, 31)}V118H88Z`} fill="rgba(255,255,255,.93)" />
        {[[50, 262, "#f9d9a0"], [90, 292, "#e24764"], [210, 288, "#f9d9a0"], [250, 264, "#e24764"], [120, 206, "#f08fb0"], [180, 210, "#f9d9a0"], [140, 156, "#fff"], [172, 160, "#f9d9a0"]].map(([x, y, c], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={c} />
        ))}
        <text x="150" y="288" textAnchor="middle" fontFamily='"Dancing Script",cursive' fontSize="30" fill="#8a1f3a">Happy Birthday</text>
        <text x="150" y="214" textAnchor="middle" fontFamily='"Dancing Script",cursive' fontSize="30" fill="#c1213f">{config.name}</text>
        {CANDLES.map((x) => (
          <g key={x}>
            <rect x={x - 4} y="88" width="8" height="34" rx="2" fill="#f4e3bd" />
            <rect x={x - 4} y="98" width="8" height="4" fill="#e8b4a0" />
            <rect x={x - 4} y="108" width="8" height="4" fill="#e8b4a0" />
            {lit && (
              <g className="flame">
                <circle cx={x} cy="72" r="22" fill="url(#glow)" />
                <path d={`M${x} 56c6 8 7 13 0 20c-7-7-6-12 0-20z`} fill="#ffb938" />
                <path d={`M${x} 64c3 4 3.5 6 0 9c-3.5-3-3-5 0-9z`} fill="#fff3b0" />
              </g>
            )}
            {!lit && [0, 1].map((k) => (
              <motion.circle key={k} cx={x} fill="#d8cfd2" initial={{ cy: 84, r: 3, opacity: 0.7 }}
                animate={{ cy: 14, r: 11, opacity: 0, cx: x + (k ? 12 : -12) }} transition={{ duration: 2, delay: k * 0.4, repeat: 1 }} />
            ))}
          </g>
        ))}
      </svg>
      <div className="mt-8 flex flex-col items-center gap-3">
        {!lit && <button onClick={() => setOpen(true)} className="rounded-full px-6 py-3 font-semibold text-wine" style={{ background: "linear-gradient(120deg,#f4e3bd,#e8b4a0 50%,#f9d9a0)" }}>Open my love letter 💌</button>}
        {!lit && <button onClick={() => setLit(true)} className="text-sm text-blush/70 underline">Relight the candles</button>}
      </div>
      <p className="mt-16 text-center font-script text-2xl text-blush/70">Happy birthday & happy monthsary, my love.</p>
      <AnimatePresence>{open && <Letter key="letter" onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
}
