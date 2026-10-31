import { useState } from "react";
import { useLang } from "../context/LangContext";

const CONTENT = {
  nl: {
    label: "Wij staan voor u klaar",
    title: "Contact",
    intro: "Heeft u een vraag over een voertuig, verhuur of lease? Stuur ons een bericht via het formulier.",
    formTitle: "Stuur ons een bericht",
    fields: [
      { id: "name", label: "Naam", type: "text", ph: "Jan Jansen", auto: "name", req: true },
      { id: "email", label: "E-mailadres", type: "email", ph: "jan@voorbeeld.nl", auto: "email", req: true },
      { id: "phone", label: "Telefoonnummer", type: "tel", ph: "06 12345678", auto: "tel", req: false },
    ],
    msgLabel: "Bericht",
    msgPh: "Stel hier uw vraag…",
    submit: "Verstuur bericht",
    required: "verplicht",
    sentTitle: "Bedankt voor uw bericht!",
    sentText: "Dit is een conceptwebsite, dus uw bericht is niet echt verzonden.",
    again: "Nieuw bericht schrijven",
  },
  en: {
    label: "We are here for you",
    title: "Contact",
    intro: "Do you have a question about a vehicle, rental or lease? Send us a message using the form.",
    formTitle: "Send us a message",
    fields: [
      { id: "name", label: "Name", type: "text", ph: "John Smith", auto: "name", req: true },
      { id: "email", label: "Email", type: "email", ph: "john@example.com", auto: "email", req: true },
      { id: "phone", label: "Phone", type: "tel", ph: "+31 6 12345678", auto: "tel", req: false },
    ],
    msgLabel: "Message",
    msgPh: "Your question here…",
    submit: "Send message",
    required: "required",
    sentTitle: "Thank you for your message!",
    sentText: "This is a concept website, so your message was not actually sent.",
    again: "Write another message",
  },
};

function RequiredMark({ text }: { text: string }) {
  return (
    <>
      <span aria-hidden="true" style={{ color: "var(--primary)" }}> *</span>
      <span className="sr-only"> ({text})</span>
    </>
  );
}

export default function Contact() {
  const { lang } = useLang();
  const t = CONTENT[lang];
  const [sent, setSent] = useState(false);

  return (
    <div>
      <div className="border-b py-10 md:py-14" style={{ backgroundColor: "var(--secondary)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <span className="font-mono-label text-[10px] tracking-[0.25em] uppercase" style={{ color: "var(--primary)" }}>{t.label}</span>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2">{t.title}</h1>
          <p className="text-base max-w-2xl mt-2" style={{ color: "var(--secondary-foreground)" }}>{t.intro}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 md:py-12">
        {sent ? (
          <div
            role="status"
            className="p-8 rounded-lg border text-center shadow-sm"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
          >
            <div aria-hidden="true" className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full text-xl font-bold" style={{ backgroundColor: "var(--secondary)", color: "var(--primary)" }}>
              ✓
            </div>
            <h2 className="font-display text-2xl font-semibold mb-2">{t.sentTitle}</h2>
            <p className="text-sm mb-6" style={{ color: "var(--secondary-foreground)" }}>{t.sentText}</p>
            <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>
              {t.again}
            </button>
          </div>
        ) : (
          <form
            className="p-6 md:p-8 rounded-lg border flex flex-col gap-4 shadow-sm"
            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            aria-labelledby="formulier-titel"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 id="formulier-titel" className="font-display text-xl font-semibold mb-1">{t.formTitle}</h2>
            {t.fields.map((f) => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label htmlFor={f.id} className="text-sm font-medium" style={{ color: "var(--secondary-foreground)" }}>
                  {f.label}
                  {f.req && <RequiredMark text={t.required} />}
                </label>
                <input id={f.id} name={f.id} type={f.type} autoComplete={f.auto} placeholder={f.ph} required={f.req} className="field" />
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="msg" className="text-sm font-medium" style={{ color: "var(--secondary-foreground)" }}>
                {t.msgLabel}
                <RequiredMark text={t.required} />
              </label>
              <textarea id="msg" name="msg" rows={5} placeholder={t.msgPh} required className="field resize-y" />
            </div>
            <button type="submit" className="btn btn-primary mt-1">
              {t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
