import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ContactInfo {
  id: number;
  type: 'address' | 'phone' | 'email' | 'businessHours';
  value: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

interface ContactInfoFormData {
  type: 'address' | 'phone' | 'email' | 'businessHours';
  value: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

const ContactInfoTab: React.FC = () => {
  const [contactInfoList, setContactInfoList] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState<ContactInfoFormData>({
    type: 'address',
    value: '',
    icon: '',
    displayOrder: 1,
    isActive: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Development mode flag
  const isDevelopment = process.env.NODE_ENV === 'development';
  const apiURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Mock data for development
  const mockContactInfo: ContactInfo[] = [
    {
      id: 1,
      type: 'address',
      value: '123 Tech Street, Innovation District\nSilicon Valley, CA 94000',
      icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
      displayOrder: 1,
      isActive: true,
    },
    {
      id: 2,
      type: 'phone',
      value: '+1 (555) 123-4567',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      displayOrder: 2,
      isActive: true,
    },
    {
      id: 3,
      type: 'email',
      value: 'contact@techgiant.com',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      displayOrder: 3,
      isActive: true,
    },
    {
      id: 4,
      type: 'businessHours',
      value: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      displayOrder: 4,
      isActive: true,
    },
  ];

  // Fetch contact info
  const fetchContactInfo = async () => {
    try {
      setLoading(true);

      if (isDevelopment) {
        // Use mock data in development
        setTimeout(() => {
          setContactInfoList(mockContactInfo);
          setLoading(false);
        }, 500);
      } else {
        // Use actual API in production
        const response = await axios.get(`${apiURL}/api/v1/contact-info`);
        setContactInfoList(response.data.data || []);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
      setContactInfoList(mockContactInfo); // Fallback to mock data
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitStatus('idle');

      if (isDevelopment) {
        // Mock API call in development
        setTimeout(() => {
          if (editingItem) {
            // Update existing item
            setContactInfoList(prev =>
              prev.map(item => (item.id === editingItem.id ? { ...item, ...formData } : item))
            );
          } else {
            // Add new item
            const newItem: ContactInfo = {
              id: Date.now(),
              ...formData,
            };
            setContactInfoList(prev => [...prev, newItem]);
          }
          setSubmitStatus('success');
          handleCloseModal();
        }, 500);
      } else {
        // Use actual API in production
        if (editingItem) {
          await axios.put(`${apiURL}/api/v1/contact-info/${editingItem.id}`, formData);
        } else {
          await axios.post(`${apiURL}/api/v1/contact-info`, formData);
        }
        setSubmitStatus('success');
        fetchContactInfo();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving contact info:', error);
      setSubmitStatus('error');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this contact info?')) {
      return;
    }

    try {
      if (isDevelopment) {
        // Mock API call in development
        setTimeout(() => {
          setContactInfoList(prev => prev.filter(item => item.id !== id));
        }, 300);
      } else {
        // Use actual API in production
        await axios.delete(`${apiURL}/api/v1/contact-info/${id}`);
        fetchContactInfo();
      }
    } catch (error) {
      console.error('Error deleting contact info:', error);
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.value.trim()) {
      newErrors.value = 'Value is required';
    }

    if (!formData.icon.trim()) {
      newErrors.icon = 'Icon is required';
    }

    if (formData.displayOrder < 1) {
      newErrors.displayOrder = 'Display order must be at least 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle modal open
  const handleOpenModal = (item?: ContactInfo) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        type: item.type,
        value: item.value,
        icon: item.icon,
        displayOrder: item.displayOrder,
        isActive: item.isActive,
      });
    } else {
      setEditingItem(null);
      setFormData({
        type: 'address',
        value: '',
        icon: '',
        displayOrder: contactInfoList.length + 1,
        isActive: true,
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setErrors({});
    setSubmitStatus('idle');
  };

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'displayOrder'
            ? parseInt(value) || 1
            : value,
    }));
  };

  // Get type label
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'address':
        return 'Address';
      case 'phone':
        return 'Phone';
      case 'email':
        return 'Email';
      case 'businessHours':
        return 'Business Hours';
      default:
        return type;
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

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
        <h2 className="text-2xl font-bold text-gray-800">Contact Information Management</h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Contact Info
        </button>
      </div>

      {/* Contact Info List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contactInfoList.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 whitespace-pre-line">{item.value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.displayOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Edit Contact Info' : 'Add Contact Info'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="address">Address</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="businessHours">Business Hours</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                <textarea
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact information..."
                />
                {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon (SVG Path)
                </label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter SVG path..."
                />
                {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.displayOrder && (
                  <p className="text-red-500 text-sm mt-1">{errors.displayOrder}</p>
                )}
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  Failed to save contact info. Please try again.
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfoTab;
