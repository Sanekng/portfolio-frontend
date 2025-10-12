import React from 'react';
import { type Project } from '../../types/project.types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>
      
      <div className="flex space-x-3 pt-4 border-t border-gray-100">
        <Button
          as="a"
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className="flex-1 text-center"
        >
          Code
        </Button>
        {project.liveUrl && (
          <Button
            as="a"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center"
          >
            Live Demo
          </Button>
        )}
      </div>
    </Card>
  );
};