import { useState, useEffect } from 'react';
import { type BlogPost } from '../types/blog.types';
import { blogService } from '../services/api';

export const useBlogPosts = (page = 1, limit = 10) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogService.getPosts(page, limit);
        setPosts(response.data);
        setPagination(response.pagination || null);
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]);

  return { posts, loading, error, pagination };
};