import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  // Witte tekst voor gebruik op een donkere achtergrond.
  onDark?: boolean;
};

// Klein label in hoofdletters boven een kop, bijv. "OVER ONS".
export default function Eyebrow({ children, onDark = false }: Props) {
  return (
    <span
      className={`font-mono-label text-[10px] tracking-[0.25em] uppercase ${onDark ? "text-white/90" : "text-primary"}`}
    >
      {children}
    </span>
  );
}
