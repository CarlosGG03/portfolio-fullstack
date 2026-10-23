import { Experience, Education } from "@/types";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
  education: Education[];
}

export function ExperienceSection({ experiences, education }: ExperienceSectionProps) {
  return (
    <section id="experience" className="px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Experiencia Laboral */}
        <div>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mb-3">
              <Briefcase className="h-3.5 w-3.5" />
              Trayectoria
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Experiencia Laboral
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Historial de liderazgo y desarrollo de productos tecnológicos.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Glowing Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 group-hover:scale-125 transition-all shadow-md shadow-indigo-500/50" />

                <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Calendar className="h-3 w-3" />
                      {exp.start_date} - {exp.is_current ? "Presente" : exp.end_date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-400 mb-3">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1 text-slate-400 font-normal text-xs">
                        <MapPin className="h-3 w-3" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                      {exp.technologies.split(",").map((tech, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Educación */}
        <div>
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-400 border border-purple-800/60 mb-3">
              <GraduationCap className="h-3.5 w-3.5" />
              Académico
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Educación & Títulos
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              Fundamentos científicos y formación técnica continua.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="relative group">
                {/* Glowing Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full bg-slate-950 border-2 border-purple-500 group-hover:bg-purple-500 group-hover:scale-125 transition-all shadow-md shadow-purple-500/50" />

                <div className="glass-card rounded-2xl p-5 border border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {edu.degree}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Calendar className="h-3 w-3" />
                      {edu.start_year} - {edu.end_year || "Presente"}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-indigo-400 mb-3">
                    {edu.institution}
                  </div>

                  {edu.description && (
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
