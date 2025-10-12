import { useState, useEffect } from 'react';
import { type Project } from '../types/project.types';
import { projectService } from '../services/api';

export const useProjects = (category?: string) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await projectService.getProjects(category);
        setProjects(response.data);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [category]);

  return { projects, loading, error };
};