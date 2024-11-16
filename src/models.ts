export interface Job {
  title: string;
  url: string;
  time: string;
  description: string;
  context: string;
  using: string[];
}

export type Skills =
  | ({ [category: string]: Skills } & { tier?: number })
  | string[];
export interface Education {
  title: string;
  description: string;
  location: string;
  time: string;
  courses: string[];
  projects: string[];
}

export interface Me {
  address: string;
  mail: string;
  url: string;
}

export interface Socials {
  name: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  languages: string[];
  repository?: string;
  markdownUrl?: string;
}

export interface Data {
  skills: Skills;
  jobs: Job[];
  education: Education[];
  projects: Project[];
}
