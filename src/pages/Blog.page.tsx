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

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extended blog data - can be replaced with API call
  const defaultBlogs: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt:
        'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
      content:
        "Web development is evolving rapidly, with new technologies and frameworks emerging constantly. In 2024, we're seeing significant shifts towards AI-powered development tools, enhanced user experiences through progressive web apps, and the continued rise of serverless architectures.",
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
        'Microservices architecture has become a cornerstone of modern application development. By breaking down monolithic applications into smaller, independent services, organizations can achieve better scalability, maintainability, and deployment flexibility.',
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
        'Great user interface and user experience design is crucial for the success of any digital product. This article covers fundamental design principles including visual hierarchy, color psychology, typography, and user flow optimization.',
      author: 'Emily Rodriguez',
      publishDate: '2024-01-05',
      category: 'Design',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%23F59E0B"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EUI/UX Design%3C/text%3E%3C/svg%3E',
      readTime: 6,
      tags: ['Design', 'UI/UX', 'User Experience'],
    },
    {
      id: 4,
      title: 'DevOps Best Practices for Modern Development Teams',
      excerpt:
        'Implement DevOps practices that streamline your development workflow and improve deployment reliability.',
      content:
        'DevOps has revolutionized how development teams collaborate and deploy software. This comprehensive guide covers essential DevOps practices including CI/CD pipelines, infrastructure as code, monitoring, and automated testing.',
      author: 'David Kim',
      publishDate: '2024-01-01',
      category: 'DevOps',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%23EF4444"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EDevOps%3C/text%3E%3C/svg%3E',
      readTime: 7,
      tags: ['DevOps', 'CI/CD', 'Automation'],
    },
    {
      id: 5,
      title: 'Mobile App Development: Native vs Cross-Platform',
      excerpt:
        'Compare different mobile development approaches and choose the right strategy for your project.',
      content:
        "Choosing between native and cross-platform mobile development can significantly impact your project's success. This article explores the pros and cons of each approach, popular frameworks, and decision factors.",
      author: 'Lisa Wang',
      publishDate: '2023-12-28',
      category: 'Mobile',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%238B5CF6"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EMobile Development%3C/text%3E%3C/svg%3E',
      readTime: 6,
      tags: ['Mobile', 'React Native', 'Flutter'],
    },
    {
      id: 6,
      title: 'Cloud Computing Strategies for Startups',
      excerpt:
        'Learn how startups can leverage cloud computing to scale efficiently while managing costs.',
      content:
        'Cloud computing offers startups unprecedented opportunities to scale their infrastructure without massive upfront investments. This guide covers cloud strategies, cost optimization, and best practices for growing companies.',
      author: 'Alex Thompson',
      publishDate: '2023-12-25',
      category: 'Cloud',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"%3E%3Crect width="400" height="250" fill="%2306B6D4"/%3E%3Ctext x="200" y="130" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3ECloud Computing%3C/text%3E%3C/svg%3E',
      readTime: 5,
      tags: ['Cloud', 'AWS', 'Startups'],
    },
  ];

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(defaultBlogs.map(blog => blog.category)))];

  // Fetch all blogs - replace URL with your actual API endpoint
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        // Uncomment and replace with your actual API call
        // const response = await axios.get('/api/blogs');
        // setBlogs(response.data);

        // Simulate API call delay
        setBlogs(defaultBlogs);
        setFilteredBlogs(defaultBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        // Fallback to default blogs on error
        setBlogs(defaultBlogs);
        setFilteredBlogs(defaultBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on category and search term
  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        blog =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
  }, [blogs, selectedCategory, searchTerm]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  // No blogs found state (when no blogs exist at all)
  if (!loading && blogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Our <span className="text-blue-600 dark:text-blue-400">Blog</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Insights, tutorials, and industry trends from our team of experts.
              </p>
            </div>
          </div>
        </div>

        {/* No Blogs Found */}
        <div className="container mx-auto px-6 lg:px-8 py-16">
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
                No Blog Posts Available
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-blue-600 dark:text-blue-400">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and industry trends from our team of experts.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-20 w-20 text-gray-400 dark:text-gray-600 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                No Articles Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No articles match your current search criteria. Try adjusting your filters or search
                terms.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  <svg
                    className="mr-2 w-4 h-4"
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
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
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

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.slice(0, 3).map((tag, index) => (
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
        )}
      </div>
    </div>
  );
};

export default BlogPage;
