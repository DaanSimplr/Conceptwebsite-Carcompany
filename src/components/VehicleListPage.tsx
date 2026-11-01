import { useState } from "react";
import { inventory, type Vehicle } from "../data/inventory";
import { useLang, type Localized } from "../context/LangContext";
import PageHeader from "./PageHeader";
import VehicleCard from "./VehicleCard";

type Props = {
  // Welke voertuigen getoond worden; "all" toont het hele aanbod.
  category: Vehicle["category"] | "all";
  title: Localized;
  intro: Localized;
};

const CONTENT = {
  nl: {
    searchLabel: "Zoeken op merk, model of bouwjaar",
    searchPlaceholder: "Zoeken op merk, model…",
    fuelLabel: "Filter op brandstof",
    allFuels: "Alle brandstoffen",
    vehicles: "voertuigen",
    noResultsTitle: "Geen resultaten",
    noResultsText: "Pas uw zoekopdracht aan.",
  },
  en: {
    searchLabel: "Search by make, model or year",
    searchPlaceholder: "Search by make, model…",
    fuelLabel: "Filter by fuel",
    allFuels: "All fuels",
    vehicles: "vehicles",
    noResultsTitle: "No results",
    noResultsText: "Try adjusting your search.",
  },
};

// Gedeelde opbouw van alle aanbodpagina's: kopbalk, zoek-/filterbalk en een raster met voertuigkaarten.
export default function VehicleListPage({ category, title, intro }: Props) {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("all");

  const categoryVehicles = inventory.filter((v) => category === "all" || v.category === category);

  // Brandstofopties: alleen de brandstoffen die in deze categorie voorkomen.
  const fuels = Array.from(new Set(categoryVehicles.map((v) => v.fuel)));

  const query = search.toLowerCase();
  const vehicles = categoryVehicles.filter((v) => {
    if (query && !`${v.make} ${v.model} ${v.year}`.toLowerCase().includes(query)) return false;
    if (fuelFilter !== "all" && v.fuel !== fuelFilter) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title={title[lang]} intro={intro[lang]} />

      {/* Zoek- en filterbalk */}
      <div className="border-b border-border bg-card py-4">
        {/* Responsive: op mobiel onder elkaar, vanaf sm naast elkaar met de teller rechts.
            Toegankelijkheid: role="search" maakt dit een herkenbaar zoekgebied voor screenreaders. */}
        <div role="search" className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          {/* Toegankelijkheid: visueel verborgen labels, want de velden hebben alleen een placeholder. */}
          <label className="sr-only" htmlFor="voertuig-zoeken">
            {t.searchLabel}
          </label>
          <input
            id="voertuig-zoeken"
            type="search"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field sm:w-72"
          />

          <label className="sr-only" htmlFor="brandstof-filter">
            {t.fuelLabel}
          </label>
          <select
            id="brandstof-filter"
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="field sm:w-auto cursor-pointer"
          >
            <option value="all">{t.allFuels}</option>
            {fuels.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>

          {/* Toegankelijkheid: aria-live laat screenreaders het nieuwe aantal voorlezen na het filteren. */}
          <p aria-live="polite" className="font-mono-label text-[11px] tracking-widest uppercase sm:ml-auto text-muted-foreground">
            {vehicles.length} {t.vehicles}
          </p>
        </div>
      </div>

      {/* Resultaten */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        {vehicles.length === 0 ? (
          <div className="py-20 px-6 text-center rounded-lg border border-dashed border-border text-muted-foreground">
            <p className="font-display text-2xl mb-2 text-foreground">{t.noResultsTitle}</p>
            <p className="text-sm">{t.noResultsText}</p>
          </div>
        ) : (
          // Responsive: 1 kolom op mobiel, 2 vanaf sm, 3 vanaf lg.
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
