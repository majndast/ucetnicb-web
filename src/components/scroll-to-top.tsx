"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Zpět nahoru"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white shadow-lg hover:bg-primary-light transition-all duration-300 hover:scale-105"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
