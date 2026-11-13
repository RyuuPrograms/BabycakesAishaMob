import Photo from "./Photo";

export default function StoryBar({ stories, onOpen }) {
  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-velvet via-velvet/85 to-transparent pb-3 pt-[max(env(safe-area-inset-top),10px)]">
      <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-1">
        {stories.map((s, i) => (
          <button key={s.id} onClick={() => onOpen(i)} className="flex shrink-0 flex-col items-center gap-1">
            <span className="rounded-full p-[3px]"
              style={{ background: "conic-gradient(from 200deg,#f4e3bd,#e8b4a0,#e24764,#f4e3bd)", boxShadow: "0 0 14px rgba(232,180,160,.55)" }}>
              <Photo src={s.cover} className="h-14 w-14 rounded-full border-2 border-velvet" />
            </span>
            <span className="max-w-[68px] truncate text-[10px] text-blush/90">{s.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
