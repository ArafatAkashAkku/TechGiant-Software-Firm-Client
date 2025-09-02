import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// Types for footer data
interface ServiceLink {
  id: number;
  name: string;
  href: string;
}

interface CompanyLink {
  id: number;
  name: string;
  href: string;
}

interface ContactInfo {
  id: number;
  type: 'address' | 'phone' | 'email' | 'businessHours';
  value: string;
  icon: string;
}

interface SocialLink {
  id: number;
  name: string;
  href: string;
  ariaLabel: string;
  icon: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Services array for easy API integration
  const services: ServiceLink[] = [
    { id: 1, name: 'Web Development', href: '#' },
    { id: 2, name: 'Mobile Apps', href: '#' },
    { id: 3, name: 'Cloud Solutions', href: '#' },
    { id: 4, name: 'AI & Machine Learning', href: '#' },
    { id: 5, name: 'DevOps & Infrastructure', href: '#' },
    { id: 6, name: 'Digital Transformation', href: '#' },
  ];

  // Company links array for easy API integration
  const companyLinks: CompanyLink[] = [
    { id: 1, name: 'About Us', href: '#' },
    { id: 2, name: 'Our Team', href: '#' },
    { id: 3, name: 'Careers', href: '/careers' },
    { id: 4, name: 'Case Studies', href: '#' },
    { id: 5, name: 'Blog', href: '#' },
    { id: 6, name: 'News & Events', href: '#' },
  ];

  // Default contact information array for easy API integration
  const defaultContactInfo: ContactInfo[] = [
    {
      id: 1,
      type: 'address',
      value: '123 Tech Street, Innovation District\nSilicon Valley, CA 94000',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    },
    {
      id: 2,
      type: 'phone',
      value: '+1 (555) 123-4567',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    {
      id: 3,
      type: 'email',
      value: 'contact@techgiant.com',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
    {
      id: 4,
      type: 'businessHours',
      value: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  // Default social media links array for easy API integration
  const defaultSocialLinks: SocialLink[] = [
    {
      id: 1,
      name: 'Facebook',
      href: '#',
      ariaLabel: 'Facebook',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      id: 2,
      name: 'Twitter',
      href: '#',
      ariaLabel: 'Twitter',
      icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    },
    {
      id: 3,
      name: 'LinkedIn',
      href: '#',
      ariaLabel: 'LinkedIn',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      id: 4,
      name: 'GitHub',
      href: '#',
      ariaLabel: 'GitHub',
      icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    },
  ];

  // Fetch contact info and social links data - replace URLs with your API endpoints
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setLoading(true);
        // Replace these URLs with your actual API endpoints
        // const contactResponse = await axios.get('/api/contact-info');
        // const socialResponse = await axios.get('/api/social-links');
        // setContactInfo(contactResponse.data);
        // setSocialLinks(socialResponse.data);

        // For now, using default data
        setContactInfo(defaultContactInfo);
        setSocialLinks(defaultSocialLinks);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        // Fallback to default data on error
        setContactInfo(defaultContactInfo);
        setSocialLinks(defaultSocialLinks);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return (
      <footer className="bg-gray-900 dark:bg-gray-950 text-white min-h-96 flex items-center justify-center">
        <div className="text-gray-400 text-xl">Loading...</div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Tech<span className="text-blue-400">Giant</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Transforming businesses through innovative technology solutions. We deliver
                cutting-edge software development, cloud services, and digital transformation.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.id}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-600 transition-colors duration-200"
                  aria-label={social.ariaLabel}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map(service => (
                <li key={service.id}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(link => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Stay Connected</h4>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map(contact => (
                <div key={contact.id} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={contact.icon}
                    />
                  </svg>
                  <span className="text-gray-300 text-sm">{contact.value}</span>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div>
              <p className="text-gray-300 text-sm mb-3">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 dark:bg-gray-700 text-white border border-gray-700 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md transition-colors duration-200 text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              &copy; {currentYear} TechGiant Software Solutions. All rights reserved.
            </div>

            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Cookie Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
