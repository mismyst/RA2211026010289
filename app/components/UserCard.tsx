import { User } from '@/lib/types';
import Image from 'next/image';

interface UserCardProps {
  user: User;
  rank?: number;
}

export default function UserCard({ user, rank }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
      {rank && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl">
          {rank}
        </div>
      )}
      
      <div className="flex-shrink-0 relative w-16 h-16 rounded-full overflow-hidden">
        <Image
          src={user.avatar}
          alt={user.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
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
  );
}