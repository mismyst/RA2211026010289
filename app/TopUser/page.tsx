'use client';

import { useEffect, useState } from 'react';
import { User } from '@/lib/types';
import { getTopUsers, getRandomUserAvatar } from '@/lib/api';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function TopUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopUsers() {
      try {
        setLoading(true);
        // Simulating API call for demo purposes
        // In a real app, you'd use: const response = await getTopUsers(5);
        
        // Mock data for demonstration
        const mockUsers: User[] = [
          { id: '1', username: 'johndoe', name: 'John Doe', avatar: getRandomUserAvatar(), postCount: 156 },
          { id: '2', username: 'janedoe', name: 'Jane Doe', avatar: getRandomUserAvatar(), postCount: 143 },
          { id: '3', username: 'mikesmith', name: 'Mike Smith', avatar: getRandomUserAvatar(), postCount: 98 },
          { id: '4', username: 'sarahjones', name: 'Sarah Jones', avatar: getRandomUserAvatar(), postCount: 87 },
          { id: '5', username: 'robwilson', name: 'Rob Wilson', avatar: getRandomUserAvatar(), postCount: 75 },
        ];
        
        setTimeout(() => {
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch top users. Please try again later.');
        setLoading(false);
      }
    }

    fetchTopUsers();
  }, []);

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Top Users</h1>
        <p className="text-gray-600">
          These users have created the most content on our platform
        </p>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
              {index + 1}
            </div>
            
            <div className="flex-shrink-0 relative w-16 h-16 rounded-full overflow-hidden">
              <img
                src={user.avatar}
                alt={user.name}
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-sm mt-1">
                <span className="font-medium">{user.postCount}</span> posts
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}