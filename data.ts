export interface Skill {
  name: string;
  description: string;
  level: number;
  type: string;
  language?: string;
  url: string;
}

export interface Project {
  id: string;
  priority: number;
  
  name: string;
  description: string;

  file?: string;
  url?: string;

  languages: string[];
  organization?: string;
  repository?: string;
  active: boolean;
}
