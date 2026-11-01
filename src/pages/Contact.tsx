import { useState } from "react";
import { useLang } from "../context/LangContext";
import PageHeader from "../components/PageHeader";

const CONTENT = {
  nl: {
    label: "Wij staan voor u klaar",
    title: "Contact",
    intro: "Heeft u een vraag over een voertuig, verhuur of lease? Stuur ons een bericht via het formulier.",
    formTitle: "Stuur ons een bericht",
    fields: [
      { id: "name", label: "Naam", type: "text", placeholder: "Jan Jansen", autoComplete: "name", required: true },
      { id: "email", label: "E-mailadres", type: "email", placeholder: "jan@voorbeeld.nl", autoComplete: "email", required: true },
      { id: "phone", label: "Telefoonnummer", type: "tel", placeholder: "06 12345678", autoComplete: "tel", required: false },
    ],
    messageLabel: "Bericht",
    messagePlaceholder: "Stel hier uw vraag…",
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
      { id: "name", label: "Name", type: "text", placeholder: "John Smith", autoComplete: "name", required: true },
      { id: "email", label: "Email", type: "email", placeholder: "john@example.com", autoComplete: "email", required: true },
      { id: "phone", label: "Phone", type: "tel", placeholder: "+31 6 12345678", autoComplete: "tel", required: false },
    ],
    messageLabel: "Message",
    messagePlaceholder: "Your question here…",
    submit: "Send message",
    required: "required",
    sentTitle: "Thank you for your message!",
    sentText: "This is a concept website, so your message was not actually sent.",
    again: "Write another message",
  },
};

// Sterretje achter het label van een verplicht veld.
// Toegankelijkheid: screenreaders lezen "(verplicht)" voor in plaats van "sterretje".
function RequiredMark({ text }: { text: string }) {
  return (
    <>
      <span aria-hidden="true" className="text-primary"> *</span>
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
      <PageHeader eyebrow={t.label} title={t.title} intro={t.intro} />

      <div className="max-w-2xl mx-auto px-6 py-10 md:py-12">
        {sent ? (
          // Bevestiging na verzenden. Het formulier is een demo en verstuurt niets.
          // Toegankelijkheid: role="status" laat screenreaders de bevestiging direct voorlezen.
          <div role="status" className="p-8 rounded-lg border border-border bg-card text-center shadow-sm">
            <div
              aria-hidden="true"
              className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-secondary text-primary text-xl font-bold"
            >
              ✓
            </div>
            <h2 className="font-display text-2xl font-semibold mb-2">{t.sentTitle}</h2>
            <p className="text-sm mb-6 text-secondary-foreground">{t.sentText}</p>
            <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>
              {t.again}
            </button>
          </div>
        ) : (
          // Toegankelijkheid: aria-labelledby geeft het formulier de kop als naam.
          // Responsive: meer binnenruimte vanaf md.
          <form
            aria-labelledby="formulier-titel"
            className="p-6 md:p-8 rounded-lg border border-border bg-card flex flex-col gap-4 shadow-sm"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h2 id="formulier-titel" className="font-display text-xl font-semibold mb-1">
              {t.formTitle}
            </h2>

            {t.fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                <label htmlFor={field.id} className="text-sm font-medium text-secondary-foreground">
                  {field.label}
                  {field.required && <RequiredMark text={t.required} />}
                </label>
                {/* Toegankelijkheid: autoComplete laat de browser bekende gegevens invullen. */}
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="field"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="msg" className="text-sm font-medium text-secondary-foreground">
                {t.messageLabel}
                <RequiredMark text={t.required} />
              </label>
              <textarea id="msg" name="msg" rows={5} placeholder={t.messagePlaceholder} required className="field resize-y" />
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
