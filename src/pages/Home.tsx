import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Project } from '../types/project.types';
import { projectService, healthCheck } from '../services/api';
import { ProjectCard } from '../components/Projects/ProjectCard';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check server health
                await healthCheck();
                setServerStatus('online');

                // Fetch featured projects
                const response = await projectService.getFeaturedProjects();
                setFeaturedProjects(response.data);
            } catch (error) {
                setServerStatus('offline');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="text-center py-16">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Hi, I'm{' '}
                    <span className="text-primary-600">Your Name</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    A passionate developer building amazing web experiences with modern technologies.
                    Welcome to my digital portfolio.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button as="a" href="/projects">
                        View My Work
                    </Button>
                    <Button as="a" href="/contact" variant="secondary">
                        Get In Touch
                    </Button>
                </div>
            </section>

            {/* Server Status */}
            <div className={`text-center mb-12 p-4 rounded-lg ${serverStatus === 'online' ? 'bg-green-100 text-green-800' :
                serverStatus === 'offline' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                Backend Status: {
                    serverStatus === 'online' ? '✅ Connected' :
                        serverStatus === 'offline' ? '❌ Disconnected' :
                            '⏳ Checking...'
                }
            </div>

            {/* Featured Projects */}
            <section className="mb-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
                    <Button as="a" href="/projects" variant="secondary">
                        View All
                    </Button>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
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
                        {featuredProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                        {featuredProjects.length === 0 && (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No featured projects found. Make sure your backend is running and has data.
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Quick Links */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/blog" className="card p-6 text-center hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Read My Blog</h3>
                    <p className="text-gray-600">Thoughts on development and technology</p>
                </Link>

                <Link to="/about" className="card p-6 text-center hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">About Me</h3>
                    <p className="text-gray-600">Learn more about my journey and skills</p>
                </Link>

                <Link to="/contact" className="card p-6 text-center hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Get In Touch</h3>
                    <p className="text-gray-600">Ready to start a conversation?</p>
                </Link>
            </section>
        </div>
    );
};