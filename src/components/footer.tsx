import { Calculator, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <Calculator className="h-6 w-6 text-accent-light" />
              <span>Účetnictví Kotmanová</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Kompletní vedení účetnictví, daňové poradenství a mzdová agenda
              pro podnikatele v Českých Budějovicích a okolí.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="#sluzby" className="hover:text-white transition-colors">
                  Služby
                </a>
              </li>
              <li>
                <a href="#o-mne" className="hover:text-white transition-colors">
                  O mně
                </a>
              </li>
              <li>
                <a href="#cenik" className="hover:text-white transition-colors">
                  Ceník
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent-light" />
                <a href="tel:+420724159681" className="hover:text-white transition-colors">
                  +420 724 159 681
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-light" />
                <a href="mailto:info@ucetnicb.cz" className="hover:text-white transition-colors">
                  info@ucetnicb.cz
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent-light mt-0.5" />
                <span>Novohradská, České Budějovice</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} Účetnictví Kotmanová. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  );
}
