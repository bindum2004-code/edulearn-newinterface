import axios from 'axios';
import { Course, Testimonial, TeamMember, Research, Stat, ContactForm, AboutContent, ContactInfo } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Courses
  getCourses: (): Promise<Course[]> => 
    api.get('/courses').then(response => response.data),
  
  getCourse: (id: number): Promise<Course> => 
    api.get(`/courses/${id}`).then(response => response.data),

  // Testimonials
  getTestimonials: (): Promise<Testimonial[]> => 
    api.get('/testimonials').then(response => response.data),

  // Team
  getTeam: (): Promise<TeamMember[]> => 
    api.get('/team').then(response => response.data),

  // Research
  getResearch: (): Promise<Research[]> => 
    api.get('/research').then(response => response.data),

  // Stats
  getStats: (): Promise<Stat[]> => 
    api.get('/stats').then(response => response.data),

  // Contact
  submitContact: (data: ContactForm): Promise<any> => 
    api.post('/contact', data).then(response => response.data),

  // About Page Content
  getAboutContent: (): Promise<AboutContent[]> => 
    api.get('/about').then(response => response.data),

  // Contact Page Info
  getContactInfo: (): Promise<ContactInfo[]> => 
    api.get('/contact-info').then(response => response.data),
  
  
}

export default api;