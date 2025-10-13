import axios from 'axios';
import { type BlogPost, type BlogListResponse} from '../types/blog.types';
import { type Project, type ProjectListResponse } from '../types/project.types'

// Use environment variable with fallback for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

console.log('API Base URL:', API_BASE_URL); // Debug log

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increased timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
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
      console.error('Request timeout - Backend might not be running');
    }
    
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received - Check if backend is running');
    }
    
    return Promise.reject(error);
  }
);

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

// Health check with better error handling
export const healthCheck = (): Promise<{ success: boolean; message: string }> =>
  api.get('/health').then(response => response.data);