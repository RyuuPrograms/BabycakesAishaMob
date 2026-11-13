import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeartUnlock from "./components/HeartUnlock";
import StoryBar from "./components/StoryBar";
import StoryViewer from "./components/StoryViewer";
import MusicPill from "./components/MusicPill";
import Hero from "./components/Hero";
import BouquetSection from "./components/BouquetSection";
import LoveCards from "./components/LoveCards";
import MemoryReel from "./components/MemoryReel";
import CakeLetter from "./components/CakeLetter";
import BottomDock from "./components/BottomDock";
import { stories } from "./data/memories";

export default function App() {
  const audio = useRef(null);
  const [unlocked, setUnlocked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [story, setStory] = useState(null);

  useEffect(() => {
    document.body.style.overflow = unlocked ? "" : "hidden";
  }, [unlocked]);

  // Start muted on first touch so mobile browsers allow sound once the unlock completes.
  const prime = () => { const a = audio.current; if (a) { a.muted = true; a.play().catch(() => {}); } };
  const cancel = () => { const a = audio.current; if (a) { a.pause(); a.muted = false; a.currentTime = 0; } };
  const unlock = () => {
    const a = audio.current;
    if (a) { a.muted = false; a.volume = 0.85; a.play().catch(() => {}); }
    setUnlocked(true);
  };
  const toggle = () => { const a = audio.current; if (a) (a.paused ? a.play().catch(() => {}) : a.pause()); };

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <audio ref={audio} src="/music/our-song.mp3" loop preload="auto" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <AnimatePresence>{!unlocked && <HeartUnlock key="lock" onPrime={prime} onCancel={cancel} onUnlock={unlock} />}</AnimatePresence>
      {unlocked && (
        <>
          <StoryBar stories={stories} onOpen={setStory} />
          <MusicPill playing={playing} onToggle={toggle} />
          <main className="pb-32">
            <Hero />
            <BouquetSection />
            <LoveCards />
            <MemoryReel />
            <CakeLetter />
          </main>
          <BottomDock />
        </>
      )}
      <AnimatePresence>
        {story !== null && <StoryViewer key="story" stories={stories} start={story} onClose={() => setStory(null)} />}
      </AnimatePresence>
    </div>
  );
}
