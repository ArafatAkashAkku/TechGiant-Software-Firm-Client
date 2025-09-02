import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Template1 from '../components/portfolio-templates/Template1';
import Template2 from '../components/portfolio-templates/Template2';
import Template3 from '../components/portfolio-templates/Template3';
import Template4 from '../components/portfolio-templates/Template4';
import Template5 from '../components/portfolio-templates/Template5';
import Template6 from '../components/portfolio-templates/Template6';

// Types for portfolio detail
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

export interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

export interface TeamMemberDetail {
  id: number;
  username: string;
  name: string;
  position: string;
  avatar: string;
  bio: string;
  skills: string[];
  socialMedia: SocialMedia[];
  experience: string;
  education: string;
  projects: Project[];
  achievements: string[];
  templateNumber: number;
}

const PortfolioDetailPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMemberDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'about' | 'experience'>('projects');

  // Mock data generator for detailed member info
  const generateMemberDetail = (username: string): TeamMemberDetail | null => {
    if (!username.startsWith('member')) return null;

    const id = parseInt(username.replace('member', ''));
    if (isNaN(id)) return null;

    const positions = [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'UI/UX Designer',
      'DevOps Engineer',
      'Data Scientist',
      'Mobile Developer',
      'Product Manager',
    ];
    const position = positions[(id - 1) % positions.length];

    const projectCategories = [
      'Web Application',
      'Mobile App',
      'API Development',
      'UI/UX Design',
      'Data Analysis',
      'DevOps Tool',
    ];

    const projects: Project[] = Array.from({ length: 6 + (id % 4) }, (_, index) => ({
      id: index + 1,
      title: `Project ${index + 1} - ${projectCategories[index % projectCategories.length]}`,
      description: `A comprehensive ${projectCategories[index % projectCategories.length].toLowerCase()} that showcases modern development practices and innovative solutions.`,
      image: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23${Math.floor(Math.random() * 16777215).toString(16)}'/%3E%3Ctext x='200' y='130' font-family='Arial, sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='white'%3EProject ${index + 1}%3C/text%3E%3C/svg%3E`,
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'].slice(0, 2 + (index % 3)),
      liveUrl: Math.random() > 0.3 ? `https://project${index + 1}.example.com` : undefined,
      githubUrl: `https://github.com/${username}/project${index + 1}`,
      category: projectCategories[index % projectCategories.length],
    }));

    return {
      id,
      username,
      name: `Team Member ${id}`,
      position,
      avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Ccircle cx='150' cy='150' r='150' fill='%23${Math.floor(Math.random() * 16777215).toString(16)}'/%3E%3Ctext x='150' y='170' font-family='Arial, sans-serif' font-size='120' font-weight='bold' text-anchor='middle' fill='white'%3E${String.fromCharCode(65 + (id % 26))}%3C/text%3E%3C/svg%3E`,
      bio: `Passionate ${position.toLowerCase()} with ${3 + (id % 8)} years of experience in creating innovative solutions. I love working with cutting-edge technologies and building products that make a difference.`,
      skills: {
        'Frontend Developer': [
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Next.js',
          'Vue.js',
          'JavaScript',
          'HTML5',
          'CSS3',
        ],
        'Backend Developer': [
          'Node.js',
          'Python',
          'PostgreSQL',
          'Docker',
          'Express.js',
          'MongoDB',
          'Redis',
          'AWS',
        ],
        'Full Stack Developer': [
          'React',
          'Node.js',
          'MongoDB',
          'AWS',
          'TypeScript',
          'Docker',
          'GraphQL',
          'PostgreSQL',
        ],
        'UI/UX Designer': [
          'Figma',
          'Adobe XD',
          'Sketch',
          'Prototyping',
          'User Research',
          'Wireframing',
          'Design Systems',
        ],
        'DevOps Engineer': [
          'Docker',
          'Kubernetes',
          'AWS',
          'CI/CD',
          'Jenkins',
          'Terraform',
          'Linux',
          'Monitoring',
        ],
        'Data Scientist': [
          'Python',
          'TensorFlow',
          'SQL',
          'Machine Learning',
          'Pandas',
          'Jupyter',
          'R',
          'Statistics',
        ],
        'Mobile Developer': [
          'React Native',
          'Flutter',
          'iOS',
          'Android',
          'Swift',
          'Kotlin',
          'Xamarin',
        ],
        'Product Manager': [
          'Agile',
          'Scrum',
          'Analytics',
          'Strategy',
          'User Stories',
          'Roadmapping',
          'Stakeholder Management',
        ],
      }[position] || ['JavaScript', 'React'],
      socialMedia: [
        { platform: 'LinkedIn', url: `https://linkedin.com/in/${username}`, icon: '💼' },
        { platform: 'GitHub', url: `https://github.com/${username}`, icon: '🐱' },
        { platform: 'Twitter', url: `https://twitter.com/${username}`, icon: '🐦' },
        { platform: 'Portfolio', url: `https://${username}.dev`, icon: '🌐' },
      ],
      experience: `${3 + (id % 8)} years of professional experience`,
      education: 'Bachelor of Science in Computer Science',
      projects,
      achievements: [
        'Led development of 5+ successful projects',
        'Mentored junior developers',
        'Contributed to open source projects',
        'Speaker at tech conferences',
      ],
      templateNumber: ((id - 1) % 6) + 1,
    };
  };

  useEffect(() => {
    if (!username) {
      navigate('/portfolio');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const memberDetail = generateMemberDetail(username);
      if (!memberDetail) {
        navigate('/portfolio');
        return;
      }
      setMember(memberDetail);
      setLoading(false);
    }, 500);
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Member not found</h1>
          <Link to="/portfolio" className="text-blue-600 hover:text-blue-800">
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  // Render the appropriate template based on templateNumber
  const renderTemplate = () => {
    const templateProps = {
      member,
      activeTab,
      setActiveTab,
    };

    switch (member.templateNumber) {
      case 1:
        return <Template1 {...templateProps} />;
      case 2:
        return <Template2 {...templateProps} />;
      case 3:
        return <Template3 {...templateProps} />;
      case 4:
        return <Template4 {...templateProps} />;
      case 5:
        return <Template5 {...templateProps} />;
      case 6:
        return <Template6 {...templateProps} />;
      default:
        return <Template1 {...templateProps} />;
    }
  };

  return (
    <div>
      {/* Back to Portfolio Link */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/portfolio"
          className="inline-flex items-center bg-white bg-opacity-90 backdrop-blur-sm text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Render the selected template */}
      {renderTemplate()}
    </div>
  );
};

export default PortfolioDetailPage;
