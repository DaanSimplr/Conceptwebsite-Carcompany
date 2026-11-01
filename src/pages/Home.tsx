import { Link } from "react-router";
import { useLang } from "../context/LangContext";
import { inventory, type Vehicle } from "../data/inventory";
import Eyebrow from "../components/Eyebrow";
import VehicleCard from "../components/VehicleCard";

// Naamgeving: "...Label" is het kleine label boven een kop, "...Title" de kop zelf.
const CONTENT = {
  nl: {
    heroTag: "Kopen · Huren · Leasen",
    heroImgLabel: "Voertuigen op het terrein van ons autobedrijf",
    // \n zorgt voor een vaste regelafbreking in de titel.
    heroTitle: "Uw betrouwbare\nautobedrijf",
    heroSub: "Voor de aan- en verkoop van personenauto's, bedrijfsauto's, klassiekers en motoren — en voor kortdurende verhuur en langlopende leasecontracten.",
    heroCta: "Bekijk ons aanbod",
    heroCtaSecondary: "Neem contact op",
    stats: {
      categories: "Categorieën",
      vehicles: "Voertuigen in aanbod",
      available: "Direct beschikbaar",
      rental: "Verhuur & lease",
    },
    aboutLabel: "Over ons",
    aboutTitle: "Welkom bij ons autobedrijf",
    aboutText: "Wij zijn uw partner voor alles op het gebied van mobiliteit. Of u nu op zoek bent naar een betrouwbare gezinsauto, een bedrijfswagen voor uw onderneming, een klassieke auto of motor voor de liefhebber — of gewoon een voertuig tijdelijk wilt huren of leasen — bij ons bent u aan het juiste adres. Wij staan voor persoonlijk advies, eerlijke prijzen en een breed aanbod.",
    aboutImgAlt: "Voertuigen bij ons autobedrijf",
    aboutCta: "Neem contact op",
    catsLabel: "Vier categorieën, één adres",
    catsTitle: "Ons aanbod",
    cats: [
      { icon: "🚗", title: "Personenauto's", desc: "Een ruim assortiment occasions voor particulieren.", to: "/personenautos", cta: "Bekijk personenauto's" },
      { icon: "🚐", title: "Bedrijfsauto's", desc: "Bestelwagens en transporters voor zzp en bedrijven.", to: "/bedrijfsautos", cta: "Bekijk bedrijfsauto's" },
      { icon: "🔑", title: "Verhuur & Leasing", desc: "Kortdurende verhuur en langlopende leasecontracten.", to: "/verhuur", cta: "Meer over verhuur & lease" },
      { icon: "🏍️", title: "Klassiekers & Motoren", desc: "Bijzondere selectie voor de echte liefhebber.", to: "/klassiekers", cta: "Bekijk klassiekers" },
    ],
    recentLabel: "Verse instroom",
    recentTitle: "Recent binnen",
    recentSub: "Een greep uit ons actuele aanbod",
    recentCta: "Bekijk al ons aanbod",
    classicsImgLabel: "Klassieke motor",
    classicsLabel: "Iets bijzonders",
    classicsTitle: "Klassiekers & Motoren",
    classicsText: "Naast onze reguliere voorraad bieden wij een wisselend aanbod van klassieke auto's en motoren. Voor de liefhebber die iets bijzonders zoekt.",
    classicsCta: "Bekijk het aanbod",
    whyLabel: "Onze kracht",
    whyTitle: "Waarom wij?",
    why: [
      { title: "Persoonlijk advies", desc: "Geen callcenter, maar direct contact met onze medewerkers." },
      { title: "Eerlijke prijzen", desc: "Transparante tarieven zonder verborgen kosten." },
      { title: "Breed aanbod", desc: "Van occasions tot klassiekers, van huur tot lease." },
      { title: "Alles onder één dak", desc: "Kopen, huren en leasen bij één vast aanspreekpunt." },
    ],
  },
  en: {
    heroTag: "Buy · Rent · Lease",
    heroImgLabel: "Vehicles on the premises of our car company",
    heroTitle: "Your trusted\ncar dealer",
    heroSub: "Buying and selling passenger cars, commercial vehicles, classics and motorcycles — plus short-term rental and long-term lease contracts.",
    heroCta: "View our stock",
    heroCtaSecondary: "Get in touch",
    stats: {
      categories: "Categories",
      vehicles: "Vehicles listed",
      available: "Available now",
      rental: "Rental & lease",
    },
    aboutLabel: "About us",
    aboutTitle: "Welcome to our car company",
    aboutText: "We are your partner for everything related to mobility. Whether you are looking for a reliable family car, a commercial vehicle for your business, a classic car or motorcycle — or simply want to rent or lease — we are the right address. We stand for personal advice, fair prices, and a wide range of vehicles.",
    aboutImgAlt: "Vehicles at our car company",
    aboutCta: "Get in touch",
    catsLabel: "Four categories, one address",
    catsTitle: "Our offer",
    cats: [
      { icon: "🚗", title: "Passenger Cars", desc: "A wide selection of used cars for private buyers.", to: "/personenautos", cta: "View passenger cars" },
      { icon: "🚐", title: "Commercial Vehicles", desc: "Vans and transporters for freelancers and businesses.", to: "/bedrijfsautos", cta: "View commercial vehicles" },
      { icon: "🔑", title: "Rental & Leasing", desc: "Short-term rental and long-term lease contracts.", to: "/verhuur", cta: "Learn about rental & lease" },
      { icon: "🏍️", title: "Classics & Motorcycles", desc: "Special selection for the true enthusiast.", to: "/klassiekers", cta: "View classics" },
    ],
    recentLabel: "Fresh stock",
    recentTitle: "Recently added",
    recentSub: "A selection from our current stock",
    recentCta: "View all vehicles",
    classicsImgLabel: "Classic motorcycle",
    classicsLabel: "Something special",
    classicsTitle: "Classics & Motorcycles",
    classicsText: "Alongside our regular stock we offer a changing selection of classic cars and motorcycles for the true enthusiast.",
    classicsCta: "View stock",
    whyLabel: "Our strength",
    whyTitle: "Why choose us?",
    why: [
      { title: "Personal advice", desc: "No call centre — direct contact with our staff." },
      { title: "Fair prices", desc: "Transparent rates without hidden costs." },
      { title: "Wide range", desc: "From used cars to classics, from hire to lease." },
      { title: "All under one roof", desc: "Buy, rent and lease with one point of contact." },
    ],
  },
};

// Foto per categoriekaart, op basis van de link van die kaart.
const CATEGORY_IMAGES: Record<string, string> = {
  "/personenautos": "https://images.unsplash.com/photo-1574023278981-0b48ba10e9ba?w=640&h=400&fit=crop&auto=format",
  "/bedrijfsautos": "https://images.unsplash.com/photo-1587813369290-091c9d432daf?w=640&h=400&fit=crop&auto=format",
  "/verhuur": "https://images.unsplash.com/photo-1615563868638-98253a7dc33b?w=640&h=400&fit=crop&auto=format",
  "/klassiekers": "https://images.unsplash.com/photo-1609202748711-feef2cdc7da3?w=640&h=400&fit=crop&auto=format",
};

// Categorieën waaruit de "Recent binnen"-sectie telkens één beschikbaar voertuig toont.
const SAMPLE_CATEGORIES: Vehicle["category"][] = ["personen", "bedrijfs", "klassiek"];

export default function Home() {
  const { lang } = useLang();
  const t = CONTENT[lang];

  const samples = SAMPLE_CATEGORIES.map((category) =>
    inventory.find((v) => v.category === category && v.status === "beschikbaar"),
  ).filter((v): v is Vehicle => v !== undefined);

  // Kerncijfers afgeleid uit de bestaande voorraaddata (geen verzonnen getallen).
  const stats = [
    { num: t.cats.length, label: t.stats.categories },
    { num: inventory.length, label: t.stats.vehicles },
    { num: inventory.filter((v) => v.status === "beschikbaar").length, label: t.stats.available },
    { num: inventory.filter((v) => v.category === "verhuur").length, label: t.stats.rental },
  ];

  return (
    <>
      {/* ── Hero ── */}
      {/* Toegankelijkheid: donkere achtergrondkleur onder de foto, zodat het contrast goed blijft
          als de foto niet laadt (en tools als WAVE het kunnen meten). */}
      <section className="on-dark relative overflow-hidden bg-[#1a2f4d]">
        {/* Toegankelijkheid: achtergrondfoto met role="img" en een label, zodat screenreaders weten wat erop staat. */}
        <div
          role="img"
          aria-label={t.heroImgLabel}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1574023240744-64c47c8c0676?w=1600&h=700&fit=crop&auto=format)",
            filter: "brightness(0.45)",
          }}
        />
        {/* Blauwe kleurverloop over de foto */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, rgba(37,99,168,0.8) 0%, rgba(26,32,48,0.45) 100%)" }}
        />
        {/* Responsive: de hero wordt hoger en de titel groter naarmate het scherm breder wordt. */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block font-mono-label text-[10px] tracking-[0.25em] uppercase px-3 py-1 mb-6 rounded-sm border border-white/30 bg-white/15 text-white">
              {t.heroTag}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5 text-white whitespace-pre-line">
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8 text-white/90">{t.heroSub}</p>
            {/* Responsive: knoppen onder elkaar op mobiel, naast elkaar vanaf sm. */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/voertuigen" className="btn btn-primary">
                {t.heroCta}
              </Link>
              <Link to="/contact" className="btn btn-ghost-light">
                {t.heroCtaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Kerncijfers ── */}
      <div className="border-b border-border bg-secondary">
        {/* Toegankelijkheid: een <dl> koppelt elk getal (dd) aan zijn omschrijving (dt).
            flex-col-reverse zet het getal visueel boven het label, terwijl de leesvolgorde label → getal blijft. */}
        <dl className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                "flex flex-col-reverse items-center justify-center py-6 text-center border-border",
                // Responsive: scheidingslijnen voor een 2×2-raster op mobiel en één rij van vier vanaf md.
                // Rechterrand: altijd na item 1 en 3, na item 2 alleen vanaf md (dan staat 3 ernaast).
                i % 2 === 0 ? "border-r" : i === 1 ? "md:border-r" : "",
                // Onderrand: alleen onder de bovenste rij van het 2×2-raster.
                i < 2 ? "border-b md:border-b-0" : "",
              ].join(" ")}
            >
              <dt className="font-mono-label text-[10px] tracking-widest uppercase mt-1 text-muted-foreground">{stat.label}</dt>
              <dd className="font-display text-2xl font-bold text-primary">{stat.num}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Over ons ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Responsive: tekst en foto onder elkaar op mobiel, naast elkaar vanaf md. */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <Eyebrow>{t.aboutLabel}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-4">{t.aboutTitle}</h2>
            <p className="text-base leading-relaxed text-secondary-foreground">{t.aboutText}</p>
            <Link to="/contact" className="btn btn-primary mt-6">
              {t.aboutCta}
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-border shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1574023278981-0b48ba10e9ba?w=800&h=500&fit=crop&auto=format"
              alt={t.aboutImgAlt}
              loading="lazy"
              className="w-full aspect-[16/10] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Categorieën ── */}
      <section className="py-16 md:py-20 border-t border-border bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow>{t.catsLabel}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.catsTitle}</h2>
          </div>
          {/* Responsive: 1 kolom op mobiel, 2 vanaf sm, 4 vanaf lg. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.cats.map((cat) => (
              // De hele kaart is één link; de tekst erin vormt de linknaam.
              <Link
                key={cat.to}
                to={cat.to}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  {/* Toegankelijkheid: lege alt, want de foto is decoratief en de kaarttitel beschrijft de link al. */}
                  <img
                    src={CATEGORY_IMAGES[cat.to]}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(37,99,168,0.4) 0%, transparent 60%)" }}
                  />
                  <span aria-hidden="true" className="absolute bottom-3 left-3 text-2xl">
                    {cat.icon}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display text-lg font-semibold mb-2">{cat.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 text-secondary-foreground">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-primary">
                    {cat.cta}
                    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent binnen ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Responsive: knop onder de kop op mobiel, rechts ernaast vanaf sm. */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <Eyebrow>{t.recentLabel}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.recentTitle}</h2>
            <p className="text-sm mt-1 text-muted-foreground">{t.recentSub}</p>
          </div>
          <Link to="/voertuigen" className="btn btn-outline shrink-0 self-start sm:self-auto">
            {t.recentCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        {/* Responsive: 1 kolom op mobiel, 2 vanaf sm, 3 vanaf lg. */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
      </section>

      {/* ── Klassiekers-banner ── */}
      {/* Toegankelijkheid: zelfde donkere fallbackkleur als de hero. */}
      <section className="on-dark relative py-16 md:py-20 overflow-hidden bg-[#1a2f4d]">
        <div
          role="img"
          aria-label={t.classicsImgLabel}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1532895215727-c006c8fdf560?w=1600&h=600&fit=crop&auto=format)",
            filter: "brightness(0.3) saturate(0.5)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, rgba(37,99,168,0.85) 0%, rgba(37,99,168,0.5) 100%)" }}
        />
        {/* Responsive: knop onder de tekst op mobiel, rechts ernaast vanaf md. */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="text-white max-w-xl">
            <Eyebrow onDark>{t.classicsLabel}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-3">{t.classicsTitle}</h2>
            <p className="text-base leading-relaxed text-white/90">{t.classicsText}</p>
          </div>
          <Link to="/klassiekers" className="btn btn-light shrink-0 self-start md:self-auto px-8">
            {t.classicsCta}
          </Link>
        </div>
      </section>

      {/* ── Waarom wij ── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow>{t.whyLabel}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.whyTitle}</h2>
          </div>
          {/* Responsive: 1 kolom op mobiel, 2 vanaf sm, 4 vanaf lg. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.map((item) => (
              <div key={item.title} className="p-6 rounded-lg border border-border bg-secondary">
                <div
                  aria-hidden="true"
                  className="w-9 h-9 flex items-center justify-center rounded-md bg-primary text-white font-bold text-sm mb-4"
                >
                  ✓
                </div>
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed text-secondary-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
