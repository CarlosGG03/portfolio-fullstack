import { Mail, Heart } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-bold text-slate-900 dark:text-white">Carlos Garzón</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Senior Full Stack Software Engineer & Software Architect
          </p>
        </div>

        <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
          <Link
            href="https://github.com/CarlosGG03"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:carlosgarzon969@gmail.com"
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Carlos Garzón. Todos los derechos reservados.
      </div>
    </footer>
  );
}
