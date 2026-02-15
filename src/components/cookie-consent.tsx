"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl bg-white rounded-xl border border-border shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-text-muted flex-1">
          Tento web používá nezbytné cookies pro správné fungování. Odesláním
          kontaktního formuláře souhlasíte se{" "}
          <button
            onClick={() => {
              const el = document.getElementById("gdpr-info");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              accept();
            }}
            className="text-accent hover:underline font-medium"
          >
            zpracováním osobních údajů
          </button>
          .
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
        >
          Rozumím
        </button>
      </div>
    </div>
  );
}
