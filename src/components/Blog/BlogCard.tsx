import React from 'react';
import { type BlogPost } from '../../types/blog.types';
import { Card } from '../ui/Card';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {post.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <div className="flex space-x-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};