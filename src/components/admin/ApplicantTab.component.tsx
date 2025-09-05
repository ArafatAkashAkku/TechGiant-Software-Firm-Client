import React, { useState, useEffect } from 'react';
import { isDevelopment, apiURL, mockAPI } from '../../utilities/app.utilities';
import axios from 'axios';

interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resumeUrl?: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  adminNotes?: string;
  appliedAt: string;
  updatedAt: string;
  jobPosition: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
}

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
}

const ApplicantTab: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewingApplication, setViewingApplication] = useState<JobApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPosition, setFilterPosition] = useState('all');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [bulkStatus, setBulkStatus] = useState<JobApplication['status']>('pending');
  const [bulkNotes, setBulkNotes] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // Mock data for initial display
  const mockApplications: JobApplication[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      coverLetter:
        'I am excited to apply for the Senior Full Stack Developer position. With over 6 years of experience in full-stack development, I have worked extensively with React, Node.js, and TypeScript. I am passionate about creating scalable web applications and would love to contribute to your team.',
      resumeUrl: '/uploads/resumes/john-doe-resume.pdf',
      status: 'reviewing',
      adminNotes: 'Strong technical background, good portfolio',
      appliedAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-22T14:15:00Z',
      jobPosition: {
        id: '1',
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote',
      },
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      coverLetter:
        'As a UI/UX designer with 4 years of experience, I am thrilled about the opportunity to join your design team. My expertise in Figma and user-centered design principles, combined with my passion for creating intuitive user experiences, makes me a perfect fit for this role.',
      resumeUrl: '/uploads/resumes/sarah-johnson-resume.pdf',
      status: 'shortlisted',
      adminNotes: 'Excellent portfolio, scheduled for interview',
      appliedAt: '2024-01-18T09:15:00Z',
      updatedAt: '2024-01-21T11:30:00Z',
      jobPosition: {
        id: '2',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'New York, NY',
      },
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 456-7890',
      coverLetter:
        'I am writing to express my interest in the DevOps Engineer position. With 5 years of experience in cloud infrastructure and automation, I have extensive knowledge of Docker, Kubernetes, and Terraform. I am excited about the opportunity to help build and maintain your cloud infrastructure.',
      resumeUrl: '/uploads/resumes/michael-chen-resume.pdf',
      status: 'interviewed',
      adminNotes: 'Great technical interview, waiting for final decision',
      appliedAt: '2024-01-15T16:45:00Z',
      updatedAt: '2024-01-25T10:00:00Z',
      jobPosition: {
        id: '3',
        title: 'DevOps Engineer',
        department: 'Infrastructure',
        location: 'San Francisco, CA',
      },
    },
    {
      id: '4',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 321-0987',
      coverLetter:
        'I am interested in the Senior Full Stack Developer position. As a recent graduate with internship experience and strong academic background in computer science, I am eager to start my career in full-stack development.',
      resumeUrl: '/uploads/resumes/emily-rodriguez-resume.pdf',
      status: 'pending',
      appliedAt: '2024-01-25T14:20:00Z',
      updatedAt: '2024-01-25T14:20:00Z',
      jobPosition: {
        id: '1',
        title: 'Senior Full Stack Developer',
        department: 'Engineering',
        location: 'Remote',
      },
    },
    {
      id: '5',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@email.com',
      phone: '+1 (555) 654-3210',
      coverLetter:
        'I am applying for the UI/UX Designer role. Unfortunately, after careful consideration, I have decided to pursue other opportunities.',
      resumeUrl: '/uploads/resumes/david-wilson-resume.pdf',
      status: 'rejected',
      adminNotes: 'Candidate withdrew application',
      appliedAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-19T09:30:00Z',
      jobPosition: {
        id: '2',
        title: 'UI/UX Designer',
        department: 'Design',
        location: 'New York, NY',
      },
    },
  ];

  const mockJobPositions: JobPosition[] = [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
    },
    { id: '2', title: 'UI/UX Designer', department: 'Design', location: 'New York, NY' },
    {
      id: '3',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'San Francisco, CA',
    },
  ];

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);

      if (mockAPI) {
        // Use mock data
        setApplications(mockApplications);
        setJobPositions(mockJobPositions);
      } else {
        // Fetch from API
        const [applicationsResponse, positionsResponse] = await Promise.all([
          axios.get(`${apiURL}/applications`),
          axios.get(`${apiURL}/career/positions`),
        ]);

        const applicationData =
          applicationsResponse.data?.data?.applications || applicationsResponse.data?.data;
        const positionData =
          positionsResponse.data?.data?.jobPositions || positionsResponse.data?.data;

        setApplications(Array.isArray(applicationData) ? applicationData : []);
        setJobPositions(Array.isArray(positionData) ? positionData : []);
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error fetching applications:', error);
      }
      // Fallback to mock data
      setApplications(mockApplications);
      setJobPositions(mockJobPositions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle update application status
  const handleUpdateApplication = async (
    id: string,
    status: JobApplication['status'],
    adminNotes?: string
  ) => {
    try {
      if (mockAPI) {
        // Mock update
        setApplications(prev =>
          prev.map(app =>
            app.id === id
              ? {
                  ...app,
                  status,
                  adminNotes: adminNotes || app.adminNotes,
                  updatedAt: new Date().toISOString(),
                }
              : app
          )
        );
      } else {
        // API update
        await axios.put(`${apiURL}/applications/${id}`, { status, adminNotes });
        await fetchApplications();
      }
    } catch (error) {
      if (isDevelopment) {
        console.error('Error updating application:', error);
      }
    }
  };

  // Handle bulk update
  const handleBulkUpdate = async () => {
    try {
      if (mockAPI) {
        // Mock bulk update
        setApplications(prev =>
          prev.map(app =>
            selectedApplications.includes(app.id)
              ? {
                  ...app,
                  status: bulkStatus,
                  adminNotes: bulkNotes || app.adminNotes,
                  updatedAt: new Date().toISOString(),
                }
              : app
          )
        );
      } else {
        // API bulk update
        await axios.put(`${apiURL}/applications/bulk`, {
          applicationIds: selectedApplications,
          status: bulkStatus,
          adminNotes: bulkNotes,
        });
        await fetchApplications();
      }

      setSelectedApplications([]);
      setShowBulkUpdate(false);
      setBulkStatus('pending');
      setBulkNotes('');
    } catch (error) {
      if (isDevelopment) {
        console.error('Error bulk updating applications:', error);
      }
    }
  };

  // Handle delete application
  const handleDeleteApplication = async (id: string) => {
    try {
      if (mockAPI) {
        // Mock delete
        setApplications(prev => prev.filter(app => app.id !== id));
      } else {
        // API delete
        await axios.delete(`${apiURL}/applications/${id}`);
        await fetchApplications();
      }
      setShowDeleteConfirm(null);
    } catch (error) {
      if (isDevelopment) {
        console.error('Error deleting application:', error);
      }
    }
  };

  // Handle select all applications
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(filteredApplications.map(app => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  // Handle individual selection
  const handleSelectApplication = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications(prev => [...prev, id]);
    } else {
      setSelectedApplications(prev => prev.filter(appId => appId !== id));
    }
  };

  // Filter applications
  const filteredApplications = applications.filter(application => {
    const matchesSearch =
      application.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.jobPosition.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || application.status === filterStatus;
    const matchesPosition =
      filterPosition === 'all' || application.jobPosition.id === filterPosition;

    return matchesSearch && matchesStatus && matchesPosition;
  });

  // Get status color
  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'interviewed':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'hired':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Job Applications Management
            </h2>
            {selectedApplications.length > 0 && (
              <button
                onClick={() => setShowBulkUpdate(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Bulk Update ({selectedApplications.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search applicants..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
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
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Position
              </label>
              <select
                value={filterPosition}
                onChange={e => setFilterPosition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Positions</option>
                {jobPositions.map(position => (
                  <option key={position.id} value={position.id}>
                    {position.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedApplications.length === filteredApplications.length &&
                      filteredApplications.length > 0
                    }
                    onChange={e => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Applied Date
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
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                filteredApplications.map(application => (
                  <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(application.id)}
                        onChange={e => handleSelectApplication(application.id, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.firstName} {application.lastName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {application.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {application.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {application.jobPosition.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {application.jobPosition.department} • {application.jobPosition.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatDate(application.appliedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={application.status}
                        onChange={e =>
                          handleUpdateApplication(
                            application.id,
                            e.target.value as JobApplication['status']
                          )
                        }
                        className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 focus:ring-2 focus:ring-blue-500 ${getStatusColor(application.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button
                        onClick={() => setViewingApplication(application)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                      {application.resumeUrl && (
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Resume
                        </a>
                      )}
                      <button
                        onClick={() => setShowDeleteConfirm(application.id)}
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

      {/* View Application Modal */}
      {viewingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Application Details
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {/* Applicant Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Applicant Information
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Name:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {viewingApplication.firstName} {viewingApplication.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {viewingApplication.email}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Phone:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {viewingApplication.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Applied:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {formatDate(viewingApplication.appliedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Position Information
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Title:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {viewingApplication.jobPosition.title}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Department:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {viewingApplication.jobPosition.department}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Location:</span>
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {viewingApplication.jobPosition.location}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status:</span>
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(viewingApplication.status)}`}
                      >
                        {viewingApplication.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Cover Letter
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                    {viewingApplication.coverLetter}
                  </p>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Admin Notes
                </h4>
                <textarea
                  value={viewingApplication.adminNotes || ''}
                  onChange={e =>
                    setViewingApplication({ ...viewingApplication, adminNotes: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add admin notes..."
                />
              </div>

              {/* Status Update */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Update Status
                </h4>
                <select
                  value={viewingApplication.status}
                  onChange={e =>
                    setViewingApplication({
                      ...viewingApplication,
                      status: e.target.value as JobApplication['status'],
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => setViewingApplication(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdateApplication(
                    viewingApplication.id,
                    viewingApplication.status,
                    viewingApplication.adminNotes
                  );
                  setViewingApplication(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Update Modal */}
      {showBulkUpdate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Bulk Update Applications ({selectedApplications.length})
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={bulkStatus}
                  onChange={e => setBulkStatus(e.target.value as JobApplication['status'])}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Admin Notes (Optional)
                </label>
                <textarea
                  value={bulkNotes}
                  onChange={e => setBulkNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add notes for all selected applications..."
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowBulkUpdate(false);
                  setBulkStatus('pending');
                  setBulkNotes('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Update Applications
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
                Are you sure you want to delete this application? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteApplication(showDeleteConfirm)}
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

export default ApplicantTab;
