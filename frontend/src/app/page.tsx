import {Navbar} from "@/components/Navbar";
import {Hero} from "@/components/Hero";
import {ProjectsSection} from "@/components/ProjectsSection";
import {SkillsSection} from "@/components/SkillsSection";
import {ExperienceSection} from "@/components/ExperienceSection";
import {ContactSection} from "@/components/ContactSection";
import {Footer} from "@/components/Footer";
import {fetchEducation, fetchExperiences, fetchProjects, fetchSkills} from "@/lib/api";
import {CheckCircle2, User} from "lucide-react";

export default async function Home() {
  const [projects, skills, experiences, education] = await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchExperiences(),
    fetchEducation(),
  ]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <main className="flex-1 space-y-24 md:space-y-32">
        <Hero />

        {/* Section: Sobre mí */}
        <section id="about" className="px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-slate-800 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-start justify-between relative z-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60 mb-4">
                  <User className="h-3.5 w-3.5" />
                  Perfil Profesional
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4">
                  Pasión por el código limpio y la arquitectura escalable
                </h2>
                <p className="text-slate-300 leading-relaxed text-base sm:text-lg mb-6">
                  Soy un desarrollador de software con sólida experiencia en la construcción de sistemas completos, desde interfaces interactivas y accesibles con <strong className="text-indigo-400 font-semibold">Next.js y React</strong>, hasta backends de alto rendimiento y arquitectura limpia con <strong className="text-purple-400 font-semibold">FastAPI (Python) y ASP.NET Core (C#)</strong>. Apasionado por las buenas prácticas, CI/CD automatizado, contenedores Docker y diseño de bases de datos relacionales en PostgreSQL.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Enfoque en Clean Code & SOLID</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>APIs RESTful seguras con JWT & OAuth2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Contenedores Docker & Docker Compose</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Pruebas unitarias e integración continua</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ExperienceSection experiences={experiences} education={education} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
