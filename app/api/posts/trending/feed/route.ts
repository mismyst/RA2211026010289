import { NextResponse } from 'next/server';
import { Post } from '@/lib/types';

// Helper function to generate random post data for the feed
function generateFeedPosts(count: number, offset: number = 0): Post[] {
  const posts: Post[] = [];
  
  for (let i = 0; i < count; i++) {
    const index = offset + i;
    const id = `feed-${index}`;
    const commentCount = Math.floor(Math.random() * 30);
    
    posts.push({
      id,
      userId: `user-${index % 8 + 1}`,
      username: `user${index % 8 + 1}`,
      userAvatar: `https://avatars.dicebear.com/api/avataaars/${index % 8 + 1}.svg`,
      content: `This is feed post #${index}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. #Feed #Post${index}`,
      image: index % 3 === 0 ? `https://picsum.photos/seed/feed${index}/800/600` : undefined,
      commentCount,
      createdAt: new Date(Date.now() - index * 900000).toISOString(),
    });
  }
  
  return posts;
}

// Global storage to simulate a database
let feedPosts: Post[] = generateFeedPosts(30);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');
  
  const page = pageParam ? parseInt(pageParam) : 1;
  const limit = limitParam ? parseInt(limitParam) : 10;
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  // Sort by creation date (newest first)
  const sortedPosts = [...feedPosts].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
  
  // Simulate a delay for network request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json({
    data: paginatedPosts,
    success: true,
    meta: {
      page,
      limit,
      total: feedPosts.length,
      hasMore: endIndex < feedPosts.length,
    },
  });
}

// POST method to add a new post (for demonstration)
export async function POST(request: Request) {
  const body = await request.json();
  
  if (!body.content || !body.userId || !body.username) {
    return NextResponse.json(
      { success: false, message: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  const newPost: Post = {
    id: `feed-${Date.now()}`,
    userId: body.userId,
    username: body.username,
    userAvatar: body.userAvatar || `https://avatars.dicebear.com/api/avataaars/${Date.now()}.svg`,
    content: body.content,
    image: body.image,
    commentCount: 0,
    createdAt: new Date().toISOString(),
  };
  
  // Add to the beginning of the array
  feedPosts = [newPost, ...feedPosts];
  
  return NextResponse.json({ data: newPost, success: true });
}
