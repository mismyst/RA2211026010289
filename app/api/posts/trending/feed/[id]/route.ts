import { NextResponse } from 'next/server';
import { Post } from '@/lib/types';

// Helper function to generate random post data (same as in feed route)
function generateFeedPosts(count: number): Post[] {
  const posts: Post[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `feed-${i}`;
    const commentCount = Math.floor(Math.random() * 30);
    
    posts.push({
      id,
      userId: `user-${i % 8 + 1}`,
      username: `user${i % 8 + 1}`,
      userAvatar: `https://avatars.dicebear.com/api/avataaars/${i % 8 + 1}.svg`,
      content: `This is feed post #${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. #Feed #Post${i}`,
      image: i % 3 === 0 ? `https://picsum.photos/seed/feed${i}/800/600` : undefined,
      commentCount,
      createdAt: new Date(Date.now() - i * 900000).toISOString(),
      comments: Array.from({ length: Math.min(commentCount, 5) }, (_, j) => ({
        id: `comment-${id}-${j}`,
        postId: id,
        userId: `user-${(i + j) % 8 + 1}`,
        username: `user${(i + j) % 8 + 1}`,
        content: `This is comment #${j + 1} on post #${i}. Lorem ipsum dolor sit amet.`,
        createdAt: new Date(Date.now() - (i * 900000) + (j * 60000)).toISOString(),
      })),
    });
  }
  
  return posts;
}