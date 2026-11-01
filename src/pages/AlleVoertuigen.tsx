import VehicleListPage from "../components/VehicleListPage";

export default function AlleVoertuigen() {
  return (
    <VehicleListPage
      category="all"
      title={{ nl: "Alle Voertuigen", en: "All Vehicles" }}
      intro={{
        nl: "Ons complete aanbod: personenauto's, bedrijfsauto's, verhuur en klassiekers.",
        en: "Our complete stock: passenger cars, commercial vehicles, rental and classics.",
      }}
    />
  );
}
