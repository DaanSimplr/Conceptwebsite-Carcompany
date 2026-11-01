import Eyebrow from "./Eyebrow";

type Props = {
  title: string;
  intro: string;
  // Optioneel label boven de titel.
  eyebrow?: string;
};

// Gekleurde kopbalk bovenaan een subpagina, met de <h1> van die pagina.
export default function PageHeader({ title, intro, eyebrow }: Props) {
  return (
    // Responsive: meer verticale ruimte vanaf md.
    <div className="border-b border-border bg-secondary py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className={`${eyebrow ? "mt-2 " : ""}font-display text-3xl md:text-4xl font-semibold`}>{title}</h1>
        <p className="mt-2 max-w-2xl text-base text-secondary-foreground">{intro}</p>
      </div>
    </div>
  );
}
