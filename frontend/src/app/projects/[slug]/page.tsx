import {fetchProjectBySlug} from "@/lib/api";
import {Navbar} from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import Link from "next/link";
import {ArrowLeft, ExternalLink, Layers} from "lucide-react";
import {GithubIcon} from "@/components/GithubIcon";
import {notFound} from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full relative">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform text-indigo-400" />
          Volver a Proyectos
        </Link>

        <article className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mb-4">
            <Layers className="h-3.5 w-3.5" />
            <span>Proyecto de Portafolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-slate-800/80">
            {project.technologies.split(",").map((tech, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-800/90 text-indigo-300 border border-slate-700/70"
              >
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className="space-y-4 mb-10 text-slate-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-3">Descripción y Arquitectura</h2>
            <div className="whitespace-pre-line text-base text-slate-300">
              {project.description}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800/80">
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition-all shadow-md"
              >
                <GithubIcon className="h-4 w-4" />
                Ver Código en GitHub
              </Link>
            )}
            {project.live_url && (
              <Link
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-95 transition-all shadow-lg shadow-indigo-500/25"
              >
                <ExternalLink className="h-4 w-4" />
                Ver Demo en Vivo
              </Link>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
