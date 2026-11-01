import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LangProvider } from "./context/LangContext";

// De taalprovider staat buiten de router, zodat de taal behouden blijft bij het wisselen van pagina.
export default function App() {
  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  );
}
