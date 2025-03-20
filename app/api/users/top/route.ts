// app/api/users/top/route.ts
import { NextResponse } from 'next/server';
import { User } from '@/lib/types';

// Mock data for demonstration
const mockUsers: User[] = [
  { id: '1', username: 'johndoe', name: 'John Doe', avatar: 'https://avatars.dicebear.com/api/avataaars/1.svg', postCount: 156 },
  { id: '2', username: 'janedoe', name: 'Jane Doe', avatar: 'https://avatars.dicebear.com/api/avataaars/2.svg', postCount: 143 },
  { id: '3', username: 'mikesmith', name: 'Mike Smith', avatar: 'https://avatars.dicebear.com/api/avataaars/3.svg', postCount: 98 },
  { id: '4', username: 'sarahjones', name: 'Sarah Jones', avatar: 'https://avatars.dicebear.com/api/avataaars/4.svg', postCount: 87 },
  { id: '5', username: 'robwilson', name: 'Rob Wilson', avatar: 'https://avatars.dicebear.com/api/avataaars/5.svg', postCount: 75 },
  { id: '6', username: 'emilybrown', name: 'Emily Brown', avatar: 'https://avatars.dicebear.com/api/avataaars/6.svg', postCount: 62 },
  { id: '7', username: 'alexgreen', name: 'Alex Green', avatar: 'https://avatars.dicebear.com/api/avataaars/7.svg', postCount: 58 },
  { id: '8', username: 'chrismiller', name: 'Chris Miller', avatar: 'https://avatars.dicebear.com/api/avataaars/8.svg', postCount: 45 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam) : 5;
  
  // Sort users by post count and get the top N
  const topUsers = [...mockUsers]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, limit);
  
  return NextResponse.json({ data: topUsers, success: true });
}