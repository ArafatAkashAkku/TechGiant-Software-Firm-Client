import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Types for team member data
interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

interface TeamMember {
  id: number;
  username: string;
  name: string;
  position: string;
  avatar: string;
  bio: string;
  skills: string[];
  socialMedia: SocialMedia[];
  portfolioUrl?: string;
  templateNumber: number; // Template number (1-6) for portfolio rendering
}

// Mock data array - Replace this with real API data later
const MOCK_MEMBERS: TeamMember[] = [
  {
    id: 1,
    username: 'member1',
    name: 'Sarah Johnson',
    position: 'Frontend Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23FF6B6B'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ES%3C/text%3E%3C/svg%3E`,
    bio: 'Passionate frontend developer with 5 years of experience in creating innovative user interfaces.',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member1', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member1', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/member1', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member1',
    templateNumber: 1,
  },
  {
    id: 2,
    username: 'member2',
    name: 'Michael Chen',
    position: 'Backend Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%234ECDC4'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EM%3C/text%3E%3C/svg%3E`,
    bio: 'Backend developer with 6 years of experience in scalable server-side applications.',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member2', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member2', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member2',
    templateNumber: 2,
  },
  {
    id: 3,
    username: 'member3',
    name: 'Emily Rodriguez',
    position: 'Full Stack Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%2345B7D1'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EE%3C/text%3E%3C/svg%3E`,
    bio: 'Full stack developer with 4 years of experience in end-to-end web development.',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member3', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member3', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/member3', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member3',
    templateNumber: 3,
  },
  {
    id: 4,
    username: 'member4',
    name: 'David Kim',
    position: 'UI/UX Designer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23F7DC6F'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ED%3C/text%3E%3C/svg%3E`,
    bio: 'Creative UI/UX designer with 7 years of experience in user-centered design.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member4', icon: '💼' },
      { platform: 'Twitter', url: 'https://twitter.com/member4', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member4',
    templateNumber: 4,
  },
  {
    id: 5,
    username: 'member5',
    name: 'Jessica Taylor',
    position: 'DevOps Engineer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23BB8FCE'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EJ%3C/text%3E%3C/svg%3E`,
    bio: 'DevOps engineer with 5 years of experience in cloud infrastructure and automation.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member5', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member5', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member5',
    templateNumber: 5,
  },
  {
    id: 6,
    username: 'member6',
    name: 'Alex Thompson',
    position: 'Data Scientist',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%2385C1E9'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E`,
    bio: 'Data scientist with 6 years of experience in machine learning and analytics.',
    skills: ['Python', 'TensorFlow', 'SQL', 'Machine Learning'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member6', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member6', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/member6', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member6',
    templateNumber: 6,
  },
  {
    id: 7,
    username: 'member7',
    name: 'Maria Garcia',
    position: 'Mobile Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23F8C471'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EM%3C/text%3E%3C/svg%3E`,
    bio: 'Mobile developer with 4 years of experience in cross-platform app development.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member7', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member7', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member7',
    templateNumber: 1,
  },
  {
    id: 8,
    username: 'member8',
    name: 'James Wilson',
    position: 'Product Manager',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23A569BD'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EJ%3C/text%3E%3C/svg%3E`,
    bio: 'Product manager with 8 years of experience in agile product development.',
    skills: ['Agile', 'Scrum', 'Analytics', 'Strategy'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member8', icon: '💼' },
      { platform: 'Twitter', url: 'https://twitter.com/member8', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member8',
    templateNumber: 2,
  },
  {
    id: 9,
    username: 'member9',
    name: 'Lisa Anderson',
    position: 'Frontend Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23EC7063'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EL%3C/text%3E%3C/svg%3E`,
    bio: 'Frontend developer with 3 years of experience in modern web technologies.',
    skills: ['Vue.js', 'JavaScript', 'CSS3', 'Webpack'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member9', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member9', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member9',
    templateNumber: 3,
  },
  {
    id: 10,
    username: 'member10',
    name: 'Robert Brown',
    position: 'Backend Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%2358D68D'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ER%3C/text%3E%3C/svg%3E`,
    bio: 'Backend developer with 7 years of experience in distributed systems.',
    skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member10', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member10', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/member10', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member10',
    templateNumber: 4,
  },
  {
    id: 11,
    username: 'member11',
    name: 'Amanda Davis',
    position: 'Full Stack Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23F1948A'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E`,
    bio: 'Full stack developer with 5 years of experience in MERN stack development.',
    skills: ['React', 'Express.js', 'MongoDB', 'GraphQL'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member11', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member11', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member11',
    templateNumber: 5,
  },
  {
    id: 12,
    username: 'member12',
    name: 'Kevin Lee',
    position: 'UI/UX Designer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%2382E0AA'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EK%3C/text%3E%3C/svg%3E`,
    bio: 'UI/UX designer with 4 years of experience in mobile and web design.',
    skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Wireframing'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member12', icon: '💼' },
      { platform: 'Twitter', url: 'https://twitter.com/member12', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member12',
    templateNumber: 6,
  },
  {
    id: 13,
    username: 'member13',
    name: 'Rachel Green',
    position: 'DevOps Engineer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23AED6F1'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ER%3C/text%3E%3C/svg%3E`,
    bio: 'DevOps engineer with 6 years of experience in cloud architecture and automation.',
    skills: ['Terraform', 'Jenkins', 'Azure', 'Monitoring'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member13', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member13', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member13',
    templateNumber: 1,
  },
  {
    id: 14,
    username: 'member14',
    name: 'Daniel Martinez',
    position: 'Data Scientist',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23D7BDE2'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ED%3C/text%3E%3C/svg%3E`,
    bio: 'Data scientist with 5 years of experience in predictive modeling and AI.',
    skills: ['R', 'Pandas', 'Jupyter', 'Statistics'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member14', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member14', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/member14', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member14',
    templateNumber: 2,
  },
  {
    id: 15,
    username: 'member15',
    name: 'Sophie White',
    position: 'Mobile Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23F9E79F'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ES%3C/text%3E%3C/svg%3E`,
    bio: 'Mobile developer with 3 years of experience in native iOS and Android development.',
    skills: ['Swift', 'Kotlin', 'Xamarin', 'React Native'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member15', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member15', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member15',
    templateNumber: 3,
  },
  {
    id: 16,
    username: 'member16',
    name: 'Thomas Clark',
    position: 'Product Manager',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23A3E4D7'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3ET%3C/text%3E%3C/svg%3E`,
    bio: 'Product manager with 9 years of experience in SaaS product development.',
    skills: ['Product Strategy', 'Roadmapping', 'Stakeholder Management', 'User Stories'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member16', icon: '💼' },
      { platform: 'Twitter', url: 'https://twitter.com/member16', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member16',
    templateNumber: 4,
  },
  {
    id: 17,
    username: 'member17',
    name: 'Jennifer Lopez',
    position: 'Frontend Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23F8D7DA'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EJ%3C/text%3E%3C/svg%3E`,
    bio: 'Frontend developer with 4 years of experience in responsive web design.',
    skills: ['Angular', 'SCSS', 'Bootstrap', 'TypeScript'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member17', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member17', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member17',
    templateNumber: 5,
  },
  {
    id: 18,
    username: 'member18',
    name: 'Christopher Hall',
    position: 'Backend Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23D5DBDB'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EC%3C/text%3E%3C/svg%3E`,
    bio: 'Backend developer with 6 years of experience in microservices architecture.',
    skills: ['C#', '.NET Core', 'SQL Server', 'Azure'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member18', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member18', icon: '🐱' },
      { platform: 'Twitter', url: 'https://twitter.com/member18', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member18',
    templateNumber: 6,
  },
  {
    id: 19,
    username: 'member19',
    name: 'Nicole Young',
    position: 'Full Stack Developer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23FADBD8'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EN%3C/text%3E%3C/svg%3E`,
    bio: 'Full stack developer with 5 years of experience in Django and React.',
    skills: ['Django', 'React', 'PostgreSQL', 'Docker'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member19', icon: '💼' },
      { platform: 'GitHub', url: 'https://github.com/member19', icon: '🐱' },
    ],
    portfolioUrl: '/portfolio/member19',
    templateNumber: 1,
  },
  {
    id: 20,
    username: 'member20',
    name: 'Brandon King',
    position: 'UI/UX Designer',
    avatar: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23D6EAF8'/%3E%3Ctext x='100' y='110' font-family='Arial, sans-serif' font-size='60' font-weight='bold' text-anchor='middle' fill='white'%3EB%3C/text%3E%3C/svg%3E`,
    bio: 'UI/UX designer with 6 years of experience in design systems and accessibility.',
    skills: ['Design Systems', 'Accessibility', 'Prototyping', 'User Testing'],
    socialMedia: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/member20', icon: '💼' },
      { platform: 'Twitter', url: 'https://twitter.com/member20', icon: '🐦' },
    ],
    portfolioUrl: '/portfolio/member20',
    templateNumber: 2,
  },
];

const PortfolioPage: React.FC = () => {
  const [displayedMembers, setDisplayedMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const MEMBERS_PER_ROW = 4; // 4 members per row
  const totalRows = Math.ceil(MOCK_MEMBERS.length / MEMBERS_PER_ROW);

  // Load initial row of members
  useEffect(() => {
    loadNextRow();
  }, []);

  // Load next row of members (4 members per row)
  const loadNextRow = useCallback(async () => {
    if (loading || currentRow >= totalRows) return;

    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const startIndex = currentRow * MEMBERS_PER_ROW;
    const endIndex = Math.min(startIndex + MEMBERS_PER_ROW, MOCK_MEMBERS.length);
    const newMembers = MOCK_MEMBERS.slice(startIndex, endIndex);

    setDisplayedMembers(prev => [...prev, ...newMembers]);
    setCurrentRow(prev => prev + 1);

    setLoading(false);
  }, [loading, currentRow, totalRows]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled near the bottom (within 200px)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;

      if (scrollTop + windowHeight >= documentHeight - 200 && !loading && currentRow < totalRows) {
        loadNextRow();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, currentRow, totalRows, loadNextRow]);

  // No portfolio members found state
  if (!loading && displayedMembers.length === 0 && currentRow === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet our talented team members and explore their amazing work
            </p>
          </div>

          {/* No Portfolio Found */}
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Team Members Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We don't have any team portfolio members to display at the moment. Please check back
                later to see our amazing team!
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Team Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet our talented team members and explore their amazing work
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMembers.map(member => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Avatar */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Social Media Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    {member.socialMedia.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                        title={social.platform}
                      >
                        <span className="text-lg">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Portfolio Button */}
                {member.portfolioUrl && (
                  <Link
                    to={member.portfolioUrl}
                    className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 text-center block font-medium"
                  >
                    See Portfolio
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading more members...</span>
          </div>
        )}

        {/* End of Results */}
        {currentRow >= totalRows && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              You have seen all our amazing team members! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
