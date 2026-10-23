
import { Skill } from "@/types";
import {
  Braces,
  Cloud,
  Code2,
  Database,
  Layers3,
  Server,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

const categoryIcons: { match: string[]; icon: LucideIcon }[] = [
  { match: ["front", "web", "ui"], icon: Code2 },
  { match: ["back", "api"], icon: Server },
  { match: ["data", "sql", "database"], icon: Database },
  { match: ["cloud", "devops", "docker"], icon: Cloud },
  { match: ["arch", "design", "workflow"], icon: Workflow },
];

function getCategoryIcon(category: string): LucideIcon {
  const normalizedCategory = category.toLowerCase();

  return (
    categoryIcons.find(({ match }) =>
      match.some((keyword) => normalizedCategory.includes(keyword))
    )?.icon ?? Braces
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const categories = Array.from(
    new Set(skills.map((skill) => skill.category))
  );

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 sm:px-6"
    >
      <div className="mb-12">
        <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
          <Layers3 className="h-4 w-4" />
          Stack tecnológico
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Herramientas para
          <span className="text-slate-500"> construir.</span>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Tecnologías y herramientas que utilizo para desarrollar
          interfaces, integrar servicios y construir aplicaciones
          mantenibles.
        </p>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-slate-400">
          Las habilidades estarán disponibles próximamente.
        </p>
      ) : (
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category);

            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );

            return (
              <div
                key={category}
                className="grid gap-5 py-7 sm:grid-cols-[200px_1fr] sm:gap-8 sm:py-9"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-indigo-400/[0.08] p-2.5 text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-slate-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-1 text-sm font-semibold text-white">
                      {category}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {categorySkills.length}{" "}
                      {categorySkills.length === 1
                        ? "tecnología"
                        : "tecnologías"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap content-start gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-sm text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-indigo-400/[0.05] hover:text-white"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
