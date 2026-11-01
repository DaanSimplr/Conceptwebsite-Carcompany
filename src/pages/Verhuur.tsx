import VehicleListPage from "../components/VehicleListPage";

export default function Verhuur() {
  return (
    <VehicleListPage
      category="verhuur"
      title={{ nl: "Verhuur & Leasing", en: "Rental & Leasing" }}
      intro={{
        nl: "Kortdurende verhuur voor een weekend of vakantie, en langlopende leasecontracten op maat.",
        en: "Short-term rental for a weekend or holiday, and tailored long-term lease contracts.",
      }}
    />
  );
}
