@AGENTS.md

# Autobedrijf / Car Company (fictief)

## Project

Nederlandstalige conceptwebsite voor een fictief autobedrijf.

- Bedrijfsnaam staat centraal in `src/data/company.ts`, per taal: "Autobedrijf"
  (NL) en "Car Company" (EN). Gebruik die in plaats van de naam hard te coderen.
  In lopende tekst: "ons autobedrijf" / "our car company".
- Het bedrijf heeft bewust geen adres, plaats, telefoonnummer of
  openingstijden. Voeg die niet toe.

## Techniek

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- React Router
- Gebruik de bestaande projectstructuur en componentpatronen.
- Start geen developmentserver; die draait al.
- Exporteer componenten als default exports.

## Pagina’s

De website omvat:

- Home
- Alle voertuigen
- Personenauto’s
- Bedrijfsauto’s
- Verhuur & leasing
- Klassiekers & motoren
- Contact

De bestaande bestanden staan in:

- `src/pages/`
- `src/components/Layout.tsx`
- `src/data/inventory.ts`
- `src/data/company.ts`
- `src/routes.tsx`

## Vormgeving

- Lichte, professionele en toegankelijke uitstraling
- Primaire kleur: `#2563a8`
- Secundaire kleur: `#ddeaf7`
- Muted kleur: `#e8f1fa`
- Koppen: Playfair Display
- Bodytekst: Outfit
- Gebruik consistente witruimte, afgeronde kaarten en duidelijke CTA’s.
- Behoud de bestaande visuele taal.
- Maak alle schermen responsive en toegankelijk.

## Taal en inhoud

- Alle zichtbare tekst is standaard Nederlands.
- Er is een NL/EN-taalschakelaar.
- Noem geen locatie of contactgegevens.
- Verzin geen voertuigen, prijzen, openingstijden of bedrijfsgegevens.
- Gebruik bestaande data uit `src/data/inventory.ts`.

## Navigatie

- Gebruik React Router.
- Er mag steeds maar één navigatietab actief zijn.
- Home staat niet in het menu; het logo linkt naar de homepage.
- Geen aparte balk boven de header; de taalschakelaar zit in de header.
- Behoud bestaande routes en werkende navigatie tenzij een wijziging expliciet
  is gevraagd.

## Werkwijze

- Inspecteer relevante bestaande bestanden voordat je wijzigingen maakt.
- Behoud werkende functionaliteit en wijzigingen van anderen.
- Maak kleine, gerichte wijzigingen.
- Voer na brede wijzigingen de relevante build- of typecheck uit.