import VehicleListPage from "../components/VehicleListPage";

export default function AlleVoertuigen() {
  return (
    <VehicleListPage
      category="all"
      titleNl="Alle Voertuigen"
      titleEn="All Vehicles"
      descNl="Ons complete aanbod: personenauto's, bedrijfsauto's, verhuur en klassiekers."
      descEn="Our complete stock: passenger cars, commercial vehicles, rental and classics."
    />
  );
}
