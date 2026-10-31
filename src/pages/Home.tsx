import { Link } from "react-router";
import { useLang } from "../context/LangContext";
import { inventory } from "../data/inventory";
import VehicleCard from "../components/VehicleCard";

const CONTENT = {
  nl: {
    heroTag: "Kopen · Huren · Leasen",
    heroImgLabel: "Voertuigen op het terrein van ons autobedrijf",
    bannerImgLabel: "Klassieke motor",
    heroTitle: "Uw betrouwbare\nautobedrijf",
    heroSub: "Voor de aan- en verkoop van personenauto's, bedrijfsauto's, klassiekers en motoren — en voor kortdurende verhuur en langlopende leasecontracten.",
    heroCta: "Bekijk ons aanbod",
    heroCtaSecondary: "Neem contact op",
    aboutLabel: "Over ons",
    aboutTitle: "Welkom bij ons autobedrijf",
    aboutText: "Wij zijn uw partner voor alles op het gebied van mobiliteit. Of u nu op zoek bent naar een betrouwbare gezinsauto, een bedrijfswagen voor uw onderneming, een klassieke auto of motor voor de liefhebber — of gewoon een voertuig tijdelijk wilt huren of leasen — bij ons bent u aan het juiste adres. Wij staan voor persoonlijk advies, eerlijke prijzen en een breed aanbod.",
    aboutCta: "Neem contact op",
    catsLabel: "Ons aanbod",
    catsSub: "Vier categorieën, één adres",
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
    klassiekerLabel: "Iets bijzonders",
    klassiekerTitle: "Klassiekers & Motoren",
    klassiekerText: "Naast onze reguliere voorraad bieden wij een wisselend aanbod van klassieke auto's en motoren. Voor de liefhebber die iets bijzonders zoekt.",
    klassiekerCta: "Bekijk het aanbod",
    whyLabel: "Onze kracht",
    whyTitle: "Waarom wij?",
    why: [
      { icon: "✓", title: "Persoonlijk advies", desc: "Geen callcenter, maar direct contact met onze medewerkers." },
      { icon: "✓", title: "Eerlijke prijzen", desc: "Transparante tarieven zonder verborgen kosten." },
      { icon: "✓", title: "Breed aanbod", desc: "Van occasions tot klassiekers, van huur tot lease." },
      { icon: "✓", title: "Alles onder één dak", desc: "Kopen, huren en leasen bij één vast aanspreekpunt." },
    ],
  },
  en: {
    heroTag: "Buy · Rent · Lease",
    heroImgLabel: "Vehicles on the premises of our car company",
    bannerImgLabel: "Classic motorcycle",
    heroTitle: "Your trusted\ncar dealer",
    heroSub: "Buying and selling passenger cars, commercial vehicles, classics and motorcycles — plus short-term rental and long-term lease contracts.",
    heroCta: "View our stock",
    heroCtaSecondary: "Get in touch",
    aboutLabel: "About us",
    aboutTitle: "Welcome to our car company",
    aboutText: "We are your partner for everything related to mobility. Whether you are looking for a reliable family car, a commercial vehicle for your business, a classic car or motorcycle — or simply want to rent or lease — we are the right address. We stand for personal advice, fair prices, and a wide range of vehicles.",
    aboutCta: "Get in touch",
    catsLabel: "Our offer",
    catsSub: "Four categories, one address",
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
    klassiekerLabel: "Something special",
    klassiekerTitle: "Classics & Motorcycles",
    klassiekerText: "Alongside our regular stock we offer a changing selection of classic cars and motorcycles for the true enthusiast.",
    klassiekerCta: "View stock",
    whyLabel: "Our strength",
    whyTitle: "Why choose us?",
    why: [
      { icon: "✓", title: "Personal advice", desc: "No call centre — direct contact with our staff." },
      { icon: "✓", title: "Fair prices", desc: "Transparent rates without hidden costs." },
      { icon: "✓", title: "Wide range", desc: "From used cars to classics, from hire to lease." },
      { icon: "✓", title: "All under one roof", desc: "Buy, rent and lease with one point of contact." },
    ],
  },
};

const CAT_IMGS = [
  "https://images.unsplash.com/photo-1574023278981-0b48ba10e9ba?w=640&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1587813369290-091c9d432daf?w=640&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1615563868638-98253a7dc33b?w=640&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1609202748711-feef2cdc7da3?w=640&h=400&fit=crop&auto=format",
];

export default function Home() {
  const { lang } = useLang();
  const t = CONTENT[lang];

  // pick 3 sample cars for homepage: one from each of personen/bedrijfs/klassiek
  const samples = [
    inventory.find((v) => v.category === "personen" && v.status === "beschikbaar"),
    inventory.find((v) => v.category === "bedrijfs" && v.status === "beschikbaar"),
    inventory.find((v) => v.category === "klassiek" && v.status === "beschikbaar"),
  ].filter(Boolean) as typeof inventory;

  // kerncijfers afgeleid uit de bestaande voorraaddata (geen verzonnen getallen)
  const stats = [
    { num: "4", label: lang === "nl" ? "Categorieën" : "Categories" },
    { num: String(inventory.length), label: lang === "nl" ? "Voertuigen in aanbod" : "Vehicles listed" },
    { num: String(inventory.filter((v) => v.status === "beschikbaar").length), label: lang === "nl" ? "Direct beschikbaar" : "Available now" },
    { num: String(inventory.filter((v) => v.category === "verhuur").length), label: lang === "nl" ? "Verhuur & lease" : "Rental & lease" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      {/* donkere achtergrondkleur onder de foto: contrast blijft goed als de foto niet laadt (en WAVE kan het meten) */}
      <section className="on-dark relative overflow-hidden" style={{ backgroundColor: "#1a2f4d" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1574023240744-64c47c8c0676?w=1600&h=700&fit=crop&auto=format)",
            filter: "brightness(0.45)",
          }}
          role="img"
          aria-label={t.heroImgLabel}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, rgba(37,99,168,0.8) 0%, rgba(26,32,48,0.45) 100%)" }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-24 md:py-36">
          <div className="max-w-2xl">
            <span
              className="inline-block font-mono-label text-[10px] tracking-[0.25em] uppercase px-3 py-1 mb-6 rounded-sm"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              {t.heroTag}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-5 text-white" style={{ whiteSpace: "pre-line" }}>
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.9)" }}>
              {t.heroSub}
            </p>
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

      {/* ── Stats ── */}
      <div className="border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--secondary)" }}>
        <dl className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col-reverse items-center justify-center py-6 text-center border-[var(--border)]",
                // mobiel 2×2-raster, vanaf md één rij van vier
                i % 2 === 0 ? "border-r" : i === 1 ? "md:border-r" : "",
                i < 2 ? "border-b md:border-b-0" : "",
              ].join(" ")}
            >
              <dt className="font-mono-label text-[10px] tracking-widest uppercase mt-1" style={{ color: "var(--muted-foreground)" }}>{s.label}</dt>
              <dd className="font-display text-2xl font-bold" style={{ color: "var(--primary)" }}>{s.num}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Over ons ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <span className="font-mono-label text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--primary)" }}>{t.aboutLabel}</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-4">{t.aboutTitle}</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--secondary-foreground)" }}>{t.aboutText}</p>
            <Link to="/contact" className="btn btn-primary mt-6">
              {t.aboutCta}
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border shadow-sm" style={{ borderColor: "var(--border)" }}>
            <img
              src="https://images.unsplash.com/photo-1574023278981-0b48ba10e9ba?w=800&h=500&fit=crop&auto=format"
              alt={lang === "nl" ? "Voertuigen bij ons autobedrijf" : "Vehicles at our car company"}
              loading="lazy"
              className="w-full object-cover"
              style={{ aspectRatio: "16/10" }}
            />
          </div>
        </div>
      </section>

      {/* ── Categorieën ── */}
      <section className="py-16 md:py-20 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--muted)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-mono-label text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--primary)" }}>{t.catsSub}</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.catsLabel}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.cats.map((cat, i) => (
              <Link
                key={cat.to}
                to={cat.to}
                className="group flex flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", textDecoration: "none", color: "inherit" }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/10", backgroundColor: "var(--secondary)" }}>
                  <img src={CAT_IMGS[i]} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(37,99,168,0.4) 0%, transparent 60%)" }} />
                  <span aria-hidden="true" className="absolute bottom-3 left-3 text-2xl">{cat.icon}</span>
                </div>
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="font-display text-lg font-semibold mb-2">{cat.title}</h3>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--secondary-foreground)" }}>{cat.desc}</p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: "var(--primary)" }}>
                    {cat.cta}
                    <span aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent aanbod ── */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-mono-label text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--primary)" }}>{t.recentLabel}</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.recentTitle}</h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{t.recentSub}</p>
          </div>
          <Link to="/voertuigen" className="btn btn-outline shrink-0 self-start sm:self-auto">
            {t.recentCta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {samples.map((v) => <VehicleCard key={v.id} v={v} />)}
        </div>
      </section>

      {/* ── Klassiekers banner ── */}
      <section className="on-dark relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: "#1a2f4d" }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1532895215727-c006c8fdf560?w=1600&h=600&fit=crop&auto=format)",
            filter: "brightness(0.3) saturate(0.5)",
          }}
          role="img"
          aria-label={t.bannerImgLabel}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(37,99,168,0.85) 0%, rgba(37,99,168,0.5) 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="text-white max-w-xl">
            <span className="font-mono-label text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.9)" }}>{t.klassiekerLabel}</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-3">{t.klassiekerTitle}</h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>{t.klassiekerText}</p>
          </div>
          <Link to="/klassiekers" className="btn btn-light shrink-0 self-start md:self-auto px-8">
            {t.klassiekerCta}
          </Link>
        </div>
      </section>

      {/* ── Waarom wij ── */}
      <section className="py-16 md:py-20 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="font-mono-label text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--primary)" }}>{t.whyLabel}</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.whyTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.why.map((item) => (
              <div key={item.title} className="p-6 rounded-lg border" style={{ backgroundColor: "var(--secondary)", borderColor: "var(--border)" }}>
                <div aria-hidden="true" className="w-9 h-9 flex items-center justify-center font-bold text-sm mb-4 rounded-md" style={{ backgroundColor: "var(--primary)", color: "white" }}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--secondary-foreground)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
