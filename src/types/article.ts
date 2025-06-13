/**
 * Article-related types and interfaces
 */

export enum ArticleStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

export interface ArticleTag {
  id: string;
  name: string;
  slug: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  status: ArticleStatus;
  featuredImage?: string;
  tags: ArticleTag[];
  readTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  viewCount: number;
  likeCount: number;
}

export interface ArticleComment {
  id: string;
  articleId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: string;
  likeCount: number;
}
