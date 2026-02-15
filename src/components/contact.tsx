"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Contact() {
  return (
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
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Jméno
                  </label>
                  <input
                    type="text"
                    placeholder="Jan Novák"
                    className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+420 ..."
                    className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="jan@firma.cz"
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Zpráva
                </label>
                <textarea
                  rows={4}
                  placeholder="Popište, co potřebujete..."
                  className="w-full rounded-lg border border-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
              >
                Odeslat zprávu
              </button>
            </form>
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
  );
}
