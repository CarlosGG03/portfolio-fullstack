import { fetchProjectBySlug } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
import { notFound } from "next/navigation";

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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Proyectos
        </Link>

        <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-3">
            <Layers className="h-4 w-4" />
            <span>Proyecto Destacado</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.split(",").map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-semibold rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
              >
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Descripción Detallada</h2>
            <p>{project.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
            {project.github_url && (
              <Link
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
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
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
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
