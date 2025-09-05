import React, { useState, useEffect } from 'react';
import { isDevelopment, apiURL, mockAPI } from '../../utilities/app.utilities';
import axios from 'axios';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  applicationDeadline: string;
  isActive: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    applications: number;
  };
}

const CareerTab: React.FC = () => {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPosition, setNewPosition] = useState<{
    title: string;
    department: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    description: string;
    requirements: string[];
    responsibilities: string[];
    salaryRange: string;
    experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
    applicationDeadline: string;
    isActive: boolean;
  }>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: [''],
    responsibilities: [''],
    salaryRange: '',
    experienceLevel: 'entry',
    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 30 days from now
    isActive: true,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [requirementInput, setRequirementInput] = useState('');
  const [responsibilityInput, setResponsibilityInput] = useState('');

  // Mock data for initial display
  const mockJobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'full-time',
      description:
        'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
      requirements: [
        '5+ years of experience in full-stack development',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, Azure, or GCP)',
        'Strong understanding of database design and optimization',
        'Excellent problem-solving and communication skills',
      ],
      responsibilities: [
        'Develop and maintain scalable web applications',
        'Collaborate with cross-functional teams to define and implement new features',
        'Write clean, maintainable, and well-documented code',
        'Participate in code reviews and technical discussions',
        'Mentor junior developers and contribute to team growth',
      ],
      salaryRange: '$90,000 - $130,000',
      experienceLevel: 'senior',
      applicationDeadline: '2024-03-15',
      isActive: true,
      slug: 'senior-full-stack-developer',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      _count: { applications: 12 },
    },
    {
      id: '2',
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'full-time',
      description:
        'Join our design team to create intuitive and beautiful user experiences. You will work closely with product managers and developers to bring designs to life.',
      requirements: [
        '3+ years of experience in UI/UX design',
        'Proficiency in Figma, Sketch, or Adobe Creative Suite',
        'Strong portfolio showcasing web and mobile designs',
        'Understanding of user-centered design principles',
        'Experience with design systems and component libraries',
      ],
      responsibilities: [
        'Create wireframes, prototypes, and high-fidelity designs',
        'Conduct user research and usability testing',
        'Collaborate with developers to ensure design implementation',
        'Maintain and evolve design systems',
        'Present design concepts to stakeholders',
      ],
      salaryRange: '$70,000 - $95,000',
      experienceLevel: 'mid',
      applicationDeadline: '2024-02-28',
      isActive: true,
      slug: 'ui-ux-designer',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
      _count: { applications: 8 },
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'San Francisco, CA',
      type: 'full-time',
      description:
        'We are seeking a DevOps Engineer to help us build and maintain our cloud infrastructure. You will work on automation, monitoring, and deployment pipelines.',
      requirements: [
        '4+ years of experience in DevOps or Site Reliability Engineering',
        'Experience with containerization (Docker, Kubernetes)',
        'Proficiency in Infrastructure as Code (Terraform, CloudFormation)',
        'Strong scripting skills (Python, Bash, or PowerShell)',
        'Experience with CI/CD pipelines and monitoring tools',
      ],
      responsibilities: [
        'Design and implement scalable infrastructure solutions',
        'Automate deployment and monitoring processes',
        'Ensure system reliability and performance',
        'Collaborate with development teams on deployment strategies',
        'Troubleshoot and resolve infrastructure issues',
      ],
      salaryRange: '$95,000 - $140,000',
      experienceLevel: 'senior',
      applicationDeadline: '2024-03-01',
      isActive: false,
      slug: 'devops-engineer',
      createdAt: '2024-01-05T10:00:00Z',
      updatedAt: '2024-01-20T10:00:00Z',
      _count: { applications: 15 },
    },
  ];

  // Fetch job positions
  const fetchJobPositions = async () => {
    try {
      setLoading(true);

      if (mockAPI) {
        // Use mock data
        setJobPositions(mockJobPositions);
      } else {
        // Fetch from API
        const response = await axios.get(`${apiURL}/career/positions`);
        const positionData = response.data?.data?.jobPositions || response.data?.data;
        setJobPositions(Array.isArray(positionData) ? positionData : []);
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error fetching job positions:', error);
      }
      // Fallback to mock data
      setJobPositions(mockJobPositions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPositions();
  }, []);

  // Handle save job position
  const handleSavePosition = async (positionData: JobPosition) => {
    try {
      if (mockAPI) {
        // Mock save
        if (editingPosition) {
          // Update existing position
          setJobPositions(prev =>
            prev.map(pos =>
              pos.id === editingPosition.id
                ? { ...positionData, id: editingPosition.id, updatedAt: new Date().toISOString() }
                : pos
            )
          );
        } else {
          // Add new position
          const newPos = {
            ...positionData,
            id: Date.now().toString(),
            slug: positionData.title.toLowerCase().replace(/\s+/g, '-'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            _count: { applications: 0 },
          };
          setJobPositions(prev => [newPos, ...prev]);
        }
      } else {
        // API save
        if (editingPosition) {
          await axios.put(`${apiURL}/career/positions/${editingPosition.id}`, positionData);
        } else {
          await axios.post(`${apiURL}/career/positions`, positionData);
        }
        await fetchJobPositions();
      }

      // Reset form
      setEditingPosition(null);
      setShowAddModal(false);
      setNewPosition({
        title: '',
        department: '',
        location: '',
        type: 'full-time',
        description: '',
        requirements: [''],
        responsibilities: [''],
        salaryRange: '',
        experienceLevel: 'entry',
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        isActive: true,
      });
    } catch (error) {
      if (isDevelopment) {
        console.error('Error saving job position:', error);
      }
    }
  };

  // Handle delete job position
  const handleDeletePosition = async (id: string) => {
    try {
      if (mockAPI) {
        // Mock delete
        setJobPositions(prev => prev.filter(pos => pos.id !== id));
      } else {
        // API delete
        await axios.delete(`${apiURL}/career/positions/${id}`);
        await fetchJobPositions();
      }
      setShowDeleteConfirm(null);
    } catch (error) {
      if (isDevelopment) {
        console.error('Error deleting job position:', error);
      }
    }
  };

  // Handle toggle position status
  const handleToggleStatus = async (id: string) => {
    try {
      if (mockAPI) {
        // Mock toggle
        setJobPositions(prev =>
          prev.map(pos =>
            pos.id === id
              ? { ...pos, isActive: !pos.isActive, updatedAt: new Date().toISOString() }
              : pos
          )
        );
      } else {
        // API toggle
        await axios.patch(`${apiURL}/career/positions/${id}/toggle-status`);
        await fetchJobPositions();
      }
    } catch (error) {
      if (isDevelopment) {
        console.error('Error toggling position status:', error);
      }
    }
  };

  // Add requirement
  const addRequirement = (isEdit = false) => {
    const input = requirementInput.trim();
    if (input) {
      if (isEdit && editingPosition) {
        setEditingPosition({
          ...editingPosition,
          requirements: [...editingPosition.requirements, input],
        });
      } else {
        setNewPosition({
          ...newPosition,
          requirements: [...newPosition.requirements, input],
        });
      }
      setRequirementInput('');
    }
  };

  // Remove requirement
  const removeRequirement = (index: number, isEdit = false) => {
    if (isEdit && editingPosition) {
      setEditingPosition({
        ...editingPosition,
        requirements: editingPosition.requirements.filter((_, i) => i !== index),
      });
    } else {
      setNewPosition({
        ...newPosition,
        requirements: newPosition.requirements.filter((_, i) => i !== index),
      });
    }
  };

  // Add responsibility
  const addResponsibility = (isEdit = false) => {
    const input = responsibilityInput.trim();
    if (input) {
      if (isEdit && editingPosition) {
        setEditingPosition({
          ...editingPosition,
          responsibilities: [...editingPosition.responsibilities, input],
        });
      } else {
        setNewPosition({
          ...newPosition,
          responsibilities: [...newPosition.responsibilities, input],
        });
      }
      setResponsibilityInput('');
    }
  };

  // Remove responsibility
  const removeResponsibility = (index: number, isEdit = false) => {
    if (isEdit && editingPosition) {
      setEditingPosition({
        ...editingPosition,
        responsibilities: editingPosition.responsibilities.filter((_, i) => i !== index),
      });
    } else {
      setNewPosition({
        ...newPosition,
        responsibilities: newPosition.responsibilities.filter((_, i) => i !== index),
      });
    }
  };

  // Filter positions
  const filteredPositions = jobPositions.filter(position => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === 'all' || position.department === filterDepartment;
    const matchesType = filterType === 'all' || position.type === filterType;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && position.isActive) ||
      (filterStatus === 'inactive' && !position.isActive);

    return matchesSearch && matchesDepartment && matchesType && matchesStatus;
  });

  // Get unique departments for filter
  const departments = Array.from(new Set(jobPositions.map(pos => pos.department)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Career Management
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Add New Position
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search positions..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <select
                value={filterDepartment}
                onChange={e => setFilterDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Positions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredPositions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No job positions found
                  </td>
                </tr>
              ) : (
                filteredPositions.map(position => (
                  <tr key={position.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {position.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {position.experienceLevel} • {position.salaryRange}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {position.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {position.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          position.type === 'full-time'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : position.type === 'part-time'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : position.type === 'contract'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        }`}
                      >
                        {position.type.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {position._count?.applications || 0}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(position.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          position.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}
                      >
                        {position.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button
                        onClick={() => setEditingPosition(position)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(position.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Position Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Add New Job Position
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={newPosition.title}
                    onChange={e => setNewPosition({ ...newPosition, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Senior Full Stack Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={newPosition.department}
                    onChange={e => setNewPosition({ ...newPosition, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newPosition.location}
                    onChange={e => setNewPosition({ ...newPosition, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., Remote, New York, NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employment Type *
                  </label>
                  <select
                    value={newPosition.type}
                    onChange={e => setNewPosition({ ...newPosition, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level *
                  </label>
                  <select
                    value={newPosition.experienceLevel}
                    onChange={e =>
                      setNewPosition({ ...newPosition, experienceLevel: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={newPosition.salaryRange}
                    onChange={e => setNewPosition({ ...newPosition, salaryRange: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., $80,000 - $120,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    value={newPosition.applicationDeadline}
                    onChange={e =>
                      setNewPosition({ ...newPosition, applicationDeadline: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newPosition.isActive}
                    onChange={e => setNewPosition({ ...newPosition, isActive: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isActive"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Active Position
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description *
                </label>
                <textarea
                  value={newPosition.description}
                  onChange={e => setNewPosition({ ...newPosition, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Requirements
                </label>
                <div className="space-y-2">
                  {newPosition.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={req}
                        onChange={e => {
                          const updatedReqs = [...newPosition.requirements];
                          updatedReqs[index] = e.target.value;
                          setNewPosition({ ...newPosition, requirements: updatedReqs });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter requirement..."
                      />
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={requirementInput}
                      onChange={e => setRequirementInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addRequirement()}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Add new requirement..."
                    />
                    <button
                      type="button"
                      onClick={() => addRequirement()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Responsibilities
                </label>
                <div className="space-y-2">
                  {newPosition.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={e => {
                          const updatedResps = [...newPosition.responsibilities];
                          updatedResps[index] = e.target.value;
                          setNewPosition({ ...newPosition, responsibilities: updatedResps });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter responsibility..."
                      />
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={responsibilityInput}
                      onChange={e => setResponsibilityInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addResponsibility()}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Add new responsibility..."
                    />
                    <button
                      type="button"
                      onClick={() => addResponsibility()}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewPosition({
                    title: '',
                    department: '',
                    location: '',
                    type: 'full-time',
                    description: '',
                    requirements: [''],
                    responsibilities: [''],
                    salaryRange: '',
                    experienceLevel: 'entry',
                    applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .split('T')[0],
                    isActive: true,
                  });
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePosition(newPosition as JobPosition)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Add Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Position Modal */}
      {editingPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Edit Job Position
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={editingPosition.title}
                    onChange={e =>
                      setEditingPosition({ ...editingPosition, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department *
                  </label>
                  <input
                    type="text"
                    value={editingPosition.department}
                    onChange={e =>
                      setEditingPosition({ ...editingPosition, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={editingPosition.location}
                    onChange={e =>
                      setEditingPosition({ ...editingPosition, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Employment Type *
                  </label>
                  <select
                    value={editingPosition.type}
                    onChange={e =>
                      setEditingPosition({ ...editingPosition, type: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Experience Level *
                  </label>
                  <select
                    value={editingPosition.experienceLevel}
                    onChange={e =>
                      setEditingPosition({
                        ...editingPosition,
                        experienceLevel: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                    <option value="lead">Lead Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={editingPosition.salaryRange}
                    onChange={e =>
                      setEditingPosition({ ...editingPosition, salaryRange: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    value={editingPosition.applicationDeadline}
                    onChange={e =>
                      setEditingPosition({
                        ...editingPosition,
                        applicationDeadline: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="editIsActive"
                    checked={editingPosition.isActive}
                    onChange={e =>
                      setEditingPosition({ ...editingPosition, isActive: e.target.checked })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="editIsActive"
                    className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                  >
                    Active Position
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description *
                </label>
                <textarea
                  value={editingPosition.description}
                  onChange={e =>
                    setEditingPosition({ ...editingPosition, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Edit Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Requirements
                </label>
                <div className="space-y-2">
                  {editingPosition.requirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={req}
                        onChange={e => {
                          const updatedReqs = [...editingPosition.requirements];
                          updatedReqs[index] = e.target.value;
                          setEditingPosition({ ...editingPosition, requirements: updatedReqs });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeRequirement(index, true)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={requirementInput}
                      onChange={e => setRequirementInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addRequirement(true)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Add new requirement..."
                    />
                    <button
                      type="button"
                      onClick={() => addRequirement(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Edit Responsibilities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Responsibilities
                </label>
                <div className="space-y-2">
                  {editingPosition.responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={e => {
                          const updatedResps = [...editingPosition.responsibilities];
                          updatedResps[index] = e.target.value;
                          setEditingPosition({
                            ...editingPosition,
                            responsibilities: updatedResps,
                          });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeResponsibility(index, true)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={responsibilityInput}
                      onChange={e => setResponsibilityInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addResponsibility(true)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Add new responsibility..."
                    />
                    <button
                      type="button"
                      onClick={() => addResponsibility(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setEditingPosition(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePosition(editingPosition)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this job position? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePosition(showDeleteConfirm)}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerTab;
