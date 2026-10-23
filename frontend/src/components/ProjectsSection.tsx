
import { Project } from "@/types";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  Layers3,
} from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 sm:px-6"
    >
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
            <Layers3 className="h-4 w-4" />
            Trabajo seleccionado
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Proyectos
            <span className="text-slate-500"> destacados.</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Soluciones de software donde combino desarrollo,
            diseño técnico y atención al detalle.
          </p>
        </div>

        <span className="text-sm tabular-nums text-slate-500">
          {String(projects.length).padStart(2, "0")} proyectos
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.08] p-8 text-sm text-slate-400">
          Los proyectos estarán disponibles próximamente.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-indigo-400/30 hover:bg-white/[0.035] sm:p-8"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-sm text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                  <span className="text-slate-700"> / </span>
                  {String(projects.length).padStart(2, "0")}
                </span>

                {project.featured && (
                  <span className="rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-indigo-300">
                    Destacado
                  </span>
                )}
              </div>

              <div className="flex-1">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/title inline-flex items-start gap-2"
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors group-hover/title:text-indigo-200 sm:text-3xl">
                    {project.title}
                  </h3>

                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition-all group-hover/title:-translate-y-1 group-hover/title:translate-x-1 group-hover/title:text-indigo-300" />
                </Link>

                <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-400">
                  {project.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {project.technologies
                    .split(",")
                    .map((technology) => technology.trim())
                    .filter(Boolean)
                    .map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-white/[0.08] pt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Explorar proyecto
                  <ArrowDownRight className="h-4 w-4" />
                </Link>

                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <Link
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver código de ${project.title} en GitHub`}
                      className="rounded-lg p-2.5 text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </Link>
                  )}

                  {project.live_url && (
                    <Link
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-indigo-400 px-3.5 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-indigo-300"
                    >
                      Demo
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
