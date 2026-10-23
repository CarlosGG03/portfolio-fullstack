"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-bold text-lg sm:text-xl tracking-tight text-white hover:opacity-95 transition-all"
        >
          <div className="p-2 rounded-xl bg-linear-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Terminal className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <span>
            Carlos Garzón{" "}
            <span className="text-xs sm:text-sm font-mono font-medium text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800/50">
              Senior FullStack
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-300">
          {[
            { name: "Sobre mí", href: "#about" },
            { name: "Proyectos", href: "#projects" },
            { name: "Habilidades", href: "#skills" },
            { name: "Experiencia", href: "#experience" },
            { name: "Contacto", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3.5 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "8s" }} />
            Contáctame
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 animate-fade-in space-y-2">
          {[
            { name: "Sobre mí", href: "#about" },
            { name: "Proyectos", href: "#projects" },
            { name: "Habilidades", href: "#skills" },
            { name: "Experiencia", href: "#experience" },
            { name: "Contacto", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="w-full text-center inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
            >
              Contáctame
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
