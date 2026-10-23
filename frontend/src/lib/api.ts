import { Project, Skill, Experience, Education, ContactMessage } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchProjects(featuredOnly = false): Promise<Project[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects?featured_only=${featuredOnly}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (error) {
    console.warn("Using fallback projects data", error);
    return [
      {
        id: 1,
        title: "Portfolio Full Stack Architecture",
        slug: "portfolio-fullstack",
        summary: "Plataforma completa de portafolio profesional con Clean Architecture y microservicios modulares.",
        description: "Desarrollado con Next.js 15, FastAPI en Python 3.13, ASP.NET Core y PostgreSQL contenerizado en Docker. Implementa CI/CD con GitHub Actions.",
        technologies: "Next.js, React, TypeScript, FastAPI, ASP.NET Core, PostgreSQL, Docker",
        github_url: "https://github.com/CarlosGG03/portfolio-fullstack",
        live_url: "https://portfolio.carlosgarzon.dev",
        featured: true,
        order: 1,
      },
      {
        id: 2,
        title: "Enterprise E-Commerce API",
        slug: "enterprise-ecommerce-api",
        summary: "API de comercio electrónico de alto rendimiento con procesamiento asíncrono y autenticación JWT.",
        description: "Arquitectura hexagonal en C# .NET y FastAPI, con soporte para pasarelas de pago y cache distribuido con Redis.",
        technologies: "ASP.NET Core, FastAPI, Redis, PostgreSQL, Docker",
        github_url: "https://github.com/CarlosGG03",
        live_url: null,
        featured: true,
        order: 2,
      },
    ];
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch project");
    return await res.json();
  } catch (error) {
    console.warn(`Fallback project for slug ${slug}`, error);
    const projects = await fetchProjects();
    return projects.find((p) => p.slug === slug) || null;
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/skills`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch skills");
    return await res.json();
  } catch (error) {
    return [
      { id: 1, name: "React & Next.js", category: "Frontend", proficiency_level: 95, order: 1 },
      { id: 2, name: "TypeScript", category: "Frontend", proficiency_level: 90, order: 2 },
      { id: 3, name: "Tailwind CSS", category: "Frontend", proficiency_level: 90, order: 3 },
      { id: 4, name: "Python & FastAPI", category: "Backend", proficiency_level: 92, order: 4 },
      { id: 5, name: "C# & ASP.NET Core", category: "Backend", proficiency_level: 88, order: 5 },
      { id: 6, name: "PostgreSQL & SQLAlchemy", category: "Database", proficiency_level: 85, order: 6 },
      { id: 7, name: "Docker & CI/CD", category: "DevOps", proficiency_level: 85, order: 7 },
    ];
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/experiences`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch experiences");
    return await res.json();
  } catch (error) {
    return [
      {
        id: 1,
        role: "Senior Full Stack Software Engineer",
        company: "Software Development & Architecture",
        location: "Remoto",
        start_date: "2022",
        end_date: "Presente",
        is_current: true,
        description: "Diseño e implementación de soluciones web escalables con Clean Architecture, APIs en FastAPI y ASP.NET Core, y frontends modernos en Next.js.",
        technologies: "Next.js, TypeScript, Python, FastAPI, C#, .NET, Docker, PostgreSQL",
        order: 1,
      },
    ];
  }
}

export async function fetchEducation(): Promise<Education[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/education`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch education");
    return await res.json();
  } catch (error) {
    return [
      {
        id: 1,
        degree: "Ingeniería de Sistemas / Computación",
        institution: "Universidad",
        start_year: "2019",
        end_year: "2023",
        description: "Especialización en desarrollo de software, arquitectura de sistemas y bases de datos.",
        order: 1,
      },
    ];
  }
}

export async function sendContactMessage(message: ContactMessage): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error("Error enviando mensaje");
    return { success: true, message: "Mensaje enviado exitosamente. ¡Gracias por contactarme!" };
  } catch (error) {
    return { success: false, message: "Hubo un problema al enviar el mensaje. Intenta de nuevo más tarde." };
  }
}
