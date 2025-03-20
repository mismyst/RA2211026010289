import { User, Post, ApiResponse } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to handle fetch requests
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API request failed:', error);
    return { 
      data: {} as T, 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Get top users by post count
export async function getTopUsers(limit: number = 5): Promise<ApiResponse<User[]>> {
  return fetchApi<User[]>(`/users/top?limit=${limit}`);
}

// Get trending posts (posts with most comments)
export async function getTrendingPosts(): Promise<ApiResponse<Post[]>> {
  return fetchApi<Post[]>('/posts/trending');
}

// Get feed posts with pagination
export async function getFeedPosts(page: number = 1, limit: number = 10): Promise<ApiResponse<Post[]>> {
  return fetchApi<Post[]>(`/posts/feed?page=${page}&limit=${limit}`);
}

// Get post by ID
export async function getPostById(postId: string): Promise<ApiResponse<Post>> {
  return fetchApi<Post>(`/posts/${postId}`);
}

// Create a new post
export async function createPost(postData: Partial<Post>): Promise<ApiResponse<Post>> {
  return fetchApi<Post>('/posts/feed', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
}

// Random image generation helper (for demo purposes)
export function getRandomUserAvatar(): string {
  const avatarId = Math.floor(Math.random() * 1000);
  return `https://avatars.dicebear.com/api/avataaars/${avatarId}.svg`;
}

export function getRandomPostImage(): string {
  const width = 800;
  const height = 600;
  const imageId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/seed/${imageId}/${width}/${height}`;
}