export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Social Media Analytics Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Get real-time insights about users, posts, and engagement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <a href="/top-users" className="no-underline">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg card">
            <div className="bg-blue-100 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Top Users</h2>
            <p className="text-gray-600">
              Discover users with the highest number of posts
            </p>
          </div>
        </a>

        <a href="/trending-posts" className="no-underline">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg card">
            <div className="bg-indigo-100 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-indigo-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Trending Posts</h2>
            <p className="text-gray-600">
              View posts with the highest engagement
            </p>
          </div>
        </a>

        <a href="/feed" className="no-underline">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg card">
            <div className="bg-green-100 p-4 rounded-full mb-4 mx-auto w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Real-time Feed</h2>
            <p className="text-gray-600">
              Stay updated with the newest posts
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}