import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { fetchProjects, fetchSkills, fetchExperiences, fetchEducation } from "@/lib/api";

export default async function Home() {
  const [projects, skills, experiences, education] = await Promise.all([
    fetchProjects(),
    fetchSkills(),
    fetchExperiences(),
    fetchEducation(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section id="about" className="py-12 px-4 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
              Sobre mí
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
              Soy un desarrollador de software con sólida experiencia en la construcción de sistemas completos, desde interfaces interactivas y accesibles con <strong>Next.js y React</strong>, hasta backends de alto rendimiento y arquitectura limpia con <strong>FastAPI (Python) y ASP.NET Core (C#)</strong>. Apasionado por las buenas prácticas, CI/CD automatizado, contenedores Docker y diseño de bases de datos relacionales en PostgreSQL.
            </p>
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
