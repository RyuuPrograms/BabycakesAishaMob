import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Flower from "./Flowers";
import { config } from "../data/memories";
import { heartBurst } from "../utils/fx";

const HOLD = 1500;
const R = 62;
const C = 2 * Math.PI * R;

export default function HeartUnlock({ onPrime, onCancel, onUnlock }) {
  const [p, setP] = useState(0);
  const raf = useRef(0);
  const t0 = useRef(0);
  const done = useRef(false);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const loop = (t) => {
    const v = Math.min((t - t0.current) / HOLD, 1);
    setP(v);
    if (v >= 1) {
      if (!done.current) {
        done.current = true;
        heartBurst();
        navigator.vibrate?.([30, 40, 60]);
        setTimeout(onUnlock, 500);
      }
      return;
    }
    raf.current = requestAnimationFrame(loop);
  };
  const down = (e) => {
    if (done.current) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    onPrime();
    navigator.vibrate?.(10);
    t0.current = performance.now();
    raf.current = requestAnimationFrame(loop);
  };
  const up = () => {
    if (done.current) return;
    cancelAnimationFrame(raf.current);
    setP(0);
    onCancel();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex h-[100dvh] select-none flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ background: "radial-gradient(90% 60% at 50% 35%, #5c1432 0%, #1c0711 55%, #0c0307 100%)", WebkitTouchCallout: "none" }}
      exit={{ opacity: 0, scale: 1.12 }} transition={{ duration: 0.7 }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 90, damping: 12 }}
        style={{ filter: "drop-shadow(0 0 26px rgba(226,71,100,.75))" }}>
        <Flower shape="rose" colors={["#9b1030", "#c1213f", "#e24764"]} size={130} />
      </motion.div>
      <div>
        <p className="font-script text-4xl text-gold">For {config.fullName}</p>
        <p className="mt-2 text-sm text-blush/70">Press and hold the heart to unlock your surprise</p>
      </div>

      <button
        aria-label="Hold to unlock"
        className="relative flex h-44 w-44 items-center justify-center rounded-full"
        style={{ touchAction: "none" }}
        onPointerDown={down} onPointerUp={up} onPointerCancel={up}
      >
        <span className="pulse-ring absolute h-28 w-28 rounded-full border border-rosegold/60" />
        <span className="pulse-ring absolute h-28 w-28 rounded-full border border-rosegold/40" style={{ animationDelay: ".9s" }} />
        <svg className="absolute inset-0" viewBox="0 0 150 150" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="75" cy="75" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="5" />
          <circle cx="75" cy="75" r={R} fill="none" stroke="url(#rg)" strokeWidth="5" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * (1 - p)} />
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4e3bd" /><stop offset="1" stopColor="#e8b4a0" />
            </linearGradient>
          </defs>
        </svg>
        <motion.svg viewBox="0 0 24 24" className="h-20 w-20" animate={{ scale: [1, 1.14, 1, 1.1, 1] }}
          transition={{ duration: 1.3, repeat: Infinity }} style={{ filter: "drop-shadow(0 0 14px rgba(255,120,150,.9))" }}>
          <path fill="#ff6b8e" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>
      </button>
      <p className="text-xs text-blush/50">{p > 0 && p < 1 ? "Keep holding…" : "Touch sensor"}</p>
    </motion.div>
  );
}
