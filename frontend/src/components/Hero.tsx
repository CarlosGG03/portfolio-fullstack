import Link from "next/link";
import {ArrowRight, Database, Layers, Server, ShieldCheck} from "lucide-react";
import {GithubIcon} from "@/components/GithubIcon";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
      {/* Background ambient glow circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-8 backdrop-blur-md animate-fade-in">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span>Disponible para Nuevos Retos & Proyectos Full Stack</span>
      </div>

      {/* Main Title with Shimmer and Gradient */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15] animate-fade-in">
        Desarrollador de Software{" "}
        <span className="shimmer-text">
          Full Stack & Arquitecto
        </span>
      </h1>

      {/* Description */}
      <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed animate-fade-in font-normal">
        Diseño y construyo sistemas web robustos, escalables y mantenibles combinando{" "}
        <span className="text-indigo-400 font-medium">React / Next.js</span>,{" "}
        <span className="text-purple-400 font-medium">Python FastAPI</span>,{" "}
        <span className="text-pink-400 font-medium">C# .NET Core</span>,{" "}
        <span className="text-sky-400 font-medium">Docker</span> y{" "}
        <span className="text-emerald-400 font-medium">PostgreSQL</span> con Clean Architecture.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in">
        <Link
          href="#projects"
          className="group inline-flex items-center gap-2.5 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
        >
          Explorar Proyectos
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="https://github.com/CarlosGG03"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-md px-7 py-3.5 text-base font-semibold text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
        >
          <GithubIcon className="h-5 w-5" />
          Ver en GitHub
        </Link>
      </div>

      {/* Highlights / Badges Grid */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left animate-fade-in">
        <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Clean Architecture</div>
            <div className="text-xs text-slate-400">SOLID & DDD</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Dual Backend</div>
            <div className="text-xs text-slate-400">FastAPI & ASP.NET</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">PostgreSQL</div>
            <div className="text-xs text-slate-400">Optimizado & Docker</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-2xl flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">CI/CD & Tests</div>
            <div className="text-xs text-slate-400">GitHub Actions</div>
          </div>
        </div>
      </div>
    </section>
  );
}
