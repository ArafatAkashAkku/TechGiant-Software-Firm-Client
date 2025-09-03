import { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth.context';
import { useNavigate } from 'react-router-dom';
import { useSiteSettings } from '../context/SiteSettings.context';
// import axios from 'axios';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Site Settings from Context
  const { siteSettings, updateSiteSettings } = useSiteSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // About Us Content State
  const [aboutUsData, setAboutUsData] = useState({
    statistics: [
      { id: 1, value: 500, label: 'Projects Completed', icon: '📊', suffix: '+' },
      { id: 2, value: 50, label: 'Happy Clients', icon: '😊', suffix: '+' },
      { id: 3, value: 10, label: 'Years Experience', icon: '🏆', suffix: '+' },
      { id: 4, value: 24, label: 'Support Available', icon: '🛠️', suffix: '/7' },
    ],
    storyContent: {
      id: 1,
      title: 'Our Story',
      paragraphs: [
        'Founded in 2014, TechGiant began as a small team of passionate developers with a vision to bridge the gap between complex technology and business needs. What started as a startup has grown into a trusted partner for companies worldwide.',
        "Over the years, we've evolved from a local development shop to a full-service technology consultancy, helping businesses of all sizes navigate their digital transformation journey with confidence and success.",
        'Today, we continue to push boundaries, embrace emerging technologies, and deliver solutions that not only meet current needs but anticipate future challenges.',
      ],
    },
    missionContent: {
      id: 1,
      mission:
        'To empower businesses with innovative software solutions that drive growth, efficiency, and competitive advantage in the digital age.',
      vision:
        "To be the leading technology partner that transforms ideas into reality and helps businesses thrive in tomorrow's digital landscape.",
    },
    companyInfo: {
      id: 1,
      name: 'TechGiant',
      description:
        'We are a forward-thinking software development company dedicated to transforming businesses through innovative technology solutions.',
    },
  });
  const [aboutUsLoading, setAboutUsLoading] = useState(false);
  const [aboutUsSaveMessage, setAboutUsSaveMessage] = useState('');

  // Site settings are now managed by the SiteSettingsProvider context
  // No need for local API functions or useEffect to load settings

  // Handle form input changes
  const handleSettingChange = (field: any, value: any) => {
    updateSiteSettings({
      [field]: value,
    });
  };

  // Handle form submission
  const handleSaveSettings = async () => {
    setIsLoading(true);
    setSaveMessage('');

    try {
      // Settings are automatically saved through the context
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveMessage('Failed to save settings. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Meta tags are now automatically updated by the SiteSettingsProvider

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still navigate to login page even if logout API fails
      navigate('/admin/login');
    }
  };

  // About Us API Functions (commented for future backend integration)
  const fetchAboutUsData = async () => {
    try {
      setAboutUsLoading(true);
      // TODO: Replace with actual API calls
      // const [statsRes, storyRes, missionRes, companyRes] = await Promise.all([
      //   axios.get('/api/about-us/statistics'),
      //   axios.get('/api/about-us/story'),
      //   axios.get('/api/about-us/mission'),
      //   axios.get('/api/about-us/company')
      // ]);
      // setAboutUsData({
      //   statistics: statsRes.data,
      //   storyContent: storyRes.data,
      //   missionContent: missionRes.data,
      //   companyInfo: companyRes.data
      // });

      // Mock implementation using localStorage
      const savedAboutUs = localStorage.getItem('aboutUsData');
      if (savedAboutUs) {
        setAboutUsData(JSON.parse(savedAboutUs));
      }
    } catch (error) {
      console.error('Error fetching About Us data:', error);
    } finally {
      setAboutUsLoading(false);
    }
  };

  const saveAboutUsData = async () => {
    try {
      setAboutUsLoading(true);
      setAboutUsSaveMessage('');

      // TODO: Replace with actual API calls
      // await Promise.all([
      //   axios.put('/api/about-us/statistics', aboutUsData.statistics),
      //   axios.put('/api/about-us/story', aboutUsData.storyContent),
      //   axios.put('/api/about-us/mission', aboutUsData.missionContent),
      //   axios.put('/api/about-us/company', aboutUsData.companyInfo)
      // ]);

      // Mock implementation using localStorage
      localStorage.setItem('aboutUsData', JSON.stringify(aboutUsData));
      setAboutUsSaveMessage('About Us content saved successfully!');

      setTimeout(() => setAboutUsSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving About Us data:', error);
      setAboutUsSaveMessage('Error saving About Us content. Please try again.');
    } finally {
      setAboutUsLoading(false);
    }
  };

  // Load About Us data on component mount
  useEffect(() => {
    fetchAboutUsData();
  }, []);

  // About Us form handlers
  const handleStatisticChange = (index, field, value) => {
    const updatedStats = [...aboutUsData.statistics];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setAboutUsData({ ...aboutUsData, statistics: updatedStats });
  };

  const handleStoryChange = (field, value) => {
    setAboutUsData({
      ...aboutUsData,
      storyContent: { ...aboutUsData.storyContent, [field]: value },
    });
  };

  const handleStoryParagraphChange = (index, value) => {
    const updatedParagraphs = [...aboutUsData.storyContent.paragraphs];
    updatedParagraphs[index] = value;
    setAboutUsData({
      ...aboutUsData,
      storyContent: { ...aboutUsData.storyContent, paragraphs: updatedParagraphs },
    });
  };

  const handleMissionChange = (field, value) => {
    setAboutUsData({
      ...aboutUsData,
      missionContent: { ...aboutUsData.missionContent, [field]: value },
    });
  };

  const handleCompanyInfoChange = (field, value) => {
    setAboutUsData({
      ...aboutUsData,
      companyInfo: { ...aboutUsData.companyInfo, [field]: value },
    });
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'aboutus', name: 'About Us', icon: '🏢' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Site Settings Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Site Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage your website's basic information and SEO settings
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Site Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={siteSettings.siteName}
                      onChange={e => handleSettingChange('siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter site name"
                    />
                  </div>

                  {/* Logo URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={siteSettings.logoUrl}
                      onChange={e => handleSettingChange('logoUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter logo URL"
                    />
                  </div>

                  {/* Favicon URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Favicon URL
                    </label>
                    <input
                      type="url"
                      value={siteSettings.faviconUrl}
                      onChange={e => handleSettingChange('faviconUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter favicon URL"
                    />
                  </div>

                  {/* Meta Author */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Meta Author
                    </label>
                    <input
                      type="text"
                      value={siteSettings.metaAuthor}
                      onChange={e => handleSettingChange('metaAuthor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter author name"
                    />
                  </div>

                  {/* Site Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={siteSettings.siteDescription}
                      onChange={e => handleSettingChange('siteDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter site description"
                    />
                  </div>

                  {/* Meta Keywords */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      value={siteSettings.metaKeywords}
                      onChange={e => handleSettingChange('metaKeywords', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter keywords separated by commas"
                    />
                  </div>

                  {/* Open Graph Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Open Graph Title
                    </label>
                    <input
                      type="text"
                      value={siteSettings.ogTitle}
                      onChange={e => handleSettingChange('ogTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter Open Graph title"
                    />
                  </div>

                  {/* Open Graph Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Open Graph Image URL
                    </label>
                    <input
                      type="url"
                      value={siteSettings.ogImage}
                      onChange={e => handleSettingChange('ogImage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter Open Graph image URL"
                    />
                  </div>

                  {/* Open Graph Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Open Graph Description
                    </label>
                    <textarea
                      value={siteSettings.ogDescription}
                      onChange={e => handleSettingChange('ogDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter Open Graph description"
                    />
                  </div>
                </div>

                {/* Save Button and Message */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleSaveSettings}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Save Settings
                        </>
                      )}
                    </button>
                    {saveMessage && (
                      <span
                        className={`text-sm ${
                          saveMessage.includes('successfully')
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {saveMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'aboutus':
        return (
          <div className="space-y-6">
            {/* Company Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Company Information
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Basic company details
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={aboutUsData.companyInfo.name}
                      onChange={e => handleCompanyInfoChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Description
                    </label>
                    <textarea
                      value={aboutUsData.companyInfo.description}
                      onChange={e => handleCompanyInfoChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter company description"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Statistics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Company achievement statistics
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutUsData.statistics.map((stat, index) => (
                    <div
                      key={stat.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                    >
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Statistic {index + 1}
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Value
                          </label>
                          <input
                            type="number"
                            value={stat.value}
                            onChange={e =>
                              handleStatisticChange(index, 'value', parseInt(e.target.value) || 0)
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Label
                          </label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={e => handleStatisticChange(index, 'label', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Icon
                          </label>
                          <input
                            type="text"
                            value={stat.icon}
                            onChange={e => handleStatisticChange(index, 'icon', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="Enter emoji or icon"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Suffix
                          </label>
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={e => handleStatisticChange(index, 'suffix', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            placeholder="e.g., +, %, /7"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Our Story */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Story</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Company history and story content
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Story Title
                    </label>
                    <input
                      type="text"
                      value={aboutUsData.storyContent.title}
                      onChange={e => handleStoryChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter story title"
                    />
                  </div>

                  {aboutUsData.storyContent.paragraphs.map((paragraph, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Paragraph {index + 1}
                      </label>
                      <textarea
                        value={paragraph}
                        onChange={e => handleStoryParagraphChange(index, e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder={`Enter paragraph ${index + 1} content`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Mission & Vision
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Company mission and vision statements
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mission Statement
                    </label>
                    <textarea
                      value={aboutUsData.missionContent.mission}
                      onChange={e => handleMissionChange('mission', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter mission statement"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Vision Statement
                    </label>
                    <textarea
                      value={aboutUsData.missionContent.vision}
                      onChange={e => handleMissionChange('vision', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter vision statement"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={saveAboutUsData}
                      disabled={aboutUsLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {aboutUsLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Save About Us Content
                        </>
                      )}
                    </button>
                    {aboutUsSaveMessage && (
                      <span
                        className={`text-sm ${
                          aboutUsSaveMessage.includes('successfully')
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {aboutUsSaveMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                User Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                User management features coming soon...
              </p>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Content Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Content management features coming soon...
              </p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                System Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400">System settings coming soon...</p>
            </div>
          </div>
        );

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
