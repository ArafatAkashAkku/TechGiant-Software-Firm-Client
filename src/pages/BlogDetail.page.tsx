import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

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

interface RelatedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

const BlogDetailPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample blog data - replace with API call
  const defaultBlogs: BlogPost[] = [
    {
      id: 1,
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt:
        'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps.',
      content: `<h2>Introduction</h2>
      <p>Web development is evolving rapidly, with new technologies and frameworks emerging constantly. In 2024, we're seeing significant shifts towards AI-powered development tools, enhanced user experiences through progressive web apps, and the continued rise of serverless architectures.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial Intelligence is revolutionizing how we write code. From GitHub Copilot to ChatGPT, developers now have access to intelligent assistants that can help with everything from debugging to generating entire functions. These tools are not replacing developers but rather augmenting their capabilities, allowing them to focus on higher-level problem-solving and creative solutions.</p>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>Progressive Web Apps continue to bridge the gap between web and native applications. With improved offline capabilities, push notifications, and app-like experiences, PWAs are becoming the go-to solution for businesses looking to provide seamless user experiences across all devices.</p>
      
      <h2>Serverless Architecture</h2>
      <p>Serverless computing is gaining momentum as organizations seek to reduce infrastructure management overhead. With platforms like AWS Lambda, Vercel Functions, and Netlify Functions, developers can focus on writing code without worrying about server provisioning, scaling, or maintenance.</p>
      
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is bringing computation closer to users, reducing latency and improving performance. Content Delivery Networks (CDNs) are evolving into edge computing platforms, enabling developers to run code at the edge for faster, more responsive applications.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting and full of possibilities. By staying informed about these trends and continuously learning new technologies, developers can build better, faster, and more user-friendly applications. The key is to embrace change while maintaining a solid foundation in web development fundamentals.</p>`,
      author: 'Sarah Johnson',
      publishDate: '2024-01-15',
      category: 'Technology',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%234F46E5"/%3E%3Ctext x="400" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EWeb Development Trends 2024%3C/text%3E%3C/svg%3E',
      readTime: 5,
      tags: ['Web Development', 'Technology', 'Trends', 'AI', 'PWA'],
    },
    {
      id: 2,
      title: 'Building Scalable Applications with Microservices Architecture',
      excerpt:
        'Learn how microservices can help you build more maintainable and scalable applications for your business.',
      content: `<h2>What are Microservices?</h2>
      <p>Microservices architecture has become a cornerstone of modern application development. By breaking down monolithic applications into smaller, independent services, organizations can achieve better scalability, maintainability, and deployment flexibility.</p>
      
      <h2>Benefits of Microservices</h2>
      <p>The microservices approach offers several advantages over traditional monolithic architectures:</p>
      <ul>
        <li><strong>Scalability:</strong> Each service can be scaled independently based on demand</li>
        <li><strong>Technology Diversity:</strong> Different services can use different programming languages and databases</li>
        <li><strong>Fault Isolation:</strong> Failure in one service doesn't bring down the entire application</li>
        <li><strong>Team Independence:</strong> Different teams can work on different services simultaneously</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      <p>While microservices offer many benefits, they also introduce complexity:</p>
      <ul>
        <li>Network communication overhead</li>
        <li>Data consistency challenges</li>
        <li>Increased operational complexity</li>
        <li>Service discovery and load balancing</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>To successfully implement microservices, consider these best practices:</p>
      <ul>
        <li>Start with a monolith and extract services gradually</li>
        <li>Design services around business capabilities</li>
        <li>Implement proper monitoring and logging</li>
        <li>Use API gateways for external communication</li>
        <li>Implement circuit breakers for fault tolerance</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Microservices architecture is not a silver bullet, but when implemented correctly, it can provide significant benefits for large-scale applications. The key is to understand your requirements and gradually evolve your architecture as your application grows.</p>`,
      author: 'Michael Chen',
      publishDate: '2024-01-10',
      category: 'Architecture',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%2310B981"/%3E%3Ctext x="400" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EMicroservices Architecture%3C/text%3E%3C/svg%3E',
      readTime: 8,
      tags: ['Architecture', 'Microservices', 'Scalability', 'Backend'],
    },
    {
      id: 3,
      title: 'UI/UX Design Principles for Better User Engagement',
      excerpt:
        'Discover essential design principles that can significantly improve user engagement and conversion rates.',
      content: `<h2>The Importance of Good Design</h2>
      <p>Great user interface and user experience design is crucial for the success of any digital product. This article covers fundamental design principles including visual hierarchy, color psychology, typography, and user flow optimization.</p>
      
      <h2>Visual Hierarchy</h2>
      <p>Visual hierarchy guides users through your content in order of importance. Use size, color, contrast, and spacing to create a clear path for the user's eye to follow.</p>
      
      <h2>Color Psychology</h2>
      <p>Colors evoke emotions and can significantly impact user behavior. Understanding color psychology helps you choose the right palette for your brand and user interface:</p>
      <ul>
        <li><strong>Blue:</strong> Trust, reliability, professionalism</li>
        <li><strong>Green:</strong> Growth, harmony, freshness</li>
        <li><strong>Red:</strong> Urgency, excitement, passion</li>
        <li><strong>Orange:</strong> Energy, enthusiasm, creativity</li>
      </ul>
      
      <h2>Typography Matters</h2>
      <p>Typography is more than just choosing fonts. It's about creating readable, accessible, and aesthetically pleasing text that enhances the user experience. Consider font pairing, line height, letter spacing, and contrast.</p>
      
      <h2>User Flow Optimization</h2>
      <p>A smooth user flow reduces friction and improves conversion rates. Map out user journeys, identify pain points, and streamline the path to conversion. Every click should have a purpose.</p>
      
      <h2>Mobile-First Design</h2>
      <p>With mobile traffic dominating web usage, designing for mobile first ensures your interface works well on all devices. Start with the smallest screen and progressively enhance for larger screens.</p>
      
      <h2>Accessibility</h2>
      <p>Design for everyone by following accessibility guidelines. Use proper contrast ratios, provide alt text for images, ensure keyboard navigation, and test with screen readers.</p>
      
      <h2>Conclusion</h2>
      <p>Good design is invisible to users but makes their experience effortless and enjoyable. By following these principles and continuously testing with real users, you can create interfaces that not only look great but also drive results.</p>`,
      author: 'Emily Rodriguez',
      publishDate: '2024-01-05',
      category: 'Design',
      image:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23F59E0B"/%3E%3Ctext x="400" y="200" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EUI/UX Design Principles%3C/text%3E%3C/svg%3E',
      readTime: 6,
      tags: ['Design', 'UI/UX', 'User Experience', 'Typography'],
    },
  ];

  // Fetch blog post from API
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!blogId) {
          setError('Blog ID not provided');
          setLoading(false);
          return;
        }

        // Fetch blog post and related posts concurrently
        const [blogResponse, relatedResponse] = await Promise.all([
          axios.get(`/api/v1/blog/posts/${blogId}`),
          axios.get(`/api/v1/blog/posts/${blogId}/related?limit=3`),
        ]);

        const blogData = blogResponse.data.data;
        const relatedData = relatedResponse.data.data || [];

        if (blogData) {
          setBlog(blogData);
          setRelatedPosts(
            relatedData.map((b: any) => ({
              id: b.id,
              title: b.title,
              excerpt: b.excerpt,
              image: b.image,
              category: b.category,
            }))
          );
        } else {
          setError('Blog post not found');
        }
      } catch (error: any) {
        console.error('Error fetching blog:', error);
        if (error.response?.status === 404) {
          setError('Blog post not found');
        } else {
          setError('Failed to load blog post');
          // Fallback to default blogs on error
          const foundBlog = defaultBlogs.find(b => b.id === parseInt(blogId || '0'));
          if (foundBlog) {
            setBlog(foundBlog);
            const related = defaultBlogs
              .filter(b => b.category === foundBlog.category && b.id !== foundBlog.id)
              .slice(0, 3)
              .map(b => ({
                id: b.id,
                title: b.title,
                excerpt: b.excerpt,
                image: b.image,
                category: b.category,
              }));
            setRelatedPosts(related);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            {error || 'Blog post not found'}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-4 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              to="/blog"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Blog
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{blog.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {blog.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
              <span className="font-medium">{blog.author}</span>
              <span className="mx-2">•</span>
              <span>
                {new Date(blog.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="mx-2">•</span>
              <span>{blog.readTime} min read</span>
            </div>

            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {blog.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Share this article
            </h3>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                Twitter
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors duration-200">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white dark:bg-gray-800 py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group block bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;
