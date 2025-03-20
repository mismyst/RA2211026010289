// Update to app/feed/page.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Post } from '@/lib/types';
import { getFeedPosts, getPostById } from '@/lib/api';
import PostCard from '@/app/components/PostCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Function to fetch posts
  const fetchPosts = useCallback(async (pageNum: number, isInitial: boolean = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      
      const response = await getFeedPosts(pageNum);
      
      if (response.success && response.data) {
        if (isInitial) {
          setPosts(response.data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        }
        
        // Check if there are more posts to load
        if (response.meta && response.meta.hasMore !== undefined) {
          setHasMore(response.meta.hasMore);
        } else {
          // If no meta data, assume we've reached the end
          setHasMore(false);
        }
      } else {
        setError('Failed to fetch posts. Please try again later.');
      }
      
      if (isInitial) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Set up real-time updates
  const setupRealTimeUpdates = useCallback(() => {
    // In a real app, you would use WebSockets or Server-Sent Events
    // For this demo, we'll simulate real-time updates with polling
    const pollInterval = setInterval(async () => {
      try {
        const response = await getFeedPosts(1, 1);
        
        if (response.success && response.data && response.data.length > 0) {
          const newPost = response.data[0];
          
          // Check if the post is already in our list
          const exists = posts.some(post => post.id === newPost.id);
          
          if (!exists) {
            setPosts(prevPosts => [newPost, ...prevPosts]);
          }
        }
      } catch (error) {
        console.error('Error polling for new posts:', error);
      }
    }, 10000); // Poll every 10 seconds
    
    return () => clearInterval(pollInterval);
  }, [posts]);
 // Initial fetch
 useEffect(() => {
    fetchPosts(1, true);
    
    // Set up real-time updates
    const cleanup = setupRealTimeUpdates();
    
    return cleanup;
  }, [fetchPosts, setupRealTimeUpdates]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (loading) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );
    
    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, loadingMore]);

  // Fetch more posts when page changes
  useEffect(() => {
    if (page > 1) {
      fetchPosts(page);
    }
  }, [page, fetchPosts]);

  // Function to refresh feed
  const refreshFeed = () => {
    setPage(1);
    setPosts([]);
    fetchPosts(1, true);
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        {error}
        <button 
          onClick={refreshFeed}
          className="ml-4 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded-md text-sm transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Feed</h1>
          <p className="text-gray-600">
            See the latest posts in real-time
          </p>
        </div>
        
        <button 
          onClick={refreshFeed}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
            />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          
          {hasMore && (
            <div ref={loadMoreRef} className="py-4 text-center">
              {loadingMore ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Loading more posts...</p>
              )}
            </div>
          )}
          
          {!hasMore && (
            <div className="py-4 text-center">
              <p className="text-gray-500 text-sm">No more posts to load</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}