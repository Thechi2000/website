export interface Job {
  title: string;
  url: string;
  time: string;
  description: string;
  context: string;
  using: string[];
}

export interface Education {
  title: string;
  location: string;
  time: string;
  courses: string[];
  projects: string[];
}

export interface Skills {
  name: string;
  category: string;
  type: "lang" | "lib" | "tool" | "other";
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
