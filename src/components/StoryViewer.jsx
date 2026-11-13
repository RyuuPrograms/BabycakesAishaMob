import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Photo from "./Photo";
import { useScrollLock } from "../utils/fx";

const DUR = 5000;

export default function StoryViewer({ stories, start, onClose }) {
  useScrollLock();
  const [si, setSi] = useState(start);
  const [pi, setPi] = useState(0);
  const [p, setP] = useState(0);
  const paused = useRef(false);
  const press = useRef({ t: 0 });
  const story = stories[si];
  const slide = story.slides[pi];

  const next = () => {
    setP(0);
    if (pi < story.slides.length - 1) setPi(pi + 1);
    else if (si < stories.length - 1) { setSi(si + 1); setPi(0); }
    else onClose();
  };
  const prev = () => {
    setP(0);
    if (pi > 0) setPi(pi - 1);
    else if (si > 0) { setSi(si - 1); setPi(0); }
  };

  useEffect(() => {
    let raf, last = performance.now();
    const tick = (n) => {
      const d = n - last; last = n;
      if (!paused.current) setP((v) => v + d / DUR);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  useEffect(() => { if (p >= 1) next(); }, [p]);

  const stop = (e) => e.stopPropagation();

  return (
    <motion.div
      className="fixed inset-0 z-[90] select-none bg-black" style={{ touchAction: "none" }}
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
      onPointerDown={() => { press.current.t = Date.now(); paused.current = true; }}
      onPointerUp={(e) => {
        paused.current = false;
        if (Date.now() - press.current.t < 220) (e.clientX > window.innerWidth / 2 ? next : prev)();
      }}
      onPointerCancel={() => { paused.current = false; }}
    >
      <motion.div key={`${si}-${pi}`} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <Photo src={slide.img} className="h-full w-full" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      <div className="absolute inset-x-0 top-0 px-3 pt-[max(env(safe-area-inset-top),12px)]">
        <div className="flex gap-1">
          {story.slides.map((_, i) => (
            <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <div className="h-full bg-white" style={{ width: `${i < pi ? 100 : i === pi ? Math.min(p, 1) * 100 : 0}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Photo src={story.cover} className="h-9 w-9 rounded-full border border-white/60" />
            <span className="text-sm font-semibold">{story.label}</span>
          </div>
          <button onPointerDown={stop} onPointerUp={stop} onClick={onClose} aria-label="Close story" className="h-10 w-10 text-2xl">✕</button>
        </div>
      </div>

      <p className="absolute inset-x-0 bottom-0 px-6 pb-[max(env(safe-area-inset-bottom),32px)] text-center font-script text-3xl leading-tight drop-shadow-lg">
        {slide.caption}
      </p>
    </motion.div>
  );
}
