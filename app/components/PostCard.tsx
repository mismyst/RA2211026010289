import Image from 'next/image';
import { Post } from '@/lib/types';
import { useState } from 'react';

interface PostCardProps {
  post: Post;
  isTrending?: boolean;
}

export default function PostCard({ post, isTrending = false }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={`card mb-6 ${isTrending ? 'border-2 border-accent' : ''}`}>
      {isTrending && (
        <div className="absolute -top-3 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
          Trending
        </div>
      )}
      
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex-shrink-0 relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={post.userAvatar}
            alt={post.username}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        
        <div>
          <p className="font-medium">@{post.username}</p>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
      </div>
      
      <p className="mb-4">{post.content}</p>
      
      {post.image && (
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt="Post image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
          <span>{post.commentCount} comments</span>
        </button>
      </div>
      
      {showComments && post.comments && post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Comments</h4>
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded-md mb-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">@{comment.username}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}