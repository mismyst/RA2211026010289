
// app/api/posts/trending/route.ts
import { NextResponse } from 'next/server';
import { Post } from '@/lib/types';

// Helper function to generate random post data
function generateMockPosts(count: number): Post[] {
  const posts: Post[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `post-${i + 1}`;
    const commentCount = Math.floor(Math.random() * 100);
    
    posts.push({
      id,
      userId: `user-${i % 8 + 1}`,
      username: `user${i % 8 + 1}`,
      userAvatar: `https://avatars.dicebear.com/api/avataaars/${i % 8 + 1}.svg`,
      content: `This is a sample post #${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. #Content #Sample`,
      image: i % 2 === 0 ? `https://picsum.photos/seed/${i + 1}/800/600` : undefined,
      commentCount,
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      comments: Array.from({ length: Math.min(commentCount, 5) }, (_, j) => ({
        id: `comment-${id}-${j}`,
        postId: id,
        userId: `user-${(i + j) % 8 + 1}`,
        username: `user${(i + j) % 8 + 1}`,
        content: `This is comment #${j + 1} on post #${i + 1}. Lorem ipsum dolor sit amet.`,
        createdAt: new Date(Date.now() - (i * 3600000) + (j * 300000)).toISOString(),
      })),
    });
  }
  
  return posts;
}

// Generate a larger pool of mock posts
const allMockPosts = generateMockPosts(20);

export async function GET() {
  // Find the post(s) with the maximum number of comments
  const maxCommentCount = Math.max(...allMockPosts.map(post => post.commentCount));
  const trendingPosts = allMockPosts.filter(post => post.commentCount === maxCommentCount);
  
  return NextResponse.json({ data: trendingPosts, success: true });
}