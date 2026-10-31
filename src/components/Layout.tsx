import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { useLang, type Lang } from "../context/LangContext";
import { company } from "../data/company";

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

const UI = {
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

const LANG_NAMES: Record<Lang, string> = { nl: "Nederlands", en: "English" };

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label={UI[lang].langGroup}
      className="flex p-0.5 rounded-md"
      style={{ backgroundColor: "var(--muted)" }}
    >
      {(["nl", "en"] as Lang[]).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            aria-label={LANG_NAMES[l]}
            className="min-w-9 px-2.5 py-1.5 rounded-sm font-mono-label text-[11px] tracking-widest uppercase transition-colors duration-150"
            style={{
              backgroundColor: active ? "var(--card)" : "transparent",
              color: active ? "var(--primary)" : "var(--muted-foreground)",
              fontWeight: active ? 600 : 400,
              boxShadow: active ? "0 1px 2px rgba(26,32,48,0.12)" : "none",
            }}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export default function Layout() {
  const { lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const nav = NAV[lang];
  const ui = UI[lang];

  // sluit het mobiele menu en scroll naar boven bij een routewissel
  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div style={{ backgroundColor: "var(--background)", color: "var(--foreground)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <a href="#inhoud" className="skip-link">{ui.skip}</a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: "rgba(255,255,255,0.95)", borderColor: "var(--border)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6 h-[72px]">
          <Link to="/" className="flex items-center gap-3 rounded-md shrink-0">
            <div
              aria-hidden="true"
              className="w-10 h-10 flex items-center justify-center font-display font-bold text-xl rounded-md"
              style={{ backgroundColor: "var(--primary)", color: "white" }}
            >
              {company.initial[lang]}
            </div>
            <div>
              <div className="font-display font-semibold text-base sm:text-lg leading-tight" style={{ color: "var(--foreground)" }}>
                {company.name[lang]}
                <span className="sr-only"> — {ui.homeLabel}</span>
              </div>
              <div className="font-mono-label text-[10px] tracking-widest uppercase" style={{ color: "var(--muted-foreground)" }}>
                {ui.logoSub}
              </div>
            </div>
          </Link>

          <nav aria-label={ui.mainNav} className="hidden xl:flex items-center">
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
            <div className="hidden sm:block">
              <LangSwitch />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobiel-menu"
              aria-label={menuOpen ? ui.menuClose : ui.menuOpen}
              className="xl:hidden w-11 h-11 flex items-center justify-center rounded-md transition-colors duration-150 hover:bg-[var(--muted)]"
              style={{ color: "var(--foreground)" }}
            >
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                {menuOpen ? (
                  <>
                    <line x1="3" y1="1" x2="19" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="19" y1="1" x2="3" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="1" y1="1" x2="21" y2="1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="1" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <line x1="1" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobiel-menu"
            aria-label={ui.mainNav}
            className="xl:hidden border-t py-2 max-h-[calc(100vh-72px)] overflow-y-auto"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
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

      {/* Page content */}
      <main id="inhoud" tabIndex={-1} style={{ flex: 1 }} className="focus:outline-none">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="on-dark" style={{ backgroundColor: "var(--primary)" }}>
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
          <div className="grid gap-10 md:grid-cols-[1fr_auto]">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="w-9 h-9 flex items-center justify-center font-display font-bold text-lg rounded-md"
                  style={{ backgroundColor: "white", color: "var(--primary)" }}
                >
                  {company.initial[lang]}
                </div>
                <p className="font-display font-semibold text-lg text-white">{company.name[lang]}</p>
              </div>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.9)" }}>
                {ui.tagline}
              </p>
            </div>

            <nav aria-label={ui.footerNav}>
              <p className="font-mono-label text-[10px] tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>
                {ui.footerHeading}
              </p>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-2">
                {nav.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-white/90 hover:text-white hover:underline underline-offset-4 transition-colors duration-150">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row justify-between gap-2 text-xs" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)" }}>
            <p>© {new Date().getFullYear()} {company.name[lang]}</p>
            <p>{ui.demo}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
