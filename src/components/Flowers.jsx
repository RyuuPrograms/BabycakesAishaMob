const Ring = ({ n, rx, ry, off, rot = 0, fill }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <ellipse key={i} cx="50" cy={50 - off} rx={rx} ry={ry} fill={fill}
        stroke="rgba(60,0,20,.22)" strokeWidth="1" transform={`rotate(${rot + (i * 360) / n} 50 50)`} />
    ))}
  </>
);

export default function Flower({ shape, colors, size = 84 }) {
  const [a, b, c] = colors;
  const edge = "rgba(60,0,20,.2)";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible", display: "block" }} aria-hidden="true">
      {shape === "rose" && (
        <>
          <Ring n={5} rx={21} ry={22} off={18} fill={a} />
          <Ring n={5} rx={16} ry={17} off={10} rot={36} fill={b} />
          <circle cx="50" cy="50" r="13" fill={c} />
          <path d="M50 43a7 7 0 1 1-7 7a4 4 0 1 1 4-4" fill="none" stroke="rgba(60,0,20,.35)" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {shape === "peony" && (
        <>
          <Ring n={8} rx={17} ry={23} off={22} fill={a} />
          <Ring n={8} rx={14} ry={19} off={15} rot={22} fill={b} />
          <Ring n={6} rx={11} ry={14} off={8} rot={10} fill={c} />
          <circle cx="50" cy="50" r="5" fill="#f3c969" />
        </>
      )}
      {shape === "tulip" && (
        <>
          <path d="M28 62C18 30 30 14 44 10C44 36 48 50 52 62Z" fill={b} stroke={edge} />
          <path d="M72 62C82 30 70 14 56 10C56 36 52 50 48 62Z" fill={b} stroke={edge} />
          <path d="M30 64C26 34 38 14 50 8C62 14 74 34 70 64C60 78 40 78 30 64Z" fill={a} stroke={edge} />
        </>
      )}
      {shape === "sparkle" && (
        <>
          {[[30, 40, 3], [50, 26, 3.5], [70, 38, 3], [40, 60, 3], [62, 58, 3.2], [50, 44, 2.5], [22, 62, 2.4], [78, 62, 2.4]].map(([x, y, r], i) => (
            <g key={i} className="twinkle" style={{ animationDelay: `${i * 0.25}s` }}>
              <circle cx={x} cy={y} r={r * 2.4} fill="#fff" opacity=".22" />
              <circle cx={x} cy={y} r={r} fill="#fff" />
            </g>
          ))}
          <path className="twinkle" d="M50 34L53 47L66 50L53 53L50 66L47 53L34 50L47 47Z" fill="#fff2c6" />
        </>
      )}
    </svg>
  );
}
