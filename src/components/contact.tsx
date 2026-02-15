"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [gdprConsent, setGdprConsent] = useState(false);
  const [gdprError, setGdprError] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setGdprError(false);

    if (!gdprConsent) {
      setGdprError(true);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    // Honeypot
    const website = formData.get("website") as string;
    if (website) {
      data.website = website;
    }

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const [key, messages] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[key as keyof ContactFormData] = messages?.[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors";
  const errorInputClass =
    "w-full rounded-lg border border-red-400 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-colors";

  return (
    <>
    <section id="kontakt" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Kontaktujte mě
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            Neváhejte se ozvat. Ráda vám připravím nezávaznou nabídku na míru.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Zpráva odeslána!
                </h3>
                <p className="text-sm text-text-muted mb-6">
                  Děkuji za vaši zprávu. Ozvu se vám co nejdříve.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  Odeslat další zprávu
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot - hidden from humans, bots fill it */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      Jméno *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jan Novák"
                      className={errors.name ? errorInputClass : inputClass}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+420 ..."
                      className={errors.phone ? errorInputClass : inputClass}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jan@firma.cz"
                    className={errors.email ? errorInputClass : inputClass}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Zpráva *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Popište, co potřebujete..."
                    className={`${errors.message ? errorInputClass : inputClass} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* GDPR consent */}
                <div>
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gdprConsent}
                      onChange={(e) => {
                        setGdprConsent(e.target.checked);
                        if (e.target.checked) setGdprError(false);
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/30 accent-accent"
                    />
                    <span className="text-xs text-text-muted leading-relaxed">
                      Souhlasím se zpracováním osobních údajů (jméno, e-mail,
                      telefon) za účelem vyřízení poptávky. Údaje budou použity
                      výhradně pro komunikaci ohledně vaší poptávky a nebudou
                      předány třetím stranám.{" "}
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById("gdpr-info");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-accent hover:underline font-medium"
                      >
                        Více informací
                      </button>
                    </span>
                  </label>
                  {gdprError && (
                    <p className="mt-1 ml-6.5 text-xs text-red-500">
                      Pro odeslání formuláře je nutný souhlas se zpracováním údajů.
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Něco se pokazilo. Zkuste to prosím znovu.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Odesílám...
                    </>
                  ) : (
                    "Odeslat zprávu"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info + map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-soft">
                <Phone className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary">Telefon</p>
                  <a
                    href="tel:+420724159681"
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    +420 724 159 681
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-soft">
                <Mail className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary">E-mail</p>
                  <a
                    href="mailto:info@ucetnicb.cz"
                    className="text-sm text-text-muted hover:text-accent transition-colors"
                  >
                    info@ucetnicb.cz
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-soft">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary">Adresa</p>
                  <p className="text-sm text-text-muted">
                    Novohradská
                    <br />
                    České Budějovice
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-soft">
                <Clock className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Pracovní doba
                  </p>
                  <p className="text-sm text-text-muted">
                    Po - Pá: 8:00 - 17:00
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d14.4747!3d48.9745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773cb5e5e5e5e5f%3A0x0!2sNovohradsk%C3%A1%2C%20%C4%8Cesk%C3%A9%20Bud%C4%9Bjovice!5e0!3m2!1scs!2scz!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - Účetnictví Kotmanová"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* GDPR info */}
    <section id="gdpr-info" className="py-12 bg-bg-soft border-t border-border">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Informace o zpracování osobních údajů
        </h3>
        <div className="space-y-3 text-sm text-text-muted leading-relaxed">
          <p>
            <strong className="text-text">Správce údajů:</strong> Šárka Kotmanová,
            IČ: — , se sídlem Novohradská, České Budějovice.
          </p>
          <p>
            <strong className="text-text">Účel zpracování:</strong> Vyřízení vaší
            poptávky a následná komunikace ohledně nabízených služeb.
          </p>
          <p>
            <strong className="text-text">Rozsah zpracovávaných údajů:</strong>{" "}
            Jméno, e-mailová adresa, telefonní číslo (nepovinné) a text zprávy.
          </p>
          <p>
            <strong className="text-text">Doba zpracování:</strong> Vaše údaje
            budou uchovány po dobu nezbytnou k vyřízení poptávky, maximálně 3 roky
            od posledního kontaktu, pokud nevznikne smluvní vztah.
          </p>
          <p>
            <strong className="text-text">Příjemci údajů:</strong> Vaše údaje
            nebudou předány třetím stranám. Pro doručení e-mailů využíváme službu
            Resend (zpracovatel).
          </p>
          <p>
            <strong className="text-text">Vaše práva:</strong> Máte právo na
            přístup k údajům, jejich opravu, výmaz, omezení zpracování a právo
            podat stížnost u Úřadu pro ochranu osobních údajů (ÚOOÚ).
          </p>
          <p>
            <strong className="text-text">Kontakt:</strong> Pro uplatnění vašich
            práv nás kontaktujte na{" "}
            <a href="mailto:info@ucetnicb.cz" className="text-accent hover:underline">
              info@ucetnicb.cz
            </a>{" "}
            nebo telefonicky na{" "}
            <a href="tel:+420724159681" className="text-accent hover:underline">
              +420 724 159 681
            </a>
            .
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
