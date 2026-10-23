export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  technologies: string;
  github_url?: string | null;
  live_url?: string | null;
  featured: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency_level: number;
  icon?: string | null;
  order: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  technologies?: string | null;
  order: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  start_year: string;
  end_year?: string | null;
  description?: string | null;
  order: number;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
  read?: boolean;
}
