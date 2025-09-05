import { useState } from 'react';
import { useAuth } from '../../context/admin/Auth.context';
import { useNavigate } from 'react-router-dom';
import OverviewTab from '../../components/admin/OverviewTab.component';
import TestimonialsTab from '../../components/admin/TestimonialsTab.component';
import ClientTab from '../../components/admin/ClientTab.component';
import HeroSliderTab from '../../components/admin/HeroSliderTab.component';
import AboutUsTab from '../../components/admin/AboutUsTab.component';
import BlogTab from '../../components/admin/BlogTab.component';
import ContactInfoTab from '../../components/admin/ContactInfoTab.component';
import ContactsTab from '../../components/admin/ContactsTab.component';
import CareerTab from '../../components/admin/CareerTab.component';
import ApplicantTab from '../../components/admin/ApplicantTab.component';

// import axios from 'axios';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate to login page even if logout API fails
      navigate('/admin/login');
    }
  };

  const tabs = [
    { id: 'heroslider', name: 'Hero Slider', icon: '🖼️' },
    { id: 'aboutus', name: 'About Us', icon: 'ℹ️' },
    { id: 'testimonials', name: 'Testimonials', icon: '💬' },
    { id: 'blog', name: 'Blog', icon: '📝' },
    { id: 'contactinfo', name: 'Contact Info', icon: '📞' },
    { id: 'contacts', name: 'Contacts', icon: '📧' },
    { id: 'career', name: 'Careers', icon: '💼' },
    { id: 'applicants', name: 'Applicants', icon: '👥' },
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'client', name: 'Client', icon: '🏢' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'testimonials':
        return <TestimonialsTab />;
      case 'client':
        return <ClientTab />;
      case 'heroslider':
        return <HeroSliderTab />;
      case 'aboutus':
        return <AboutUsTab />;
      case 'blog':
        return <BlogTab />;
      case 'contactinfo':
        return <ContactInfoTab />;
      case 'contacts':
        return <ContactsTab />;
      case 'career':
        return <CareerTab />;
      case 'applicants':
        return <ApplicantTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Welcome, {user?.username}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-4">
                <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Navigation
                </h2>
                <ul className="space-y-2">
                  {tabs.map(tab => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
