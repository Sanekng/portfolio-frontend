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
          <div className="card relative p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-gray-400 mb-1">“Intellectual growth should commence at birth and cease only at death.”</p>
            <p className="text-gray-400 mb-4"> – Albert Einstein</p>
            <p className="text-gray-600 mb-4">
              I’m a motivated and curious developer who sees technology as a bridge between ideas and real-world impact. My passion lies in solving problems through consistency, creativity, and innovation. Currently, I’m developing as a backend programmer with a strong focus on scalability and efficiency, while continuously growing toward becoming a full-stack developer and, one day, a team leader.
            </p>
            <p className="text-gray-600 mb-4">
              Throughout my studies at the University of Donja Gorica, I’ve had the opportunity to work on projects that pushed me to think critically and collaborate effectively. One of my proudest achievements is AI4S3, a team project where we built a speech transcription and emotion analysis tool using NLP techniques. The project stood out for its originality and earned recognition and an award at our university.
            </p>
            <p className="text-gray-600 mb-4">
              Later, as part of the AdVista team, I helped present a mobile application concept to over 30 investors. My role involved pitching and supporting the presentation in multiple languages, which contributed to securing interest and positive feedback from investors. That experience helped me combine my technical skills with communication and presentation abilities — a balance I continue to build upon.
            </p>
            <p className="text-gray-600 mb-4">
              Experimenting with new technologies and applying what I learn keeps my mind sharp and my creativity flowing. I’m deeply interested in AI, backend architecture, and product design — but I also value teamwork, community, and the human side of technology.
            </p>
            <p className="text-gray-600 mb-4">
              When I’m not coding, you’ll probably find me out socializing, exploring new places, or cycling through Montenegro’s scenic routes. I believe that meaningful work starts with curiosity — and I’m always ready for the next challenge that keeps me learning, building, and growing.
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