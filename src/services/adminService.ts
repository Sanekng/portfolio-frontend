import { api } from './api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const adminService = {
  // Blog operations
  createBlogPost: (data: any) => 
    api.post('/admin/blog', data, getAuthHeaders()).then(response => response.data),

  updateBlogPost: (id: string, data: any) => 
    api.put(`/admin/blog/${id}`, data, getAuthHeaders()).then(response => response.data),

  deleteBlogPost: (id: string) => 
    api.delete(`/admin/blog/${id}`, getAuthHeaders()).then(response => response.data),

  getBlogPosts: () => 
    api.get('/admin/blog', getAuthHeaders()).then(response => response.data),

  // Project operations
  createProject: (data: any) => 
    api.post('/admin/projects', data, getAuthHeaders()).then(response => response.data),

  updateProject: (id: string, data: any) => 
    api.put(`/admin/projects/${id}`, data, getAuthHeaders()).then(response => response.data),

  deleteProject: (id: string) => 
    api.delete(`/admin/projects/${id}`, getAuthHeaders()).then(response => response.data),

  getProjects: () => 
    api.get('/admin/projects', getAuthHeaders()).then(response => response.data),
};