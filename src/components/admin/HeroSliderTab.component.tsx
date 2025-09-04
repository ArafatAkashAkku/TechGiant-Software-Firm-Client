import React, { useState, useEffect } from 'react';
import { isDevelopment } from '../../utilities/app.utilities';
// import { apiURL } from '../../utilities/app.utilities';
// import axios from 'axios';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bulletPoints: string[];
}

const HeroSliderTab: React.FC = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [newSlide, setNewSlide] = useState<Omit<SlideData, 'id'>>({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    bulletPoints: ['', '', '', ''],
  });

  // Mock data for now
  const mockSlides: SlideData[] = [
    {
      id: 1,
      title: 'Innovative Software Solutions',
      subtitle: 'Transforming Ideas into Reality',
      description:
        'We deliver cutting-edge software solutions that drive business growth and digital transformation.',
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234F46E5;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%237C3AED;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23grad1)'/%3E%3Cg fill='white' opacity='0.1'%3E%3Ccircle cx='200' cy='150' r='80'/%3E%3Ccircle cx='400' cy='300' r='60'/%3E%3Ccircle cx='800' cy='200' r='100'/%3E%3Ccircle cx='1000' cy='400' r='70'/%3E%3C/g%3E%3Ctext x='600' y='280' text-anchor='middle' fill='white' font-size='48' font-weight='bold'%3EInnovative Solutions%3C/text%3E%3Ctext x='600' y='340' text-anchor='middle' fill='white' font-size='24' opacity='0.9'%3ESoftware Development Excellence%3C/text%3E%3C/svg%3E",
      bulletPoints: [
        'Custom Software Development',
        'Cloud-Native Architecture',
        'AI & Machine Learning Integration',
        '24/7 Technical Support',
      ],
    },
    {
      id: 2,
      title: 'Enterprise Solutions',
      subtitle: 'Scalable & Secure',
      description:
        'Build robust enterprise applications with our proven methodologies and industry best practices.',
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306B6D4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230891B2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23grad2)'/%3E%3Cg fill='white' opacity='0.15'%3E%3Crect x='100' y='100' width='200' height='150' rx='10'/%3E%3Crect x='350' y='200' width='180' height='120' rx='10'/%3E%3Crect x='600' y='150' width='220' height='180' rx='10'/%3E%3Crect x='900' y='180' width='160' height='140' rx='10'/%3E%3C/g%3E%3Ctext x='600' y='280' text-anchor='middle' fill='white' font-size='48' font-weight='bold'%3EEnterprise Ready%3C/text%3E%3Ctext x='600' y='340' text-anchor='middle' fill='white' font-size='24' opacity='0.9'%3EScalable Business Solutions%3C/text%3E%3C/svg%3E",
      bulletPoints: [
        'Microservices Architecture',
        'Advanced Security Protocols',
        'Performance Optimization',
        'Seamless Integration',
      ],
    },
  ];

  // Fetch hero slider data from API
  const fetchHeroSliderData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get(`${apiURL}/hero-slider/`);
      // setSlides(response.data.data);

      setSlides(mockSlides);
    } catch (error) {
      if(isDevelopment){
        console.error('Error fetching hero slider data:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Add new slide to API
  const addSlideToAPI = async (slideData: Omit<SlideData, 'id'>) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.post(`${apiURL}/hero-slider/`, slideData);
      // return response.data.data;

      // Mock response for now
      const newId = Math.max(...slides.map(s => s.id), 0) + 1;
      return { ...slideData, id: newId };
    } catch (error) {
      if(isDevelopment){
        console.error('Error adding slide:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  // Update existing slide in API
  const updateSlideInAPI = async (slideId: number, slideData: SlideData) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.put(`${apiURL}/hero-slider/${slideId}`, slideData);
      // const result = response.data.success;
      // if (result) {
        setSaveMessage('Slide updated successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      // }
    } catch (error) {
      if(isDevelopment){
        console.error('Error updating slide:', error);
      }
        setSaveMessage('Error updating slide. Please try again.');
        setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Delete slide from API
  const deleteSlideFromAPI = async (slideId: number) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.delete(`${apiURL}/hero-slider/${slideId}`);
      // const result = response.data.success;
      // if (result) {
        setSaveMessage('Slide deleted successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      // }
    } catch (error) {
      if(isDevelopment){
        console.error('Error deleting slide:', error);
      }
      setSaveMessage('Error deleting slide. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSliderData();
  }, []);

  const handleSlideChange = (slideId: number, field: keyof SlideData, value: string | string[]) => {
    setSlides(prev =>
      prev.map(slide => (slide.id === slideId ? { ...slide, [field]: value } : slide))
    );
  };

  const handleBulletPointChange = (slideId: number, index: number, value: string) => {
    setSlides(prev =>
      prev.map(slide => {
        if (slide.id === slideId) {
          const newBulletPoints = [...slide.bulletPoints];
          newBulletPoints[index] = value;
          return { ...slide, bulletPoints: newBulletPoints };
        }
        return slide;
      })
    );
  };

  const addNewSlide = async () => {
    try {
      const addedSlide = await addSlideToAPI(newSlide);
      if(addedSlide){
        setSlides(prev => [...prev, addedSlide]);
      }
      setNewSlide({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        bulletPoints: ['', '', '', ''],
      });
      setShowAddModal(false);
      setSaveMessage('New slide added successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error adding new slide. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const confirmDelete = (slideId: number) => {
    setShowDeleteConfirm(slideId);
  };

  const deleteSlide = async (slideId: number) => {
    try {
      await deleteSlideFromAPI(slideId);
      setSlides(prev => prev.filter(slide => slide.id !== slideId));
      setShowDeleteConfirm(null);
    } catch (error) {
      // Error message is handled in deleteSlideFromAPI
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const updateSlide = async (slideId: number) => {
    try {
      const slideToUpdate = slides.find(slide => slide.id === slideId);
      if (slideToUpdate) {
        await updateSlideInAPI(slideId, slideToUpdate);
        setIsEditing(null);
      }
    } catch (error) {
      // Error message is handled in updateSlideInAPI
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Hero Slider Management
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Add New Slide
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {slides.map(slide => (
              <div
                key={slide.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Slide {slide.id}
                  </h3>
                  <div className="flex space-x-2">
                    {isEditing === slide.id ? (
                      <>
                        <button
                          onClick={() => updateSlide(slide.id)}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setIsEditing(null)}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(slide.id)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => confirmDelete(slide.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {isEditing === slide.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={e => handleSlideChange(slide.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={e => handleSlideChange(slide.id, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={slide.description}
                        onChange={e => handleSlideChange(slide.id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Image Upload
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = event => {
                              handleSlideChange(slide.id, 'image', event.target?.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                      />
                      {slide.image && (
                        <div className="mt-2">
                          <img
                            src={slide.image}
                            alt="Preview"
                            className="w-32 h-20 object-cover rounded-md"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Bullet Points
                      </label>
                      {slide.bulletPoints.map((point, index) => (
                        <input
                          key={index}
                          type="text"
                          value={point}
                          onChange={e => handleBulletPointChange(slide.id, index, e.target.value)}
                          placeholder={`Bullet point ${index + 1}`}
                          className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Title:</strong> {slide.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Subtitle:</strong> {slide.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Description:</strong> {slide.description}
                    </p>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Bullet Points:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1">
                        {slide.bulletPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {saveMessage && (
            <div
              className={`mt-4 p-4 rounded-md ${
                saveMessage.includes('Error')
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                  : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              }`}
            >
              {saveMessage}
            </div>
          )}
        </div>
      </div>

      {/* Add New Slide Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Add New Slide
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newSlide.title}
                  onChange={e => setNewSlide(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={newSlide.subtitle}
                  onChange={e => setNewSlide(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newSlide.description}
                  onChange={e => setNewSlide(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = event => {
                        setNewSlide(prev => ({ ...prev, image: event.target?.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                />
                {newSlide.image && (
                  <div className="mt-2">
                    <img
                      src={newSlide.image}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bullet Points
                </label>
                {newSlide.bulletPoints.map((point, index) => (
                  <input
                    key={index}
                    type="text"
                    value={point}
                    onChange={e => {
                      const newPoints = [...newSlide.bulletPoints];
                      newPoints[index] = e.target.value;
                      setNewSlide(prev => ({ ...prev, bulletPoints: newPoints }));
                    }}
                    placeholder={`Bullet point ${index + 1}`}
                    className="w-full px-3 py-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addNewSlide}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
              >
                Add Slide
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
              Are you sure you want to delete this slide? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteSlide(showDeleteConfirm)}
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

export default HeroSliderTab;
