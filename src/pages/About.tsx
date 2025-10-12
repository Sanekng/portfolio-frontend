import React from 'react';

export const About: React.FC = () => {
  const skills = [
    'JavaScript/TypeScript', 'React', 'Node.js', 'Python', 'MongoDB', 
    'PostgreSQL', 'Docker', 'AWS', 'Git', 'REST APIs'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-gray-600 mb-4">
              I'm a passionate full-stack developer with a love for creating efficient, 
              scalable, and user-friendly applications. My journey in tech started...
            </p>
            <p className="text-gray-600 mb-4">
              I enjoy solving complex problems and continuously learning new technologies 
              to stay at the forefront of web development.
            </p>
            <p className="text-gray-600">
              When I'm not coding, you can find me exploring new frameworks, contributing 
              to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </div>

        {/* Skills Sidebar */}
        <div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};