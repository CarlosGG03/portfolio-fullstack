import { Experience, Education } from "@/types";
import { Briefcase, GraduationCap } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
  education: Education[];
}

export function ExperienceSection({ experiences, education }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-16 px-4 max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Experiencia Laboral */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <Briefcase className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              Experiencia
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Mi trayectoria profesional en desarrollo y arquitectura de software.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-900"
              >
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-950"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  {exp.company} {exp.location ? `• ${exp.location}` : ""} ({exp.start_date} - {exp.is_current ? "Presente" : exp.end_date})
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.description}
                </p>
                {exp.technologies && (
                  <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                    Tech: {exp.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Educación */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <GraduationCap className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              Educación
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Formación académica y especializaciones.
            </p>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-900"
              >
                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white dark:border-slate-950"></div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  {edu.institution} ({edu.start_year} - {edu.end_year || "Presente"})
                </p>
                {edu.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
