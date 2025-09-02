import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// Types for career data
interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
}

interface CompanyBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resume: File | null;
  linkedIn: string;
  portfolio: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  position?: string;
  experience?: string;
  coverLetter?: string;
  resume?: string;
}

const Career: React.FC = () => {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [companyBenefits, setCompanyBenefits] = useState<CompanyBenefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState<string>('All');
  const [filterLocation, setFilterLocation] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');

  // Application form state
  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null,
    linkedIn: '',
    portfolio: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Default job positions data
  const defaultJobPositions: JobPosition[] = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      experience: '5+ years',
      description:
        "Join our engineering team to build scalable web applications using modern technologies. You'll work on challenging projects that impact millions of users worldwide.",
      requirements: [
        '5+ years of experience in full-stack development',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Strong understanding of database design and optimization',
        'Experience with microservices architecture',
        'Excellent problem-solving and communication skills',
      ],
      responsibilities: [
        'Design and develop scalable web applications',
        'Collaborate with cross-functional teams to define and implement new features',
        'Write clean, maintainable, and well-documented code',
        'Participate in code reviews and mentor junior developers',
        'Optimize application performance and user experience',
        'Stay up-to-date with emerging technologies and best practices',
      ],
      benefits: [
        'Competitive salary and equity package',
        'Comprehensive health, dental, and vision insurance',
        'Flexible work arrangements and remote options',
        'Professional development budget',
        'Unlimited PTO policy',
      ],
      postedDate: '2024-01-15',
      applicationDeadline: '2024-02-15',
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '3-5 years',
      description:
        'Lead product strategy and execution for our core platform. Work closely with engineering, design, and business teams to deliver exceptional user experiences.',
      requirements: [
        '3-5 years of product management experience',
        'Strong analytical and data-driven decision making skills',
        'Experience with agile development methodologies',
        'Excellent communication and leadership abilities',
        "Bachelor's degree in Business, Engineering, or related field",
        'Experience with product analytics tools',
      ],
      responsibilities: [
        'Define product roadmap and strategy',
        'Gather and prioritize product requirements',
        'Work closely with engineering teams to deliver features',
        'Analyze user feedback and market trends',
        'Coordinate product launches and go-to-market strategies',
        'Monitor product performance and iterate based on data',
      ],
      benefits: [
        'Competitive salary and performance bonuses',
        'Stock options and equity participation',
        'Health and wellness benefits',
        'Learning and development opportunities',
        'Flexible work schedule',
      ],
      postedDate: '2024-01-10',
      applicationDeadline: '2024-02-10',
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description:
        'Create intuitive and beautiful user experiences for our products. Collaborate with product and engineering teams to bring designs to life.',
      requirements: [
        '2-4 years of UX/UI design experience',
        'Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)',
        'Strong portfolio demonstrating design process and outcomes',
        'Understanding of user-centered design principles',
        'Experience with design systems and component libraries',
        'Knowledge of front-end development principles',
      ],
      responsibilities: [
        'Design user interfaces for web and mobile applications',
        'Conduct user research and usability testing',
        'Create wireframes, prototypes, and high-fidelity designs',
        'Collaborate with developers to ensure design implementation',
        'Maintain and evolve design system components',
        'Present design concepts to stakeholders',
      ],
      benefits: [
        'Competitive salary and creative freedom',
        'Top-tier design tools and equipment',
        'Conference and workshop attendance budget',
        'Collaborative and inspiring work environment',
        'Flexible work arrangements',
      ],
      postedDate: '2024-01-12',
      applicationDeadline: '2024-02-12',
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Seattle, WA',
      type: 'Full-time',
      experience: '4+ years',
      description:
        'Build and maintain our cloud infrastructure and deployment pipelines. Ensure high availability and scalability of our systems.',
      requirements: [
        '4+ years of DevOps or infrastructure experience',
        'Expertise in cloud platforms (AWS, Azure, or GCP)',
        'Experience with containerization (Docker, Kubernetes)',
        'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
        'Strong scripting skills (Python, Bash, or PowerShell)',
        'Experience with CI/CD pipelines and monitoring tools',
      ],
      responsibilities: [
        'Design and implement scalable cloud infrastructure',
        'Automate deployment and monitoring processes',
        'Ensure system security and compliance',
        'Troubleshoot and resolve infrastructure issues',
        'Collaborate with development teams on deployment strategies',
        'Optimize system performance and cost efficiency',
      ],
      benefits: [
        'Competitive salary and technical challenges',
        'Latest tools and cloud technology access',
        'Certification and training support',
        'On-call compensation and flexible schedule',
        'Remote work options',
      ],
      postedDate: '2024-01-08',
      applicationDeadline: '2024-02-08',
    },
    {
      id: 5,
      title: 'Data Scientist',
      department: 'Data & Analytics',
      location: 'Boston, MA / Remote',
      type: 'Full-time',
      experience: '3+ years',
      description:
        'Extract insights from data to drive business decisions. Build machine learning models and work with large datasets to solve complex problems.',
      requirements: [
        '3+ years of data science experience',
        'Strong programming skills in Python or R',
        'Experience with machine learning frameworks',
        'Proficiency in SQL and database technologies',
        'Statistical analysis and data visualization skills',
        "Master's degree in Data Science, Statistics, or related field",
      ],
      responsibilities: [
        'Analyze large datasets to identify trends and patterns',
        'Build and deploy machine learning models',
        'Create data visualizations and reports',
        'Collaborate with business teams to define analytics requirements',
        'Develop data pipelines and automated reporting',
        'Present findings to stakeholders and leadership',
      ],
      benefits: [
        'Competitive salary and data-driven culture',
        'Access to cutting-edge tools and technologies',
        'Conference attendance and research opportunities',
        'Collaborative team environment',
        'Flexible work arrangements',
      ],
      postedDate: '2024-01-05',
      applicationDeadline: '2024-02-05',
    },
    {
      id: 6,
      title: 'Software Engineering Intern',
      department: 'Engineering',
      location: 'Palo Alto, CA',
      type: 'Internship',
      experience: 'Student',
      description:
        'Join our summer internship program and work on real projects alongside experienced engineers. Great opportunity for students to gain industry experience.',
      requirements: [
        'Currently pursuing Computer Science or related degree',
        'Strong programming fundamentals',
        'Experience with at least one modern programming language',
        'Understanding of data structures and algorithms',
        'Passion for learning and problem-solving',
        'Available for 12-week summer internship',
      ],
      responsibilities: [
        'Work on assigned projects under mentor guidance',
        'Write clean, well-documented code',
        'Participate in code reviews and team meetings',
        'Learn about software development best practices',
        'Contribute to team goals and deliverables',
        'Present final project to the team',
      ],
      benefits: [
        'Competitive internship stipend',
        'Mentorship from senior engineers',
        'Networking opportunities',
        'Potential for full-time offer',
        'Learning and development resources',
      ],
      postedDate: '2024-01-20',
      applicationDeadline: '2024-03-01',
    },
  ];

  // Default company benefits data
  const defaultCompanyBenefits: CompanyBenefit[] = [
    {
      id: 1,
      title: 'Health & Wellness',
      description:
        'Comprehensive health, dental, and vision insurance with wellness programs and mental health support.',
      icon: '🏥',
    },
    {
      id: 2,
      title: 'Flexible Work',
      description:
        'Remote work options, flexible hours, and unlimited PTO to maintain work-life balance.',
      icon: '🏠',
    },
    {
      id: 3,
      title: 'Learning & Development',
      description:
        'Professional development budget, conference attendance, and continuous learning opportunities.',
      icon: '📚',
    },
    {
      id: 4,
      title: 'Competitive Compensation',
      description: 'Market-competitive salaries, equity packages, and performance-based bonuses.',
      icon: '💰',
    },
    {
      id: 5,
      title: 'Team Culture',
      description:
        'Collaborative environment, team events, and inclusive culture that values diversity.',
      icon: '🤝',
    },
    {
      id: 6,
      title: 'Innovation Time',
      description: '20% time for personal projects, hackathons, and exploring new technologies.',
      icon: '💡',
    },
  ];

  // Fetch career data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace these URLs with your actual API endpoints
        // const jobsResponse = await axios.get('/api/jobs');
        // const benefitsResponse = await axios.get('/api/benefits');
        // setJobPositions(jobsResponse.data);
        // setCompanyBenefits(benefitsResponse.data);

        // For now, using default data
        setJobPositions(defaultJobPositions);
        setCompanyBenefits(defaultCompanyBenefits);
      } catch (error) {
        console.error('Error fetching career data:', error);
        // Fallback to default data on error
        setJobPositions(defaultJobPositions);
        setCompanyBenefits(defaultCompanyBenefits);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique departments, locations, and types for filters
  const departments = ['All', ...Array.from(new Set(jobPositions.map(job => job.department)))];
  const locations = ['All', ...Array.from(new Set(jobPositions.map(job => job.location)))];
  const types = ['All', ...Array.from(new Set(jobPositions.map(job => job.type)))];

  // Filter jobs based on selected filters
  const filteredJobs = jobPositions.filter(job => {
    return (
      (filterDepartment === 'All' || job.department === filterDepartment) &&
      (filterLocation === 'All' || job.location === filterLocation) &&
      (filterType === 'All' || job.type === filterType)
    );
  });

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.position.trim()) {
      errors.position = 'Position is required';
    }

    if (!formData.experience.trim()) {
      errors.experience = 'Experience is required';
    }

    if (!formData.coverLetter.trim()) {
      errors.coverLetter = 'Cover letter is required';
    }

    if (!formData.resume) {
      errors.resume = 'Resume is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, resume: file }));
    if (formErrors.resume) {
      setFormErrors(prev => ({ ...prev, resume: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace with your actual API endpoint
      // const formDataToSend = new FormData();
      // Object.entries(formData).forEach(([key, value]) => {
      //   if (value !== null) {
      //     formDataToSend.append(key, value);
      //   }
      // });
      // await axios.post('/api/applications', formDataToSend);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        coverLetter: '',
        resume: null,
        linkedIn: '',
        portfolio: '',
      });
      setShowApplicationForm(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle job application
  const handleApplyJob = (job: JobPosition) => {
    setSelectedJob(job);
    setFormData(prev => ({ ...prev, position: job.title }));
    setShowApplicationForm(true);
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading career opportunities...</p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Join Our Team</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Build the future of technology with us. We're looking for passionate individuals who
            want to make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white">{jobPositions.length}+</div>
              <div className="text-blue-100">Open Positions</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white">5</div>
              <div className="text-blue-100">Departments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Benefits */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work With Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe in creating an environment where our team can thrive, innovate, and grow
              together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyBenefits.map(benefit => (
              <div
                key={benefit.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find your next opportunity and join our growing team.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <select
              value={filterDepartment}
              onChange={e => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>

            <select
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All Types' : type}
                </option>
              ))}
            </select>
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm rounded-full">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                        {job.experience}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"
                      />
                    </svg>
                    Posted: {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">{job.description}</p>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => handleApplyJob(job)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg">
                No positions found matching your criteria.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Apply for {selectedJob?.title}
                </h3>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 rounded-lg">
                  Application submitted successfully! We'll be in touch soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-lg">
                  There was an error submitting your application. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        formErrors.firstName
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        formErrors.lastName
                          ? 'border-red-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      formErrors.position
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    readOnly
                  />
                  {formErrors.position && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.position}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      formErrors.experience
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-3">2-3 years</option>
                    <option value="4-5">4-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                  {formErrors.experience && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Resume *
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
                      formErrors.resume ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.resume && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.resume}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedIn"
                      value={formData.linkedIn}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Portfolio/Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none ${
                      formErrors.coverLetter
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.coverLetter && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.coverLetter}
                    </p>
                  )}
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200 font-medium flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
