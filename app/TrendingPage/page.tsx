'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/lib/types';
import { getTrendingPosts } from '@/lib/api';
import PostCard from '@/app/components/PostCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function TrendingPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendingPosts() {
      try {
        setLoading(true);
        const response = await getTrendingPosts();
        
        if (response.success && response.data) {
          setPosts(response.data);
        } else {
          setError('Failed to fetch trending posts. Please try again later.');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch trending posts. Please try again later.');
        setLoading(false);
      }
    }

    fetchTrendingPosts();
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Trending Posts</h1>
        <p className="text-gray-600">
          Posts with the highest engagement and comment count
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No trending posts found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} isTrending={true} />
          ))}
        </div>
      )}
    </div>
  );
}