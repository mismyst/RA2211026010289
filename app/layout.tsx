
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Social Media Analytics Dashboard',
  description: 'A real-time analytics dashboard for social media data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Include Tailwind CSS via CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <a href="/" className="text-xl font-bold text-blue-500">
                Social Media Analytics
              </a>
              
              <div className="flex space-x-4">
                <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Home
                </a>
                <a href="/TopUser" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Top Users
                </a>
                <a href="/TrendingPage" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Trending Posts
                </a>
                <a href="/Feed" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Feed
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}