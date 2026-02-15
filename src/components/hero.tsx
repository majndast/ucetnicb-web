"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80 mb-6">
              <ShieldCheck className="h-4 w-4 text-accent-light" />
              Spolehlivé účetnictví od roku 2005
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          >
            Účetnictví
            <br />
            <span className="text-accent-light">bez starostí</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg"
          >
            Nemáte čas běhat po úřadech? Svěřte své účetnictví do rukou
            profesionála. Kompletní vedení účetnictví, daně a mzdy na jednom
            místě v Českých Budějovicích.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Nezávazná konzultace zdarma
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#sluzby"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Prohlédnout služby
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
