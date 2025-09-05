import React, { useState, useEffect } from 'react';
import { isDevelopment, apiURL, mockAPI } from '../../utilities/app.utilities';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../../utilities/toast.utilities';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const TestimonialsTab: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    avatar: '',
  });

  // Mock data for initial display
  const mockTestimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CTO',
      company: 'InnovateTech Solutions',
      content:
        'TechGiant transformed our entire digital infrastructure. Their expertise in cloud migration and system optimization resulted in 40% improved performance and significant cost savings.',
      rating: 5,
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CEO',
      company: 'DataFlow Analytics',
      content:
        'Working with TechGiant was a game-changer for our startup. They delivered a scalable platform that handles millions of data points seamlessly.',
      rating: 5,
      avatar: 'MC',
    },
  ];

  // Fetch testimonials data
  const fetchTestimonialsData = async () => {
    try {
      setLoading(true);

      if (mockAPI) {
        // For now, using mock data
        setTestimonials(mockTestimonials);
      } else {
        // TODO: Replace with actual API call
        const response = await axios.get(`${apiURL}/testimonials`);
        const testimonialsData = response.data?.data;
        setTestimonials(Array.isArray(testimonialsData) ? testimonialsData : []);
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error fetching testimonials:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add testimonial to API
  const addTestimonialToAPI = async (testimonial: Testimonial) => {
    try {
      setLoading(true);

      if (mockAPI) {
        return testimonial;
      } else {
        // TODO: Replace with actual API call
        const response = await axios.post(`${apiURL}/testimonials`, testimonial);
        if (response.data.success) {
          showSuccessToast('Testimonial added successfully');
        }
        fetchTestimonialsData();
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error adding testimonial:', error);
      }
      showErrorToast('Error adding testimonial');
    } finally {
      setLoading(false);
    }
  };

  // Update testimonial in API
  const updateTestimonialInAPI = async (testimonial: Testimonial) => {
    try {
      setLoading(true);

      if (mockAPI) {
        return testimonial;
      } else {
        // TODO: Replace with actual API call
        const response = await axios.put(`${apiURL}/testimonials/${testimonial.id}`, testimonial);
        if (response.data.success) {
          showSuccessToast('Testimonial updated successfully');
        }
        fetchTestimonialsData();
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error updating testimonial:', error);
      }
      showErrorToast('Error updating testimonial');
    } finally {
      setLoading(false);
    }
  };

  // Delete testimonial from API
  const deleteTestimonialFromAPI = async (id: number) => {
    try {
      setLoading(true);
      if (mockAPI) {
        showSuccessToast('Testimonial deleted successfully!');
      } else {
        // TODO: Replace with actual API call
        const response = await axios.delete(`${apiURL}/testimonials/${id}`);
        if (response.data.success) {
          showSuccessToast('Testimonial deleted successfully');
        }
        fetchTestimonialsData();
      }
    } catch (error) {
      if (isDevelopment) {
        console.log('Error deleting testimonial:', error);
      }
      showErrorToast('Error deleting testimonial');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonialsData();
  }, []);

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
  };

  const handleSave = async () => {
    if (editingTestimonial) {
      try {
        await updateTestimonialInAPI(editingTestimonial);
        const updatedTestimonials = (testimonials || []).map(t =>
          t.id === editingTestimonial.id ? editingTestimonial : t
        );
        setTestimonials(updatedTestimonials);
        setEditingTestimonial(null);
      } catch (error) {
        if (isDevelopment) {
          console.log('Failed to update testimonial:', error);
        }
      }
    }
  };

  const confirmDelete = (id: number) => {
    setShowDeleteConfirm(id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTestimonialFromAPI(id);
      const updatedTestimonials = (testimonials || []).filter(t => t.id !== id);
      setTestimonials(updatedTestimonials);
      setShowDeleteConfirm(null);
    } catch (error) {
      if (isDevelopment) {
        console.log('Failed to delete testimonial:', error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleAddNew = async () => {
    const newId = Math.max(...(testimonials || []).map(t => t.id), 0) + 1;
    const testimonialToAdd: Testimonial = {
      ...newTestimonial,
      id: newId,
    };

    try {
      await addTestimonialToAPI(testimonialToAdd);
      const updatedTestimonials = [...(testimonials || []), testimonialToAdd];
      setTestimonials(updatedTestimonials);

      setNewTestimonial({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        avatar: '',
      });
      setShowAddModal(false);
    } catch (error) {
      if (isDevelopment) {
        console.log('Failed to add testimonial:', error);
      }
    }
  };

  const renderStars = (rating: number, onChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => onChange && onChange(index + 1)}
        className={`w-5 h-5 ${onChange ? 'cursor-pointer' : 'cursor-default'} ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
        disabled={!onChange}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Testimonials Management
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add New Testimonial
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      )}

      <div className="grid gap-6">
        {testimonials && testimonials.length === 0 && (
          <div className="text-center py-4">
            <div className="text-gray-600 dark:text-gray-400">No testimonials found.</div>{' '}
          </div>
        )}

        {(testimonials || []).map(testimonial => (
          <div key={testimonial.id} className="border dark:border-gray-700 rounded-lg p-6">
            {editingTestimonial && editingTestimonial.id === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.name}
                      onChange={e =>
                        setEditingTestimonial({ ...editingTestimonial, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.position}
                      onChange={e =>
                        setEditingTestimonial({ ...editingTestimonial, position: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.company}
                      onChange={e =>
                        setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Avatar (Initials)
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.avatar}
                    onChange={e =>
                      setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., SJ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Content
                  </label>
                  <textarea
                    value={editingTestimonial.content}
                    onChange={e =>
                      setEditingTestimonial({ ...editingTestimonial, content: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rating
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderStars(editingTestimonial.rating, rating =>
                      setEditingTestimonial({ ...editingTestimonial, rating })
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTestimonial(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonial.position} at {testimonial.company}
                      </p>
                      <div className="flex items-center mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(testimonial.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add New Testimonial
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.position}
                    onChange={e =>
                      setNewTestimonial({ ...newTestimonial, position: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.company}
                    onChange={e =>
                      setNewTestimonial({ ...newTestimonial, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Avatar (Initials)
                </label>
                <input
                  type="text"
                  value={newTestimonial.avatar}
                  onChange={e => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., SJ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={newTestimonial.content}
                  onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars(newTestimonial.rating, rating =>
                    setNewTestimonial({ ...newTestimonial, rating })
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNew}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Add Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsTab;
