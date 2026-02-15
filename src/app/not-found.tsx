import Link from "next/link";
import { Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-soft px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center gap-2 text-primary font-bold text-xl mb-6">
          <Calculator className="h-7 w-7 text-accent" />
          Účetnictví Kotmanová
        </div>
        <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
        <p className="text-lg text-text-muted mb-8">
          Tato stránka neexistuje nebo byla přesunuta.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
        >
          Zpět na úvodní stránku
        </Link>
      </div>
    </div>
  );
}
