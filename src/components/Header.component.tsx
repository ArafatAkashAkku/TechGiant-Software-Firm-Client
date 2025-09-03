import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/Theme.context';

// Import Theme type
type Theme = 'light' | 'dark' | 'system';

// Navigation item types
interface LinkItem {
  type: 'link';
  to: string;
  label: string;
}

interface ButtonItem {
  type: 'button';
  action: () => void;
  label: string;
  sectionId: string;
}

type NavigationItem = LinkItem | ButtonItem;

const Header = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({ name: 'TechGiant', logo: null });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch company data from API
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        // Replace with actual API endpoint
        // const response = await fetch('/api/company-info');
        // const data = await response.json();
        // setCompanyData(data);

        // Mock data for demonstration
        setCompanyData({
          name: 'TechGiant',
          logo: null, // Set to image URL when available
        });
      } catch (error) {
        console.error('Failed to fetch company data:', error);
        setCompanyData({ name: 'TechGiant', logo: null });
      }
    };

    fetchCompanyData();
  }, []);

  // Navigation items array for mapping
  const navigationItems: NavigationItem[] = [
    { type: 'link', to: '/', label: 'Home' },
    {
      type: 'button',
      action: () => handleSectionNavigation('about'),
      label: 'About',
      sectionId: 'about',
    },
    {
      type: 'button',
      action: () => handleSectionNavigation('services'),
      label: 'Services',
      sectionId: 'services',
    },
    { type: 'link', to: '/portfolio', label: 'Portfolio' },
    { type: 'link', to: '/blog', label: 'Blog' },
    { type: 'link', to: '/careers', label: 'Careers' },
    {
      type: 'button',
      action: () => handleSectionNavigation('contact'),
      label: 'Contact',
      sectionId: 'contact',
    },
  ];

  // Theme options array for mapping
  const themeOptions: Array<{
    value: Theme;
    title: string;
    icon: React.ReactElement;
  }> = [
    {
      value: 'light',
      title: 'Light Mode',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      value: 'dark',
      title: 'Dark Mode',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ),
    },
    {
      value: 'system',
      title: 'System Mode',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  // Smooth scroll function for section navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Handle navigation with smooth scroll for home page sections
  const handleSectionNavigation = (sectionId: string, path: string = '/') => {
    if (location.pathname === path) {
      // If already on the target page, just scroll to section
      scrollToSection(sectionId);
    } else {
      // Navigate to page first, then scroll after a brief delay
      navigate(path);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          {companyData.logo ? (
            <>
              <img src={companyData.logo} alt={companyData.name} className="h-8 w-auto" />
              {companyData.name && <span>{companyData.name}</span>}
            </>
          ) : (
            <span>{companyData.name}</span>
          )}
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navigationItems.map((item, index) => {
          const baseClassName =
            'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200';

          if (item.type === 'link') {
            return (
              <Link key={index} to={item.to} className={baseClassName}>
                {item.label}
              </Link>
            );
          } else {
            return (
              <button key={index} onClick={item.action} className={baseClassName}>
                {item.label}
              </button>
            );
          }
        })}
      </nav>

      {/* Right Side - Theme Switcher & CTA */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2">
          {themeOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setTheme(option.value)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                theme === option.value
                  ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              title={option.title}
            >
              {option.icon}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => handleSectionNavigation('contact')}
          className="hidden sm:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
        >
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg">
          <nav className="px-6 py-4 space-y-4">
            {navigationItems.map((item, index) => {
              const baseClassName =
                'block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 py-2';

              if (item.type === 'link') {
                return (
                  <Link
                    key={index}
                    to={item.to}
                    className={baseClassName}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              } else {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      item.action();
                      setIsMobileMenuOpen(false);
                    }}
                    className={baseClassName}
                  >
                    {item.label}
                  </button>
                );
              }
            })}

            {/* Mobile Theme Switcher */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Theme</p>
              <div className="flex items-center gap-2">
                {themeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      theme === option.value
                        ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500/20'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    title={option.title}
                  >
                    {option.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  handleSectionNavigation('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
