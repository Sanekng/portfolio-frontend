export interface Project {
  _id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectListResponse {
  success: boolean;
  data: Project[];
}