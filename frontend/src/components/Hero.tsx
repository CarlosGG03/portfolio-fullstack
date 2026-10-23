import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {GithubIcon} from "@/components/GithubIcon";

export function Hero() {
  return (
    <section className="py-20 md:py-28 px-4 max-w-6xl mx-auto flex flex-col items-start justify-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-6">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        Disponible para nuevos proyectos y roles Full Stack
      </div>

      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl">
        Ingeniero de Software <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Full Stack & Arquitecto</span>
      </h1>

      <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
        Especializado en el desarrollo de arquitecturas limpias, escalables y mantenibles con <strong>React, Next.js, Python FastAPI, C# .NET Core, Docker y PostgreSQL</strong>.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
        >
          Explorar Proyectos
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="https://github.com/CarlosGG03"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <GithubIcon className="h-5 w-5" />
          GitHub
        </Link>
      </div>
    </section>
  );
}
