"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Users,
  Calculator,
  Building,
  MessageSquare,
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Vedení účetnictví",
    description:
      "Kompletní vedení podvojného účetnictví pro právnické i fyzické osoby včetně účetní závěrky.",
  },
  {
    icon: FileText,
    title: "Daňová evidence",
    description:
      "Přehledná daňová evidence pro OSVČ. Jednoduché a transparentní zpracování.",
  },
  {
    icon: Calculator,
    title: "Daňové přiznání",
    description:
      "Zpracování všech typů daňových přiznání včetně kontrolního hlášení k DPH.",
  },
  {
    icon: Users,
    title: "Mzdová agenda",
    description:
      "Kompletní zpracování mezd, personální agendy a komunikace s úřady.",
  },
  {
    icon: Building,
    title: "Zastupování na úřadech",
    description:
      "Zastupování před finančním úřadem, ČSSZ a zdravotními pojišťovnami.",
  },
  {
    icon: MessageSquare,
    title: "Daňové poradenství",
    description:
      "Odborné poradenství v oblasti daní, optimalizace daňové zátěže a plánování.",
  },
];

export function Services() {
  return (
    <section id="sluzby" className="py-20 bg-bg-soft">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Naše služby
          </h2>
          <p className="mt-4 text-text-muted max-w-xl mx-auto">
            Nabízíme kompletní spektrum účetních a daňových služeb přizpůsobených
            potřebám vašeho podnikání.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group bg-white rounded-xl p-6 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
