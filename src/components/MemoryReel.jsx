import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import Photo from "./Photo";
import SectionTitle from "./SectionTitle";
import { memories } from "../data/memories";
import { useScrollLock } from "../utils/fx";

function Sheet({ m, onClose }) {
  useScrollLock();
  const drag = useDragControls();
  return (
    <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        drag="y" dragControls={drag} dragListener={false} dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, i) => { if (i.offset.y > 120 || i.velocity.y > 600) onClose(); }}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 32, stiffness: 320 }}
        className="safe-bottom absolute inset-x-0 bottom-0 max-h-[90dvh] overflow-y-auto rounded-t-[2rem] bg-[#fff8f3] text-wine">
        <div onPointerDown={(e) => drag.start(e)} className="sticky top-0 z-10 flex justify-center bg-[#fff8f3] py-3" style={{ touchAction: "none" }}>
          <span className="h-1.5 w-12 rounded-full bg-wine/25" />
        </div>
        <div className="px-5">
          <Photo src={m.img} className="aspect-[4/5] w-full rounded-2xl" />
          <h3 className="mt-4 font-display text-2xl">{m.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-wine/70">
            <span>📅 {m.date}</span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#c1213f"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.500a2.5 2.5 0 0 1 0 5z" /></svg>
              {m.location}
            </span>
          </div>
          <p className="mt-4 font-script text-2xl leading-8">{m.story}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MemoryReel() {
  const scroller = useRef(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const root = scroller.current;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(+e.target.dataset.i); }), { root, threshold: 0.6 });
    [...root.children].forEach((c) => c.dataset.i !== undefined && io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section id="memories" className="scroll-mt-24 py-16">
      <SectionTitle eyebrow="Scroll through us" title="Memory Reel" sub="Tap a photo to read the story behind it." />
      <div ref={scroller} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pl-[14vw]" style={{ WebkitOverflowScrolling: "touch" }}>
        {memories.map((m, i) => (
          <button key={m.id} data-i={i} onClick={() => setOpen(m)}
            className={`w-[72vw] max-w-[320px] shrink-0 snap-center rounded-md bg-[#fff8f3] p-3 pb-4 text-left text-wine shadow-2xl transition-all duration-500 ${active === i ? "scale-100 opacity-100" : "scale-90 opacity-70"} ${i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}`}>
            <Photo src={m.img} className="aspect-[4/5] w-full" />
            <p className="mt-3 font-script text-2xl leading-none">{m.title}</p>
            <p className="mt-1 text-xs text-wine/60">{m.date}</p>
          </button>
        ))}
        <div className="w-[14vw] shrink-0" aria-hidden="true" />
      </div>
      <AnimatePresence>{open && <Sheet key={open.id} m={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}
