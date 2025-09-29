export interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  category: string;
  image_url: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  rating: number;
  photo_url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  social_links: any;
}



export interface Stat {
  id: number;
  label: string;
  value: number;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface AboutContent {
  id: number;
  section: string;
  title: string;
  content: string;
  image_url?: string;
  order: number;
}

export interface ContactInfo {
  id: number;
  type: string;
  value: string;
  icon: string;
  order: number;
}
export interface Research {
  id: number;
  title: string;
  summary: string;
  description: string;
  lead_researcher: string;
  research_team: string[];
  duration: string;
  status: 'ongoing'|'completed'|'upcoming';
  category: string;
  tags: string[];
  publications: string[];
  funding_source: string;
  budget: number;
  start_date: string;
  end_date: string;
  image_url: string;
  project_link: string;
  findings: string;
  impact: string;
  created_at: string;
  updated_at: string;
}

export interface ResearchCategory {
  id: number;
  name: string;
  description: string;
  research_count: number;
}