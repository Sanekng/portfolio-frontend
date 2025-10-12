import axios from 'axios';
import {type BlogPost, type BlogListResponse} from "../types/blog.types";
import {type Project, type ProjectListResponse} from "../types/project.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
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

// Health check
export const healthCheck = (): Promise<{ success: boolean; message: string }> =>
  api.get('/health').then(response => response.data);