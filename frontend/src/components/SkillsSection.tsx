import { Skill } from "@/types";
import { Cpu } from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section id="skills" className="py-16 px-4 max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
          <Cpu className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
          Habilidades Técnicas
        </h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Tecnologías y herramientas que domino para construir soluciones robustas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b pb-2 border-slate-100 dark:border-slate-800">
              {category}
            </h3>
            <div className="space-y-4">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between text-sm font-medium mb-1">
                      <span className="text-slate-700 dark:text-slate-300">{skill.name}</span>
                      <span className="text-slate-400">{skill.proficiency_level}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.proficiency_level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
