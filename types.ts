export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface MetricItem {
  id: string;
  value: string;
  description: string;
  context: string;
  iconName: 'Zap' | 'Shield' | 'TrendingUp' | 'Users' | 'CreditCard' | 'Server';
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  leetcode: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}