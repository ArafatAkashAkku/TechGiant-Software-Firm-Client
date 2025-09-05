import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

interface ContactStats {
  total: number;
  unread: number;
  read: number;
  replied: number;
  archived: number;
}

const ContactsTab: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState<ContactStats>({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    archived: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Development mode flag
  const isDevelopment = process.env.NODE_ENV === 'development';
  const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Mock data for development
  const mockSubmissions: ContactSubmission[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Tech Solutions Inc.',
      subject: 'Website Development Inquiry',
      message:
        'Hi, I am interested in developing a new website for my business. Could you please provide more information about your services and pricing?',
      status: 'unread',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      phone: '+1 (555) 987-6543',
      company: 'Digital Marketing Pro',
      subject: 'Mobile App Development',
      message:
        'We need a mobile application for our business. Can we schedule a meeting to discuss the requirements?',
      status: 'read',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.j@startup.io',
      phone: '+1 (555) 456-7890',
      company: 'StartupXYZ',
      subject: 'E-commerce Platform',
      message:
        'Looking for an e-commerce solution with payment integration. What technologies do you recommend?',
      status: 'replied',
      createdAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T16:30:00Z',
    },
    {
      id: 4,
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@enterprise.com',
      phone: '+1 (555) 321-0987',
      company: 'Enterprise Solutions',
      subject: 'Custom Software Development',
      message:
        'We require custom software development for our internal processes. Please send us a detailed proposal.',
      status: 'archived',
      createdAt: '2024-01-12T11:45:00Z',
      updatedAt: '2024-01-12T17:20:00Z',
    },
  ];

  const mockStats: ContactStats = {
    total: 4,
    unread: 1,
    read: 1,
    replied: 1,
    archived: 1,
  };

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      setLoading(true);

      if (isDevelopment) {
        // Use mock data in development
        setTimeout(() => {
          setSubmissions(mockSubmissions);
          setStats(mockStats);
          setLoading(false);
        }, 500);
      } else {
        // Use actual API in production
        const [submissionsResponse, statsResponse] = await Promise.all([
          axios.get(`${apiURL}/api/v1/contact-submissions`, {
            params: {
              page: currentPage,
              limit: itemsPerPage,
              status: statusFilter !== 'all' ? statusFilter : undefined,
              search: searchTerm || undefined,
            },
          }),
          axios.get(`${apiURL}/api/v1/contact-submissions/stats`),
        ]);

        setSubmissions(submissionsResponse.data.data || []);
        setStats(statsResponse.data.data || mockStats);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setSubmissions(mockSubmissions); // Fallback to mock data
      setStats(mockStats);
      setLoading(false);
    }
  };

  // Update submission status
  const updateSubmissionStatus = async (id: number, status: ContactSubmission['status']) => {
    try {
      if (isDevelopment) {
        // Mock API call in development
        setTimeout(() => {
          setSubmissions(prev =>
            prev.map(submission =>
              submission.id === id
                ? { ...submission, status, updatedAt: new Date().toISOString() }
                : submission
            )
          );
          // Update stats
          setStats(prev => {
            const oldSubmission = submissions.find(s => s.id === id);
            if (!oldSubmission) return prev;

            return {
              ...prev,
              [oldSubmission.status]: prev[oldSubmission.status] - 1,
              [status]: prev[status] + 1,
            };
          });
        }, 300);
      } else {
        // Use actual API in production
        await axios.put(`${apiURL}/api/v1/contact-submissions/${id}`, { status });
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error updating submission status:', error);
    }
  };

  // Delete submission
  const deleteSubmission = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      if (isDevelopment) {
        // Mock API call in development
        setTimeout(() => {
          setSubmissions(prev => prev.filter(submission => submission.id !== id));
          setStats(prev => ({ ...prev, total: prev.total - 1 }));
        }, 300);
      } else {
        // Use actual API in production
        await axios.delete(`${apiURL}/api/v1/contact-submissions/${id}`);
        fetchSubmissions();
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  // Handle view details
  const handleViewDetails = async (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setIsDetailModalOpen(true);

    // Mark as read if it's unread
    if (submission.status === 'unread') {
      await updateSubmissionStatus(submission.id, 'read');
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

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread':
        return 'bg-red-100 text-red-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-green-100 text-green-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesSearch =
      searchTerm === '' ||
      submission.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage, statusFilter, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Submissions</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600">{stats.unread}</div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">{stats.read}</div>
          <div className="text-sm text-gray-600">Read</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
          <div className="text-sm text-gray-600">Replied</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
          <div className="text-sm text-gray-600">Archived</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.map(submission => (
              <tr
                key={submission.id}
                className={submission.status === 'unread' ? 'bg-blue-50' : ''}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {submission.firstName} {submission.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{submission.email}</div>
                    <div className="text-sm text-gray-500">{submission.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {submission.company}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {submission.subject}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={submission.status}
                    onChange={e =>
                      updateSubmissionStatus(
                        submission.id,
                        e.target.value as ContactSubmission['status']
                      )
                    }
                    className={`text-xs font-semibold rounded-full px-2 py-1 ${getStatusColor(submission.status)} border-0 focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(submission.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(submission)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteSubmission(submission.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Contact Submission Details</h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
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

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubmission.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubmission.lastName}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubmission.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedSubmission.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <p className="mt-1 text-sm text-gray-900">{selectedSubmission.company}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="mt-1 text-sm text-gray-900">{selectedSubmission.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {selectedSubmission.message}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}
                  >
                    {selectedSubmission.status.charAt(0).toUpperCase() +
                      selectedSubmission.status.slice(1)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Submitted</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(selectedSubmission.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateSubmissionStatus(selectedSubmission.id, 'replied');
                  setIsDetailModalOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Mark as Replied
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsTab;
