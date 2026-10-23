import {Skill} from "@/types";
import {Cloud, Cpu, Database, Layout, Server} from "lucide-react";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("front") || cat.includes("web") || cat.includes("ui")) return <Layout className="h-5 w-5 text-indigo-400" />;
    if (cat.includes("back") || cat.includes("api")) return <Server className="h-5 w-5 text-purple-400" />;
    if (cat.includes("data") || cat.includes("sql")) return <Database className="h-5 w-5 text-emerald-400" />;
    if (cat.includes("cloud") || cat.includes("devops") || cat.includes("docker")) return <Cloud className="h-5 w-5 text-sky-400" />;
    return <Cpu className="h-5 w-5 text-pink-400" />;
  };

  return (
    <section id="skills" className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mb-3">
          <Cpu className="h-3.5 w-3.5" />
          Tecnologías
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Habilidades Técnicas
        </h2>
        <p className="mt-2 text-slate-400 max-w-xl text-base">
          Herramientas, frameworks y lenguajes con los que desarrollo arquitecturas de punta a punta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="glass-card rounded-2xl p-6 border border-slate-800/80"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
              <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                {getCategoryIcon(category)}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {category}
              </h3>
            </div>

            <div className="space-y-4">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <div key={skill.id} className="group">
                    <div className="flex justify-between text-sm font-medium mb-1.5">
                      <span className="text-slate-300 group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-indigo-400 font-mono text-xs">{skill.proficiency_level}%</span>
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden p-0.5 border border-slate-700/50">
                      <div
                        className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-700 ease-out"
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
