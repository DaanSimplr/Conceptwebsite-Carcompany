import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AlleVoertuigen from "./pages/AlleVoertuigen";
import Personenautos from "./pages/Personenautos";
import Bedrijfsautos from "./pages/Bedrijfsautos";
import Verhuur from "./pages/Verhuur";
import Klassiekers from "./pages/Klassiekers";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "voertuigen", Component: AlleVoertuigen },
      { path: "personenautos", Component: Personenautos },
      { path: "bedrijfsautos", Component: Bedrijfsautos },
      { path: "verhuur", Component: Verhuur },
      { path: "klassiekers", Component: Klassiekers },
      { path: "contact", Component: Contact },
    ],
  },
], {
  // "/" lokaal, "/Conceptwebsite-Carcompany" op GitHub Pages
  basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
});
