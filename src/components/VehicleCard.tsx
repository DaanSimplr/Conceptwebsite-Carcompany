import { Link } from "react-router";
import type { Vehicle } from "../data/inventory";
import { useLang } from "../context/LangContext";

const STATUS_COLORS: Record<Vehicle["status"], { bg: string; text: string; label_nl: string; label_en: string }> = {
  beschikbaar: { bg: "#d1fae5", text: "#065f46", label_nl: "Beschikbaar", label_en: "Available" },
  gereserveerd: { bg: "#fef3c7", text: "#92400e", label_nl: "Gereserveerd", label_en: "Reserved" },
  verkocht:    { bg: "#fee2e2", text: "#991b1b", label_nl: "Verkocht",     label_en: "Sold" },
  verhuur:     { bg: "#dbeafe", text: "#1e40af", label_nl: "Verhuur",      label_en: "Rental" },
};

export default function VehicleCard({ v }: { v: Vehicle }) {
  const { lang } = useLang();
  const s = STATUS_COLORS[v.status];

  const sold = v.status === "verkocht";

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-lg border transition-shadow duration-200 hover:shadow-lg"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", backgroundColor: "var(--secondary)" }}>
        <img
          src={v.img}
          alt={`${v.make} ${v.model}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          className="absolute top-3 left-3 font-mono-label text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
          style={{ backgroundColor: s.bg, color: s.text }}
        >
          {lang === "nl" ? s.label_nl : s.label_en}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base leading-snug">
            {v.make} {v.model}
          </h3>
          <span className="font-display font-bold text-lg leading-tight shrink-0" style={{ color: "var(--primary)" }}>
            {v.price}
          </span>
        </div>

        {v.monthlyLease && (
          <p className="font-mono-label text-[10px] tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
            Lease: {v.monthlyLease}
          </p>
        )}

        <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--secondary-foreground)" }}>
          {v.shortDesc}
        </p>

        {/* Specs row */}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: "var(--muted-foreground)" }}>
          <li><span aria-hidden="true">📅 </span>{v.year}</li>
          <li><span aria-hidden="true">⛽ </span>{v.fuel}</li>
          <li><span aria-hidden="true">⚙️ </span>{v.transmission}</li>
          {v.km !== "—" && <li><span aria-hidden="true">🛣️ </span>{v.km}</li>}
        </ul>

        {/* Tags */}
        <ul className="flex flex-wrap gap-1.5 mt-2">
          {v.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono-label text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
              style={{ backgroundColor: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-4">
          {sold ? (
            <span className="btn btn-disabled w-full py-2.5" aria-disabled="true">
              {lang === "nl" ? "Verkocht" : "Sold"}
            </span>
          ) : (
            <Link to="/contact" className="btn btn-primary w-full py-2.5">
              {lang === "nl" ? "Informeer / aanvragen" : "Enquire"}
              <span className="sr-only">: {v.make} {v.model}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
