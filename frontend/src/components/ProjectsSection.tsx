import { Project } from "@/types";
import Link from "next/link";
import { ExternalLink, Layers, ArrowUpRight, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mb-3">
            <Layers className="h-3.5 w-3.5" />
            Portafolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Proyectos Destacados
          </h2>
          <p className="mt-2 text-slate-400 max-w-xl text-base">
            Arquitecturas completas orientadas a producción, rendimiento, mantenibilidad y escalabilidad.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group glass-card rounded-2xl p-7 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Ambient hover gradient top corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-indigo-400 group-hover:text-indigo-300 group-hover:scale-105 transition-transform">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    Destacado
                  </span>
                )}
              </div>

              <Link href={`/projects/${project.slug}`} className="group-hover:text-indigo-300 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2.5 flex items-center gap-1.5">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-400" />
                </h3>
              </Link>

              <p className="text-slate-300 text-sm mb-6 leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/70"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-slate-800/80 text-sm font-semibold">
              <Link
                href={`/projects/${project.slug}`}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Ver detalles completos →
              </Link>

              <div className="flex items-center gap-3">
                {project.github_url && (
                  <Link
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Código fuente en GitHub"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </Link>
                )}
                {project.live_url && (
                  <Link
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 text-xs transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Demo
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
