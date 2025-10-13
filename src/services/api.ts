import axios from 'axios';
import { type BlogPost, type BlogListResponse} from '../types/blog.types'
import { type Project, type ProjectListResponse } from '../types/project.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-gray-phi.vercel.app/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received - Check if backend is running');
    }
    
    return Promise.reject(error);
  }
);

// Your existing service functions remain the same...
export const blogService = {
  getPosts: (page = 1, limit = 10): Promise<BlogListResponse> => 
    api.get(`/blog?page=${page}&limit=${limit}`).then(response => response.data),
  
  getPostBySlug: (slug: string): Promise<{ success: boolean; data: BlogPost }> => 
    api.get(`/blog/${slug}`).then(response => response.data),
  
  getPostsByTag: (tag: string): Promise<BlogListResponse> => 
    api.get(`/blog/tag/${tag}`).then(response => response.data),
};

export const projectService = {
  getProjects: (category?: string): Promise<ProjectListResponse> => {
    const params = category ? { category } : {};
    return api.get('/projects', { params }).then(response => response.data);
  },
  
  getFeaturedProjects: (): Promise<ProjectListResponse> => 
    api.get('/projects/featured').then(response => response.data),
  
  getProjectById: (id: string): Promise<{ success: boolean; data: Project }> => 
    api.get(`/projects/${id}`).then(response => response.data),
};

export const contactService = {
  submitForm: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; message: string }> =>
    api.post('/contact', data).then(response => response.data),
};

export const healthCheck = (): Promise<{ success: boolean; message: string }> =>
  api.get('/health').then(response => response.data);


export const authService = {
  login: (data: any) =>
    api.post('/auth/login', data).then(response => response.data),
  
  register: (data: any) =>
    api.post('/auth/register', data).then(response => response.data),
  
  getMe: () =>
    api.get('/auth/me').then(response => response.data),
};