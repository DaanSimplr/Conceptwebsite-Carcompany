import VehicleListPage from "../components/VehicleListPage";

export default function Personenautos() {
  return (
    <VehicleListPage
      category="personen"
      title={{ nl: "Personenauto's", en: "Passenger Cars" }}
      intro={{
        nl: "Van zuinige stadsauto tot ruime gezinswagen — ons aanbod occasions voor particulieren.",
        en: "From compact city car to spacious family wagon — our used car stock for private buyers.",
      }}
    />
  );
}
