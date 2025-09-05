import React, { useState, useEffect } from 'react';
import { isDevelopment, apiURL, mockAPI } from '../utilities/app.utilities';
import axios from 'axios';

interface Statistic {
  id: number;
  value: number;
  label: string;
  icon: string;
  suffix?: string;
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

const AboutUs: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [storyContent, setStoryContent] = useState<StoryContent | null>(null);
  const [missionContent, setMissionContent] = useState<MissionContent | null>(null);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Default statistics data - can be replaced with API call
  const defaultStatistics: Statistic[] = [
    {
      id: 1,
      value: 500,
      label: 'Projects Completed',
      icon: '📊',
      suffix: '+',
    },
    {
      id: 2,
      value: 50,
      label: 'Happy Clients',
      icon: '😊',
      suffix: '+',
    },
    {
      id: 3,
      value: 10,
      label: 'Years Experience',
      icon: '🏆',
      suffix: '+',
    },
    {
      id: 4,
      value: 24,
      label: 'Support Available',
      icon: '🛠️',
      suffix: '/7',
    },
  ];

  // Default story content - can be replaced with API call
  const defaultStoryContent: StoryContent = {
    id: 1,
    title: 'Our Story',
    paragraphs: [
      'Founded in 2014, TechGiant began as a small team of passionate developers with a vision to bridge the gap between complex technology and business needs. What started as a startup has grown into a trusted partner for companies worldwide.',
      "Over the years, we've evolved from a local development shop to a full-service technology consultancy, helping businesses of all sizes navigate their digital transformation journey with confidence and success.",
      'Today, we continue to push boundaries, embrace emerging technologies, and deliver solutions that not only meet current needs but anticipate future challenges.',
    ],
  };

  // Default mission content - can be replaced with API call
  const defaultMissionContent: MissionContent = {
    id: 1,
    mission:
      'To empower businesses with innovative software solutions that drive growth, efficiency, and competitive advantage in the digital age.',
    vision:
      "To be the leading technology partner that transforms ideas into reality and helps businesses thrive in tomorrow's digital landscape.",
  };

  // Default company info - can be replaced with API call
  const defaultCompanyInfo: CompanyInfo = {
    id: 1,
    name: 'TechGiant',
    description:
      'We are a forward-thinking software development company dedicated to transforming businesses through innovative technology solutions.',
  };

  // Fetch all content data - replace URLs with your actual API endpoints
  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        setLoading(true);

        if (mockAPI) {
          setStoryContent(defaultStoryContent);
          setMissionContent(defaultMissionContent);
          setStatistics(defaultStatistics);
          setCompanyInfo(defaultCompanyInfo);
        } else {
          // Fetch statistics data
          const statisticsResponse = await axios.get(`${apiURL}/about-us/statistics`);
          setStatistics(statisticsResponse.data.data);

          // Fetch story content
          const storyResponse = await axios.get(`${apiURL}/about-us/story`);
          setStoryContent(storyResponse.data.data);

          // Fetch mission content
          const missionResponse = await axios.get(`${apiURL}/about-us/mission`);
          setMissionContent(missionResponse.data.data);

          // Fetch company info
          const companyResponse = await axios.get(`${apiURL}/about-us/company`);
          setCompanyInfo(companyResponse.data.data);
        }
      } catch (error) {
        if (isDevelopment) {
          console.log('Error fetching content:', error);
        }
        // Fallback to default content on error
        setStatistics(defaultStatistics);
        setStoryContent(defaultStoryContent);
        setMissionContent(defaultMissionContent);
        setCompanyInfo(defaultCompanyInfo);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  // Show loading state while fetching content
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400 text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render if no content available
  if (statistics.length === 0 || !storyContent || !missionContent || !companyInfo) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400 text-xl">No content available</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-blue-600 dark:text-blue-400">{companyInfo.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Our Services
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-900 dark:bg-gray-950">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map(stat => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-gray-300 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {storyContent.title}
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {storyContent.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-8 text-white dark:text-gray-100">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed mb-6">{missionContent.mission}</p>
                <div className="bg-white/10 dark:bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Our Vision</h4>
                  <p className="text-sm opacity-90">{missionContent.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
