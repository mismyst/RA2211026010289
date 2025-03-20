// lib/types.ts

export interface User {
    id: string;
    username: string;
    name: string;
    avatar: string;
    postCount: number;
  }
  
  export interface Comment {
    id: string;
    postId: string;
    userId: string;
    username: string;
    content: string;
    createdAt: string;
  }
  
  export interface Post {
    id: string;
    userId: string;
    username: string;
    userAvatar: string;
    content: string;
    image?: string;
    commentCount: number;
    comments?: Comment[];
    createdAt: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
  }