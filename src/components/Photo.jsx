// Photo with a graceful gradient fallback while a picture hasn't been added yet.
export default function Photo({ src, alt = "", className = "", style }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-rose-900 via-wine to-[#2a0a14] ${className}`} style={style}>
      <img src={src} alt={alt} draggable={false}
        onError={(e) => { e.currentTarget.style.display = "none"; }}
        className="absolute inset-0 h-full w-full select-none object-cover" />
    </div>
  );
}
