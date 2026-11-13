import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Photo from "./Photo";
import { config } from "../data/memories";

const START = new Date(config.anniversary);
function elapsed() {
  const n = new Date();
  let y = n.getFullYear() - START.getFullYear(), mo = n.getMonth() - START.getMonth(), d = n.getDate() - START.getDate();
  let h = n.getHours() - START.getHours(), mi = n.getMinutes() - START.getMinutes(), s = n.getSeconds() - START.getSeconds();
  if (s < 0) { s += 60; mi--; }
  if (mi < 0) { mi += 60; h--; }
  if (h < 0) { h += 24; d--; }
  if (d < 0) { d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); mo--; }
  if (mo < 0) { mo += 12; y--; }
  return [y, mo, d, h, mi, s];
}
const LABELS = ["Years", "Months", "Days", "Hrs", "Mins", "Secs"];
const box = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } } };
const word = {
  hidden: { y: 40, opacity: 0, rotate: 5, filter: "blur(8px)" },
  show: { y: 0, opacity: 1, rotate: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 120, damping: 14 } },
};

export default function Hero() {
  const [t, setT] = useState(elapsed);
  useEffect(() => { const id = setInterval(() => setT(elapsed()), 1000); return () => clearInterval(id); }, []);

  return (
    <section id="home" className="scroll-mt-24 px-4 pb-10 pt-[150px]">
      <div className="relative mx-auto h-[calc(100dvh-230px)] min-h-[440px] max-h-[640px] w-full max-w-[420px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,.55)] ring-1 ring-white/15">
        <Photo src="/images/hero.jpg" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-velvet via-velvet/55 via-35% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-4 text-center">
          <motion.h1 variants={box} initial="hidden" animate="show" className="font-display text-[26px] leading-tight">
            {["Happy", "Birthday", "&", "Happy", "Monthsary,"].map((w, i) => (
              <motion.span key={i} variants={word} className="mr-2 inline-block">{w}</motion.span>
            ))}
            <span className="block font-script text-6xl text-gold">
              {config.name.split("").map((c, i) => (
                <motion.span key={i} className="inline-block" initial={{ y: 30, opacity: 0, scale: 0.5 }} animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 160, damping: 10, delay: 1 + i * 0.1 }}>{c}</motion.span>
              ))}
            </span>
          </motion.h1>
          <p className="mt-1 text-xs text-blush/80">{config.fullName} · {config.birthdayLabel} · turning {config.age}</p>
          <div className="glass mt-4 flex w-full justify-between rounded-full px-3 py-2" style={{ boxShadow: "0 0 28px rgba(232,180,160,.35), inset 0 1px 0 rgba(255,255,255,.25)" }}>
            {t.map((v, i) => (
              <div key={i} className="flex min-w-[42px] flex-col items-center">
                <span className="font-display text-lg tabular-nums">{String(v).padStart(2, "0")}</span>
                <span className="text-[9px] text-champagne/80">{LABELS[i]}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-blush/60">of being yours since March 18, 2026</p>
        </div>
      </div>
    </section>
  );
}
