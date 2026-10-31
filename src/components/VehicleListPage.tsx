import { useState } from "react";
import { inventory, type Vehicle } from "../data/inventory";
import VehicleCard from "./VehicleCard";
import { useLang } from "../context/LangContext";

type Props = {
  category?: Vehicle["category"] | "all";
  titleNl: string;
  titleEn: string;
  descNl: string;
  descEn: string;
};

export default function VehicleListPage({ category = "all", titleNl, titleEn, descNl, descEn }: Props) {
  const { lang } = useLang();
  const [search, setSearch] = useState("");
  const [fuelFilter, setFuelFilter] = useState("all");

  const vehicles = inventory.filter((v) => {
    if (category !== "all" && v.category !== category) return false;
    const q = search.toLowerCase();
    if (q && !`${v.make} ${v.model} ${v.year}`.toLowerCase().includes(q)) return false;
    if (fuelFilter !== "all" && v.fuel !== fuelFilter) return false;
    return true;
  });

  const fuels = Array.from(new Set(
    inventory
      .filter((v) => category === "all" || v.category === category)
      .map((v) => v.fuel)
  ));

  return (
    <div>
      {/* Page header */}
      <div
        className="border-b py-10 md:py-14"
        style={{ backgroundColor: "var(--secondary)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="font-display text-3xl md:text-4xl font-semibold mb-2">
            {lang === "nl" ? titleNl : titleEn}
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "var(--secondary-foreground)" }}>
            {lang === "nl" ? descNl : descEn}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b py-4" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <div role="search" className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
          <label className="sr-only" htmlFor="voertuig-zoeken">
            {lang === "nl" ? "Zoeken op merk, model of bouwjaar" : "Search by make, model or year"}
          </label>
          <input
            id="voertuig-zoeken"
            type="search"
            placeholder={lang === "nl" ? "Zoeken op merk, model…" : "Search by make, model…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field sm:w-72"
          />

          <label className="sr-only" htmlFor="brandstof-filter">
            {lang === "nl" ? "Filter op brandstof" : "Filter by fuel"}
          </label>
          <select
            id="brandstof-filter"
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="field sm:w-auto cursor-pointer"
          >
            <option value="all">{lang === "nl" ? "Alle brandstoffen" : "All fuels"}</option>
            {fuels.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>

          <p
            aria-live="polite"
            className="font-mono-label text-[11px] tracking-widest uppercase sm:ml-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            {vehicles.length} {lang === "nl" ? "voertuigen" : "vehicles"}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        {vehicles.length === 0 ? (
          <div className="py-20 px-6 text-center rounded-lg border border-dashed" style={{ color: "var(--muted-foreground)", borderColor: "var(--border)" }}>
            <p className="font-display text-2xl mb-2" style={{ color: "var(--foreground)" }}>{lang === "nl" ? "Geen resultaten" : "No results"}</p>
            <p className="text-sm">{lang === "nl" ? "Pas uw zoekopdracht aan." : "Try adjusting your search."}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
          </div>
        )}
      </div>
    </div>
  );
}
