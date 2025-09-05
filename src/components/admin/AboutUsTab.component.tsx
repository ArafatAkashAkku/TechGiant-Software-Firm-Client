import React, { useState, useEffect } from 'react';
import { isDevelopment, apiURL, mockAPI } from '../../utilities/app.utilities';
import axios from 'axios';

interface Statistic {
  id: number;
  value: number;
  label: string;
  icon: string;
  suffix: string;
}

interface StoryContent {
  id: number;
  title: string;
  paragraphs: string[];
}

interface MissionContent {
  id: number;
  mission: string;
  vision: string;
}

interface CompanyInfo {
  id: number;
  name: string;
  description: string;
}

interface AboutUsData {
  statistics: Statistic[];
  storyContent: StoryContent;
  missionContent: MissionContent;
  companyInfo: CompanyInfo;
}

// Mock data for initial display
const mockAboutUsData: AboutUsData = {
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
};

const AboutUsTab: React.FC = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUsData>({
    statistics: [],
    storyContent: { id: 0, title: '', paragraphs: [] },
    missionContent: { id: 0, mission: '', vision: '' },
    companyInfo: { id: 0, name: '', description: '' },
  });

  const [aboutUsLoading, setAboutUsLoading] = useState(false);
  const [aboutUsSaveMessage, setAboutUsSaveMessage] = useState('');

  // Load About Us data on component mount
  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    try {
      setAboutUsLoading(true);

      if (mockAPI) {
        // For now, using mock data
        setAboutUsData(mockAboutUsData);
      } else {
        // TODO: Replace with actual API calls
        const [statsRes, storyRes, missionRes, companyRes] = await Promise.all([
          axios.get(`${apiURL}/about-us/statistics`),
          axios.get(`${apiURL}/about-us/story`),
          axios.get(`${apiURL}/about-us/mission`),
          axios.get(`${apiURL}/about-us/company`),
        ]);
        setAboutUsData({
          statistics: statsRes.data.data,
          storyContent: storyRes.data.data,
          missionContent: missionRes.data.data,
          companyInfo: companyRes.data.data,
        });
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error fetching About Us data:', error);
      }
      // Fallback to mock data on error
      setAboutUsData(mockAboutUsData);
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
      //   axios.put(`${apiURL}/about-us/statistics`, aboutUsData.statistics),
      //   axios.put(`${apiURL}/about-us/story`, aboutUsData.storyContent),
      //   axios.put(`${apiURL}/about-us/mission`, aboutUsData.missionContent),
      //   axios.put(`${apiURL}/about-us/company`, aboutUsData.companyInfo)
      // ]);

      if (mockAPI) {
        setAboutUsSaveMessage('About Us content saved successfully!');

        setTimeout(() => setAboutUsSaveMessage(''), 3000);
      } else {
        // TODO: Replace with actual API calls
        await Promise.all([
          axios.put(`${apiURL}/about-us/statistics`, { statistics: aboutUsData.statistics }),
          axios.put(`${apiURL}/about-us/story`, aboutUsData.storyContent),
          axios.put(`${apiURL}/about-us/mission`, aboutUsData.missionContent),
          axios.put(`${apiURL}/about-us/company`, aboutUsData.companyInfo),
        ]);
        setAboutUsSaveMessage('About Us content saved successfully!');

        setTimeout(() => setAboutUsSaveMessage(''), 3000);
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error saving About Us data:', error);
      }
      setAboutUsSaveMessage('Error saving About Us content. Please try again.');
    } finally {
      setAboutUsLoading(false);
    }
  };

  // About Us form handlers
  const handleStatisticChange = (index: number, field: string, value: any) => {
    const updatedStats = [...aboutUsData.statistics];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setAboutUsData({ ...aboutUsData, statistics: updatedStats });
  };

  const handleStoryChange = (field: string, value: any) => {
    setAboutUsData({
      ...aboutUsData,
      storyContent: { ...aboutUsData.storyContent, [field]: value },
    });
  };

  const handleStoryParagraphChange = (index: number, value: string) => {
    const updatedParagraphs = [...aboutUsData.storyContent.paragraphs];
    updatedParagraphs[index] = value;
    setAboutUsData({
      ...aboutUsData,
      storyContent: { ...aboutUsData.storyContent, paragraphs: updatedParagraphs },
    });
  };

  const handleMissionChange = (field: string, value: string) => {
    setAboutUsData({
      ...aboutUsData,
      missionContent: { ...aboutUsData.missionContent, [field]: value },
    });
  };

  const handleCompanyInfoChange = (field: string, value: string) => {
    setAboutUsData({
      ...aboutUsData,
      companyInfo: { ...aboutUsData.companyInfo, [field]: value },
    });
  };

  // Add new statistic
  const addStatistic = () => {
    const newStatistic: Statistic = {
      id: Date.now(), // Temporary ID for new statistics
      value: 0,
      label: '',
      icon: '',
      suffix: '',
    };
    setAboutUsData({
      ...aboutUsData,
      statistics: [...aboutUsData.statistics, newStatistic],
    });
  };

  // Remove statistic
  const removeStatistic = (index: number) => {
    if (aboutUsData.statistics.length <= 1) {
      return; // Don't allow removing the last statistic
    }
    const updatedStats = aboutUsData.statistics.filter((_, i) => i !== index);
    setAboutUsData({
      ...aboutUsData,
      statistics: updatedStats,
    });
  };

  // Add new paragraph to story
  const addStoryParagraph = () => {
    const updatedParagraphs = [...aboutUsData.storyContent.paragraphs, ''];
    setAboutUsData({
      ...aboutUsData,
      storyContent: { ...aboutUsData.storyContent, paragraphs: updatedParagraphs },
    });
  };

  // Remove paragraph from story
  const removeStoryParagraph = (index: number) => {
    const updatedParagraphs = aboutUsData.storyContent.paragraphs.filter((_, i) => i !== index);
    setAboutUsData({
      ...aboutUsData,
      storyContent: { ...aboutUsData.storyContent, paragraphs: updatedParagraphs },
    });
  };

  return (
    <div className="space-y-6">
      {/* Company Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Company Information</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Basic company details</p>
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
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Statistics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Company achievement statistics
              </p>
            </div>
            <button
              onClick={addStatistic}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Statistic
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutUsData.statistics.map((stat, index) => (
              <div
                key={stat.id}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    Statistic {index + 1}
                  </h4>
                  <button
                    onClick={() => removeStatistic(index)}
                    disabled={aboutUsData.statistics.length <= 1}
                    className={`inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 ${
                      aboutUsData.statistics.length <= 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20'
                    }`}
                    title={
                      aboutUsData.statistics.length <= 1
                        ? 'Cannot remove the last statistic'
                        : 'Remove Statistic'
                    }
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
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
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Story</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Company history and story content
              </p>
            </div>
            <button
              onClick={addStoryParagraph}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Paragraph
            </button>
          </div>
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Paragraph {index + 1}
                  </label>
                  {aboutUsData.storyContent.paragraphs.length > 1 && (
                    <button
                      onClick={() => removeStoryParagraph(index)}
                      className="inline-flex items-center p-1 border border-transparent text-sm font-medium rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      title="Remove Paragraph"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
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
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Mission & Vision</h3>
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
  );
};

export default AboutUsTab;
