export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  tags: string[];
  published: boolean;
  featuredImage?: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}