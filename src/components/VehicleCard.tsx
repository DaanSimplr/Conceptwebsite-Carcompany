import { Link } from "react-router";
import type { Vehicle } from "../data/inventory";
import { useLang, type Localized } from "../context/LangContext";

// Kleur en tekst van het statuslabel linksboven op de foto.
// Toegankelijkheid: elke combinatie voldoet aan WCAG AA-contrast.
const STATUS_STYLES: Record<Vehicle["status"], { bg: string; text: string; label: Localized }> = {
  beschikbaar: { bg: "#d1fae5", text: "#065f46", label: { nl: "Beschikbaar", en: "Available" } },
  gereserveerd: { bg: "#fef3c7", text: "#92400e", label: { nl: "Gereserveerd", en: "Reserved" } },
  verkocht: { bg: "#fee2e2", text: "#991b1b", label: { nl: "Verkocht", en: "Sold" } },
  verhuur: { bg: "#dbeafe", text: "#1e40af", label: { nl: "Verhuur", en: "Rental" } },
};

const CONTENT = {
  nl: { sold: "Verkocht", enquire: "Informeer / aanvragen" },
  en: { sold: "Sold", enquire: "Enquire" },
};

// Kaart met foto, prijs, specificaties en een CTA voor één voertuig.
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const status = STATUS_STYLES[vehicle.status];
  const name = `${vehicle.make} ${vehicle.model}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow duration-200 hover:shadow-lg">
      {/* Foto met statuslabel */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={vehicle.img}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span
          className="absolute top-3 left-3 font-mono-label text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm"
          style={{ backgroundColor: status.bg, color: status.text }}
        >
          {status.label[lang]}
        </span>
      </div>

      {/* Inhoud */}
      <div className="p-5 flex flex-col flex-1 gap-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base leading-snug">{name}</h3>
          <span className="font-display font-bold text-lg leading-tight shrink-0 text-primary">{vehicle.price}</span>
        </div>

        {vehicle.monthlyLease && (
          <p className="font-mono-label text-[10px] tracking-widest uppercase text-muted-foreground">
            Lease: {vehicle.monthlyLease}
          </p>
        )}

        <p className="text-sm leading-relaxed mt-1 text-secondary-foreground">{vehicle.shortDesc}</p>

        {/* Specificaties. Toegankelijkheid: de emoji's zijn decoratief en worden niet voorgelezen. */}
        <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
          <li><span aria-hidden="true">📅 </span>{vehicle.year}</li>
          <li><span aria-hidden="true">⛽ </span>{vehicle.fuel}</li>
          <li><span aria-hidden="true">⚙️ </span>{vehicle.transmission}</li>
          {/* Huurauto's hebben geen kilometerstand ("—"); die tonen we dan niet. */}
          {vehicle.km !== "—" && <li><span aria-hidden="true">🛣️ </span>{vehicle.km}</li>}
        </ul>

        {/* Kenmerken */}
        <ul className="flex flex-wrap gap-1.5 mt-2">
          {vehicle.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono-label text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm border border-border bg-muted text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* CTA, met mt-auto onderaan de kaart zodat knoppen in een rij op één lijn staan */}
        <div className="mt-auto pt-4">
          {vehicle.status === "verkocht" ? (
            // Toegankelijkheid: geen link, maar wel als uitgeschakeld gemarkeerd voor screenreaders.
            <span className="btn btn-disabled w-full py-2.5" aria-disabled="true">
              {t.sold}
            </span>
          ) : (
            <Link to="/contact" className="btn btn-primary w-full py-2.5">
              {t.enquire}
              {/* Toegankelijkheid: maakt elke knop uniek in een lijst met links ("Informeer: Volkswagen Golf"). */}
              <span className="sr-only">: {name}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
