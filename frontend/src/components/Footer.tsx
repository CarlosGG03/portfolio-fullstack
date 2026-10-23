import {Mail, Terminal} from "lucide-react";
import {GithubIcon} from "@/components/GithubIcon";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold text-white text-base">Carlos Garzón</p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Senior Full Stack Software Engineer & Software Architect
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <Link
            href="https://github.com/CarlosGG03"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
            aria-label="GitHub de Carlos Garzón"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:carlosgarzon969@gmail.com"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
            aria-label="Enviar correo"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Carlos Garzón. Construido con Clean Architecture, Next.js, FastAPI & .NET Core.</span>
        <span className="flex items-center gap-1 text-slate-400">
          Desarrollado con dedicación y buenas prácticas
        </span>
      </div>
    </footer>
  );
}
