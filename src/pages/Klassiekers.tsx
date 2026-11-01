import VehicleListPage from "../components/VehicleListPage";

export default function Klassiekers() {
  return (
    <VehicleListPage
      category="klassiek"
      title={{ nl: "Klassiekers & Motoren", en: "Classics & Motorcycles" }}
      intro={{
        nl: "Een bijzondere, wisselende selectie klassieke auto's en motoren voor de liefhebber.",
        en: "A special, ever-changing selection of classic cars and motorcycles for enthusiasts.",
      }}
    />
  );
}
