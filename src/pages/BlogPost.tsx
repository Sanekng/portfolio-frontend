import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { type BlogPost as BlogPostType } from '../types/blog.types';
import { blogService } from '../services/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No blog post specified');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await blogService.getPostBySlug(slug);
        setPost(response.data);
      } catch (err: any) {
        setError('Blog post not found');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (

      <div className="max-w-4xl mx-auto py-8">
        <Card className="p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </Card>
      </div>

    );
  }

  if (error || !post) {
    return (

      <div className="max-w-4xl mx-auto py-8">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested blog post could not be found.'}</p>
          <Button as="a" href="/blog">
            Back to Blog
          </Button>
        </Card>
      </div>

    );
  }

  return (

    <div className="max-w-4xl mx-auto py-8">
      <article className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <header className="border-b border-gray-200 px-8 py-6">

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
            {post.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="px-8 py-6">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="px-8 py-6">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
          />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <Button as="a" href="/blog" variant="secondary">
              ← Back to Blog
            </Button>
            <div className="text-sm text-gray-500">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </footer>
      </article>
    </div>

  );
};

// Helper function to format blog content (basic markdown to HTML)
const formatBlogContent = (content: string): string => {
  // Simple markdown formatting - you can enhance this
  return content
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/# (.*?)(\n|$)/g, '<h1>$1</h1>')
    .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>')
    .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .split('\n')
    .map(line => line.trim() ? `<p>${line}</p>` : '')
    .join('');
};