"use client";

import { motion } from "framer-motion";
import { Award, Clock, Heart } from "lucide-react";

const values = [
  {
    icon: Clock,
    title: "Spolehlivost",
    text: "Vždy dodržuji termíny a domluvené postupy.",
  },
  {
    icon: Heart,
    title: "Osobní přístup",
    text: "Ke každému klientovi přistupuji individuálně.",
  },
  {
    icon: Award,
    title: "Odbornost",
    text: "Neustále se vzdělávám v aktuálních předpisech.",
  },
];

export function About() {
  return (
    <section id="o-mne" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-5xl font-bold text-primary">ŠK</span>
                </div>
                <p className="text-lg font-semibold text-primary">
                  Šárka Kotmanová
                </p>
                <p className="text-sm text-text-muted">Účetní poradkyně</p>
              </div>
            </div>
          </motion.div>

          {/* Right - text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              O mně
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Jsem Šárka Kotmanová a účetnictví se věnuji již více než 18 let.
              Mou specializací je komplexní vedení účetnictví pro malé a střední
              podniky v Českých Budějovicích a okolí.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              Mým cílem je, abyste měli více času na své podnikání a nemuseli se
              starat o administrativu. Postarám se o vše od vedení účetnictví
              přes mzdy až po komunikaci s úřady.
            </p>

            <div className="space-y-4">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <v.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-sm">
                      {v.title}
                    </h3>
                    <p className="text-sm text-text-muted">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
