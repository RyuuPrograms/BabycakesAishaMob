import Photo from "./Photo";
import { config } from "../data/memories";

export default function MusicPill({ playing, onToggle }) {
  return (
    <div className="fixed left-1/2 top-[96px] z-30 -translate-x-1/2">
      <button onClick={onToggle} aria-label={playing ? "Pause music" : "Play music"} className="glass flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4">
        <span className={`block h-9 w-9 rounded-full p-[3px] ${playing ? "animate-spin" : ""}`}
          style={{ animationDuration: "6s", background: "conic-gradient(#1a1a1a,#444,#1a1a1a,#444,#1a1a1a)" }}>
          <Photo src="/images/story-1.jpg" className="h-full w-full rounded-full" />
        </span>
        <span className="text-left leading-tight">
          <span className="block text-xs font-semibold">{config.songTitle}</span>
          <span className="block text-[10px] text-blush/70">{config.songArtist}</span>
        </span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
        </svg>
      </button>
    </div>
  );
}
