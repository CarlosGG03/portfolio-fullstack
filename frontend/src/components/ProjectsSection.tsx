import { Project } from "@/types";
import Link from "next/link";
import { ExternalLink, Layers } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <Layers className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          Proyectos Destacados
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Soluciones completas con enfoque en arquitectura, rendimiento y código limpio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.split(",").map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm font-semibold">
              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <GithubIcon className="h-4 w-4" />
                  Código
                </Link>
              )}
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                  <ExternalLink className="h-4 w-4" />
                  Demo en Vivo
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
