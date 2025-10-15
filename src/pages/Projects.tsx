import React, { useState } from 'react';
import { ProjectCard } from '../components/Projects/ProjectCard';
import { useProjects } from '../hooks/useProjects';
import { Button } from '../components/ui/Button';

const categories = ['all', 'web-dev', 'mobile', 'data-science', 'devops', 'other'];

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { projects, loading, error } = useProjects(
    selectedCategory === 'all' ? undefined : selectedCategory
  );

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Currently in development...
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category.replace('-', ' ')}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      {error && (
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-lg mb-2">Currently in development</div>
              <div className="text-gray-400">
                {selectedCategory !== 'all' 
                  ? `No projects in the ${selectedCategory} category.`
                  : 'No projects available. Make sure your backend has data.'
                }
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};