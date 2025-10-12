import React from 'react';
import { BlogCard } from '../components/Blog/BlogCard';
import { useBlogPosts } from '../hooks/useBlogPosts';

export const Blog: React.FC = () => {
  const { posts, loading, error } = useBlogPosts();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights about web development, programming, 
          and the technologies I work with.
        </p>
      </div>

      {error && (
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
          {posts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg">No blog posts yet</div>
              <div className="text-gray-400">Check back later for new content!</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};