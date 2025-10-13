import React, { useState, useEffect } from 'react';
import { type BlogPost } from '../../types/blog.types';
import { adminService } from '../../services/adminService';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    published: false,
    featuredImage: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await adminService.getBlogPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await adminService.updateBlogPost(editingPost._id, {
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim())
        });
      } else {
        await adminService.createBlogPost({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim())
        });
      }
      setShowForm(false);
      setEditingPost(null);
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        published: false,
        featuredImage: ''
      });
      loadPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
      published: post.published,
      featuredImage: post.featuredImage || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await adminService.deleteBlogPost(id);
        loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <Button onClick={() => setShowForm(true)}>
          New Blog Post
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={10}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="react, javascript, webdev"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm text-gray-700">Published</label>
            </div>

            <div className="flex space-x-3">
              <Button type="submit">
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                  setFormData({
                    title: '',
                    content: '',
                    excerpt: '',
                    tags: '',
                    published: false,
                    featuredImage: ''
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-1">{post.excerpt}</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                  <span>•</span>
                  <span className={post.published ? 'text-green-600' : 'text-yellow-600'}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEdit(post)}
                  variant="secondary"
                  className="text-sm"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(post._id)}
                  variant="secondary"
                  className="text-sm bg-red-100 text-red-700 hover:bg-red-200"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {posts.length === 0 && !showForm && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No blog posts yet. Create your first one!</p>
        </Card>
      )}
    </div>
  );
};