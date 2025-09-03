import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  readTime: number;
  tags: string[];
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Default blog data - can be replaced with API call
  const defaultBlogs: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt:
        'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
      content:
        "Web development is evolving rapidly, with new technologies and frameworks emerging constantly. In 2024, we're seeing significant shifts towards AI-powered development tools, enhanced user experiences through progressive web apps, and the continued rise of serverless architectures. This comprehensive guide explores these trends and their implications for developers and businesses alike.",
      author: 'Sarah Johnson',
      publishDate: '2024-01-15',
      category: 'Technology',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%234F46E5"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EWeb Development%3C/text%3E%3C/svg%3E',
      readTime: 5,
      tags: ['Web Development', 'Technology', 'Trends'],
    },
    {
      id: 2,
      title: 'Building Scalable Applications with Microservices Architecture',
      excerpt:
        'Learn how microservices can help you build more maintainable and scalable applications for your business.',
      content:
        'Microservices architecture has become a cornerstone of modern application development. By breaking down monolithic applications into smaller, independent services, organizations can achieve better scalability, maintainability, and deployment flexibility. This article delves into the principles of microservices, best practices for implementation, and real-world case studies.',
      author: 'Michael Chen',
      publishDate: '2024-01-10',
      category: 'Architecture',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%2310B981"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EMicroservices%3C/text%3E%3C/svg%3E',
      readTime: 8,
      tags: ['Architecture', 'Microservices', 'Scalability'],
    },
    {
      id: 3,
      title: 'UI/UX Design Principles for Better User Engagement',
      excerpt:
        'Discover essential design principles that can significantly improve user engagement and conversion rates.',
      content:
        "Great user interface and user experience design is crucial for the success of any digital product. This article covers fundamental design principles including visual hierarchy, color psychology, typography, and user flow optimization. We'll explore how these principles can be applied to create more engaging and conversion-focused designs.",
      author: 'Emily Rodriguez',
      publishDate: '2024-01-05',
      category: 'Design',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%23F59E0B"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EUI/UX Design%3C/text%3E%3C/svg%3E',
      readTime: 6,
      tags: ['Design', 'UI/UX', 'User Experience'],
    },
  ];

  // Fetch blog data - replace URL with your actual API endpoint
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        // Uncomment and replace with your actual API call
        // const response = await axios.get('/api/blogs?limit=3');
        // setBlogs(response.data);

        // Simulate API call delay
        setBlogs(defaultBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback to default blogs on error
        setBlogs(defaultBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  // No blogs found state
  if (!loading && blogs.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest <span className="text-blue-600 dark:text-blue-400">Blog Posts</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest insights, trends, and best practices in technology and
              development.
            </p>
          </div>

          {/* No Blogs Found */}
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Blog Posts Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We are working on creating amazing content for you. Check back soon for the latest
                insights and updates!
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest <span className="text-blue-600 dark:text-blue-400">Blog Posts</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in technology and
            development.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map(blog => (
            <article
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{blog.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(blog.publishDate).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime} min read</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <Link
                  to={`/blog/${blog.id}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                >
                  Read More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View More Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
