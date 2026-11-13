import { useEffect } from "react";
import confetti from "canvas-confetti";

const emoji = (t) => confetti.shapeFromText({ text: t, scalar: 2 });
const base = { zIndex: 300, disableForReducedMotion: true };

export const heartBurst = () => {
  const shapes = ["❤️", "💖", "💗", "💕"].map(emoji);
  const fire = (spread, origin) => confetti({ ...base, particleCount: 45, spread, origin, shapes, scalar: 2, startVelocity: 42, ticks: 220 });
  fire(100, { x: 0.5, y: 0.55 });
  setTimeout(() => fire(140, { x: 0.15, y: 0.75 }), 200);
  setTimeout(() => fire(140, { x: 0.85, y: 0.75 }), 350);
};

export const petalBurst = () => {
  const shapes = ["🌸", "🌹", "🌷", "✨"].map(emoji);
  confetti({ ...base, particleCount: 70, spread: 110, origin: { x: 0.5, y: 0.5 }, shapes, scalar: 2, gravity: 0.7, drift: 0.4, ticks: 260 });
};

export const cakeConfetti = () => {
  const colors = ["#f9d9a0", "#f7b6c8", "#e8b4a0", "#ffffff", "#e24764"];
  confetti({ ...base, particleCount: 140, spread: 100, origin: { y: 0.55 }, colors });
  setTimeout(() => confetti({ ...base, particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors }), 250);
  setTimeout(() => confetti({ ...base, particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors }), 250);
};

export function useScrollLock() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
}
