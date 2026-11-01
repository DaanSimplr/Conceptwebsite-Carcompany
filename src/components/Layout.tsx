import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useLang, type Lang } from "../context/LangContext";
import { company } from "../data/company";

// Menu-items voor de header (desktop en mobiel) en de footer.
// Home staat niet in het menu: het logo linkt naar de homepage.
const NAV = {
  nl: [
    { label: "Alle Voertuigen", to: "/voertuigen" },
    { label: "Personenauto's", to: "/personenautos" },
    { label: "Bedrijfsauto's", to: "/bedrijfsautos" },
    { label: "Verhuur & Leasing", to: "/verhuur" },
    { label: "Klassiekers & Motoren", to: "/klassiekers" },
    { label: "Contact", to: "/contact" },
  ],
  en: [
    { label: "All Vehicles", to: "/voertuigen" },
    { label: "Passenger Cars", to: "/personenautos" },
    { label: "Commercial Vehicles", to: "/bedrijfsautos" },
    { label: "Rental & Leasing", to: "/verhuur" },
    { label: "Classics & Motorcycles", to: "/klassiekers" },
    { label: "Contact", to: "/contact" },
  ],
};

const CONTENT = {
  nl: {
    skip: "Naar de inhoud",
    mainNav: "Hoofdnavigatie",
    footerNav: "Footernavigatie",
    menuOpen: "Menu openen",
    menuClose: "Menu sluiten",
    langGroup: "Taal kiezen",
    logoSub: "Occasions & lease",
    homeLabel: "naar de homepage",
    tagline: "Kopen, huren en leasen bij één vertrouwd adres.",
    footerHeading: "Aanbod",
    demo: "Conceptwebsite van een fictief autobedrijf.",
  },
  en: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    footerNav: "Footer navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    langGroup: "Choose language",
    logoSub: "Used cars & lease",
    homeLabel: "go to homepage",
    tagline: "Buy, rent and lease at one trusted address.",
    footerHeading: "Browse",
    demo: "Concept website for a fictional car dealer.",
  },
};

// Volledige taalnamen; de knoppen tonen alleen de afkorting (NL/EN).
const LANG_NAMES: Record<Lang, string> = { nl: "Nederlands", en: "English" };
const LANGS: Lang[] = ["nl", "en"];

// Taalschakelaar met een knop per taal; de actieve knop lijkt "ingedrukt".
function LangSwitch() {
  const { lang, setLang } = useLang();

  return (
    // Toegankelijkheid: role="group" met label bundelt de knoppen als één bedieningselement.
    <div role="group" aria-label={CONTENT[lang].langGroup} className="flex p-0.5 rounded-md bg-muted">
      {LANGS.map((option) => {
        const active = lang === option;
        return (
          // Toegankelijkheid: aria-pressed geeft aan welke taal actief is,
          // aria-label laat de volledige taalnaam voorlezen in plaats van "N L".
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={active}
            aria-label={LANG_NAMES[option]}
            className={`min-w-9 px-2.5 py-1.5 rounded-sm font-mono-label text-[11px] tracking-widest uppercase transition-colors duration-150 ${
              active ? "bg-card text-primary font-semibold shadow-[0_1px_2px_rgba(26,32,48,0.12)]" : "text-muted-foreground font-normal"
            }`}
          >
            {option.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

// Hamburgericoon, of een kruisje als het menu open is.
function MenuIcon({ open }: { open: boolean }) {
  const line = { stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" } as const;

  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="3" y1="1" x2="19" y2="15" {...line} />
          <line x1="19" y1="1" x2="3" y2="15" {...line} />
        </>
      ) : (
        <>
          <line x1="1" y1="1" x2="21" y2="1" {...line} />
          <line x1="1" y1="8" x2="21" y2="8" {...line} />
          <line x1="1" y1="15" x2="21" y2="15" {...line} />
        </>
      )}
    </svg>
  );
}

// Vaste paginaopbouw: header met navigatie, de huidige pagina (<Outlet />) en de footer.
export default function Layout() {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const nav = NAV[lang];
  const t = CONTENT[lang];

  // Sluit het mobiele menu en scroll naar boven bij een routewissel.
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    // min-h-screen + flex-1 op <main> houdt de footer onderaan, ook op korte pagina's.
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Toegankelijkheid: skiplink, alleen zichtbaar bij toetsenbordfocus, om de navigatie over te slaan. */}
      <a href="#inhoud" className="skip-link">
        {t.skip}
      </a>

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 h-[72px]">
          {/* Logo, linkt naar de homepage */}
          <Link to="/" className="flex items-center gap-3 rounded-md shrink-0">
            <div
              aria-hidden="true"
              className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-white font-display font-bold text-xl"
            >
              {company.initial[lang]}
            </div>
            <div>
              {/* Responsive: iets kleinere bedrijfsnaam op mobiel. */}
              <div className="font-display font-semibold text-base sm:text-lg leading-tight text-foreground">
                {company.name[lang]}
                {/* Toegankelijkheid: vertelt screenreaders waar de logolink naartoe gaat. */}
                <span className="sr-only"> — {t.homeLabel}</span>
              </div>
              <div className="font-mono-label text-[10px] tracking-widest uppercase text-muted-foreground">{t.logoSub}</div>
            </div>
          </Link>

          {/* Responsive: desktopnavigatie, alleen vanaf xl (daaronder past het menu niet naast het logo). */}
          <nav aria-label={t.mainNav} className="hidden xl:flex items-center">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-3 text-sm font-medium whitespace-nowrap nav-link${isActive ? " nav-link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {/* Responsive: taalschakelaar in de header vanaf sm; op kleinere schermen staat hij in het mobiele menu. */}
            <div className="hidden sm:block">
              <LangSwitch />
            </div>

            {/* Responsive: menuknop alleen onder xl.
                Toegankelijkheid: aria-expanded en aria-controls koppelen de knop aan het menu,
                en de knop is 44×44px (w-11 h-11), groot genoeg om met een vinger te raken. */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobiel-menu"
              aria-label={menuOpen ? t.menuClose : t.menuOpen}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-md text-foreground transition-colors duration-150 hover:bg-muted"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Responsive: uitklapmenu voor schermen smaller dan xl. Scrollt zelf als het hoger is dan het scherm. */}
        {menuOpen && (
          <nav
            id="mobiel-menu"
            aria-label={t.mainNav}
            className="xl:hidden border-t border-border bg-card py-2 max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `mobile-nav-link${isActive ? " mobile-nav-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="sm:hidden px-6 pt-4 pb-2">
              <LangSwitch />
            </div>
          </nav>
        )}
      </header>

      {/* ── Pagina-inhoud ── */}
      {/* Toegankelijkheid: doel van de skiplink. tabIndex={-1} maakt <main> focusbaar zonder dat hij in de tabvolgorde komt. */}
      <main id="inhoud" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      {/* .on-dark maakt de focusrand wit, zodat die zichtbaar blijft op de blauwe achtergrond. */}
      <footer className="on-dark bg-primary">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          {/* Responsive: tagline en links onder elkaar op mobiel, naast elkaar vanaf md. */}
          <div className="grid gap-10 md:grid-cols-[1fr_auto]">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-white text-primary font-display font-bold text-lg"
                >
                  {company.initial[lang]}
                </div>
                <p className="font-display font-semibold text-lg text-white">{company.name[lang]}</p>
              </div>
              <p className="text-sm leading-relaxed mt-3 text-white/90">{t.tagline}</p>
            </div>

            <nav aria-label={t.footerNav}>
              <p className="font-mono-label text-[10px] tracking-widest uppercase mb-3 text-white/90">{t.footerHeading}</p>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-white/90 hover:text-white hover:underline underline-offset-4 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Responsive: copyright en disclaimer onder elkaar op mobiel, naast elkaar vanaf sm. */}
          <div className="mt-10 pt-6 border-t border-white/20 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/90">
            <p>
              © {new Date().getFullYear()} {company.name[lang]}
            </p>
            <p>{t.demo}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
