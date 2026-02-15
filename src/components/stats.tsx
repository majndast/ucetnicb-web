"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "18+", label: "Let praxe" },
  { value: "200+", label: "Spokojených klientů" },
  { value: "500+", label: "Zpracovaných přiznání" },
  { value: "100%", label: "Dodržených termínů" },
];

export function Stats() {
  return (
    <section className="py-16 bg-primary">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-accent-light">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
