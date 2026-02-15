"use client";

import { signOut } from "next-auth/react";
import { Calculator, LogOut } from "lucide-react";

export function AdminNav() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Calculator className="h-5 w-5 text-accent-light" />
            <span>Admin Panel</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-sm text-white/70 hover:text-white transition-colors">
              Zpět na web
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Odhlásit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
