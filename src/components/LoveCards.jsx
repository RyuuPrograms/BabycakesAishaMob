import { useState } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { loveReasons } from "../data/memories";

const FACE = { background: "linear-gradient(145deg,#f9e0d0,#e8b4a0 45%,#c98774)", boxShadow: "0 18px 40px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.6)" };

function CardBody({ text, n }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-[1.6rem] border border-white/40 p-7 text-center text-wine">
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="#8a1f3a"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
      <p className="font-display text-2xl leading-snug">{text}</p>
      <p className="font-script text-lg opacity-70">reason #{n}</p>
    </div>
  );
}

function TopCard({ idx, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-16, 0, 16]);
  const love = useTransform(x, [20, 120], [0, 1]);
  const keep = useTransform(x, [-120, -20], [1, 0]);
  const controls = useAnimation();
  const end = async (_, i) => {
    if (Math.abs(i.offset.x) > 100 || Math.abs(i.velocity.x) > 600) {
      const dir = i.offset.x > 0 ? 1 : -1;
      navigator.vibrate?.(10);
      await controls.start({ x: dir * 520, opacity: 0, transition: { duration: 0.28 } });
      onSwipe();
    } else controls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 25 } });
  };
  return (
    <motion.div drag="x" dragElastic={0.9} onDragEnd={end} animate={controls}
      style={{ x, rotate, touchAction: "pan-y", ...FACE }} className="absolute inset-0 z-10 cursor-grab rounded-[1.8rem] p-2 active:cursor-grabbing">
      <CardBody text={loveReasons[idx]} n={idx + 1} />
      <motion.span style={{ opacity: love }} className="absolute left-5 top-6 -rotate-12 rounded-lg border-2 border-[#8a1f3a] px-3 py-1 font-display text-lg text-[#8a1f3a]">LOVE ❤️</motion.span>
      <motion.span style={{ opacity: keep }} className="absolute right-5 top-6 rotate-12 rounded-lg border-2 border-[#8a1f3a] px-3 py-1 font-display text-lg text-[#8a1f3a]">FOREVER 💞</motion.span>
    </motion.div>
  );
}

export default function LoveCards() {
  const [order, setOrder] = useState(() => loveReasons.map((_, i) => i));
  const [seen, setSeen] = useState(1);
  const swipe = () => { setOrder((o) => [...o.slice(1), o[0]]); setSeen((s) => s + 1); };
  const shuffle = () => {
    setOrder((o) => { const a = [...o]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; });
    setSeen(1); navigator.vibrate?.(15);
  };
  const stack = order.slice(0, 3);

  return (
    <section id="cards" className="scroll-mt-24 px-4 py-16">
      <SectionTitle eyebrow="Swipe left or right" title="Reasons I Love You" sub={`${loveReasons.length} of the countless reasons.`} />
      <div className="relative mx-auto h-[min(56dvh,440px)] w-[82vw] max-w-[330px]">
        {stack.map((idx, d) =>
          d === 0 ? <TopCard key={idx} idx={idx} onSwipe={swipe} /> : (
            <div key={idx} className="absolute inset-0 rounded-[1.8rem] p-2"
              style={{ ...FACE, transform: `translateY(${d * 14}px) scale(${1 - d * 0.05})`, opacity: 1 - d * 0.25, zIndex: 10 - d }} />
          )
        ).reverse()}
      </div>
      <div className="mt-10 flex flex-col items-center gap-3">
        <p className="text-xs text-blush/60">{((seen - 1) % loveReasons.length) + 1} / {loveReasons.length}</p>
        <button onClick={shuffle} className="glass rounded-full px-6 py-2.5 text-sm active:scale-95">Shuffle Deck 🔀</button>
      </div>
    </section>
  );
}
