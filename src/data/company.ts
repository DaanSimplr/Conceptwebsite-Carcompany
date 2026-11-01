import type { Localized } from "../context/LangContext";

// Fictief bedrijf — pas de naam hier aan om de hele site te hernoemen.
// Vergeet ook de titel en beschrijving in index.html niet.
export const company: { name: Localized; initial: Localized } = {
  name: { nl: "Autobedrijf", en: "Car Company" },
  // Letter in het logoblokje in de header en footer.
  initial: { nl: "A", en: "C" },
};
