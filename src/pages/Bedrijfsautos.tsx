import VehicleListPage from "../components/VehicleListPage";

export default function Bedrijfsautos() {
  return (
    <VehicleListPage
      category="bedrijfs"
      title={{ nl: "Bedrijfsauto's", en: "Commercial Vehicles" }}
      intro={{
        nl: "Bestelwagens en transporters voor zzp'ers en bedrijven. Uit voorraad leverbaar.",
        en: "Vans and transporters for freelancers and businesses. Available from stock.",
      }}
    />
  );
}
