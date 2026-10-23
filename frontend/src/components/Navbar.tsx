import Link from "next/link";
import { Code2, Terminal, User, Briefcase, GraduationCap, Mail } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white">
          <Terminal className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span>Carlos Garzón <span className="text-indigo-600 dark:text-indigo-400 text-sm font-mono font-normal">/ FullStack</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="#about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Sobre mí
          </Link>
          <Link href="#projects" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Proyectos
          </Link>
          <Link href="#skills" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Habilidades
          </Link>
          <Link href="#experience" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Experiencia
          </Link>
          <Link href="#contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Contacto
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Contáctame
          </Link>
        </div>
      </div>
    </header>
  );
}
