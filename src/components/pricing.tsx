"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Daňová evidence",
    price: "od 2 000",
    unit: "Kč / měsíc",
    description: "Pro OSVČ a malé podnikatele",
    features: [
      "Vedení daňové evidence",
      "Přiznání k dani z příjmů",
      "Přehledy pro ČSSZ a ZP",
      "Evidence DPH",
    ],
    highlighted: false,
  },
  {
    name: "Podvojné účetnictví",
    price: "od 4 000",
    unit: "Kč / měsíc",
    description: "Pro s.r.o. a větší firmy",
    features: [
      "Kompletní podvojné účetnictví",
      "Účetní závěrka",
      "Daňové přiznání (DPPO, DPH)",
      "Kontrolní a souhrnné hlášení",
      "Komunikace s FÚ",
    ],
    highlighted: true,
  },
  {
    name: "Mzdová agenda",
    price: "od 250",
    unit: "Kč / zaměstnanec",
    description: "Kompletní zpracování mezd",
    features: [
      "Výpočet mezd",
      "Výplatní pásky",
      "Přihlášky a odhlášky",
      "Roční zúčtování daně",
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="cenik" className="py-20 bg-bg-soft">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Ceník služeb
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            Transparentní ceny bez skrytých poplatků. Konečná cena závisí na
            rozsahu a složitosti vašeho účetnictví.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-xl p-6 border transition-shadow hover:shadow-lg ${
                plan.highlighted
                  ? "bg-primary text-white border-primary shadow-lg scale-[1.02]"
                  : "bg-white border-border"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                  Nejoblíbenější
                </div>
              )}

              <h3
                className={`text-lg font-semibold ${
                  plan.highlighted ? "text-white" : "text-primary"
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`text-sm mt-1 ${
                  plan.highlighted ? "text-white/60" : "text-text-muted"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-4 mb-6">
                <span
                  className={`text-3xl font-bold ${
                    plan.highlighted ? "text-accent-light" : "text-primary"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1 ${
                    plan.highlighted ? "text-white/60" : "text-text-muted"
                  }`}
                >
                  {plan.unit}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? "text-accent-light" : "text-accent"
                      }`}
                    />
                    <span
                      className={
                        plan.highlighted ? "text-white/80" : "text-text-muted"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#kontakt"
                className={`block text-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-accent text-white hover:bg-accent-light"
                    : "bg-primary text-white hover:bg-primary-light"
                }`}
              >
                Mám zájem
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
