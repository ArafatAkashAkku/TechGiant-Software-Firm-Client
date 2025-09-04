import React, { useState, useEffect } from 'react';
import { isDevelopment } from '../../utilities/app.utilities';
// import axios from 'axios';

interface Statistic {
  id: number;
  value: number;
  label: string;
  icon: string;
  suffix?: string;
}

interface Client {
  id: number;
  name: string;
  logo: string;
  website: string;
  industry: string;
}

interface ClientTestimonial {
  id: number;
  clientName: string;
  clientLogo: string;
  testimonial: string;
  clientTitle: string;
  clientCompany: string;
  rating: number;
}

interface ClientData {
  clients: Client[];
  statistics: Statistic[];
  featuredTestimonials: ClientTestimonial[];
}

const ClientTab: React.FC = () => {
  const [clientData, setClientData] = useState<ClientData>({
    clients: [],
    statistics: [],
    featuredTestimonials: [],
  });
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'clients' | 'statistics' | 'testimonials'>(
    'clients'
  );
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [editingStatistic, setEditingStatistic] = useState<Statistic | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<ClientTestimonial | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    name: '',
    logo: '',
    website: '',
    industry: '',
  });
  const [newStatistic, setNewStatistic] = useState<Omit<Statistic, 'id'>>({
    value: 0,
    label: '',
    icon: '',
    suffix: '',
  });
  const [newTestimonial, setNewTestimonial] = useState<Omit<ClientTestimonial, 'id'>>({
    clientName: '',
    clientLogo: '',
    testimonial: '',
    clientTitle: '',
    clientCompany: '',
    rating: 5,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    type: 'client' | 'statistic' | 'testimonial';
    id: number;
  } | null>(null);

  // Mock data for initial display
  const mockClientData: ClientData = {
    clients: [
      {
        id: 1,
        name: 'Microsoft',
        logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%230078D4'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='14' font-weight='bold' text-anchor='middle' fill='white'%3EMicrosoft%3C/text%3E%3C/svg%3E",
        website: 'https://microsoft.com',
        industry: 'Technology',
      },
      {
        id: 2,
        name: 'Google',
        logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%234285F4'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3EGoogle%3C/text%3E%3C/svg%3E",
        website: 'https://google.com',
        industry: 'Technology',
      },
    ],
    statistics: [
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
    ],
    featuredTestimonials: [
      {
        id: 1,
        clientName: 'Sarah Johnson',
        clientLogo:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%234285F4'/%3E%3Ctext x='30' y='38' font-family='Arial, sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='white'%3EG%3C/text%3E%3C/svg%3E",
        testimonial: 'TechGiant delivered exceptional results for our cloud migration project.',
        clientTitle: 'CTO',
        clientCompany: 'Google',
        rating: 5,
      },
    ],
  };

  // Fetch client data
  const fetchClientData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await axios.get(`${apiURL}/clients/clients`);
      // setClientData(response.data.data);

      // For now, using mock data
      setClientData(mockClientData);
    } catch (error) {
      if(isDevelopment){
      console.error('Error fetching client data:', error);
      }
      setClientData(mockClientData);
    } finally {
      setLoading(false);
    }
  };

  // Save client data
  const saveClientData = async (updatedData: ClientData) => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // await axios.put(`${apiURL}/clients/clients`, updatedData);

      console.log('Client data saved:', updatedData);
      setClientData(updatedData);
    } catch (error) {
      console.error('Error saving client data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  // Client management functions
  const handleEditClient = (client: Client) => {
    setEditingClient({ ...client });
  };

  const handleSaveClient = async () => {
    if (editingClient) {
      const updatedClients = clientData.clients.map(c =>
        c.id === editingClient.id ? editingClient : c
      );
      await saveClientData({ ...clientData, clients: updatedClients });
      setEditingClient(null);
    }
  };

  const confirmDeleteClient = (id: number) => {
    setShowDeleteConfirm({ type: 'client', id });
  };
  const handleDeleteClient = async (id: number) => {
    const updatedClients = clientData.clients.filter(c => c.id !== id);
    await saveClientData({ ...clientData, clients: updatedClients });
    setShowDeleteConfirm(null);
  };

  const handleAddClient = async () => {
    const newId = Math.max(...clientData.clients.map(c => c.id), 0) + 1;
    const clientToAdd: Client = { ...newClient, id: newId };
    const updatedClients = [...clientData.clients, clientToAdd];
    await saveClientData({ ...clientData, clients: updatedClients });
    setNewClient({ name: '', logo: '', website: '', industry: '' });
    setShowAddModal(false);
  };

  // Statistics management functions
  const handleEditStatistic = (statistic: Statistic) => {
    setEditingStatistic({ ...statistic });
  };

  const handleSaveStatistic = async () => {
    if (editingStatistic) {
      const updatedStatistics = clientData.statistics.map(s =>
        s.id === editingStatistic.id ? editingStatistic : s
      );
      await saveClientData({ ...clientData, statistics: updatedStatistics });
      setEditingStatistic(null);
    }
  };

  const confirmDeleteStatistic = (id: number) => {
    setShowDeleteConfirm({ type: 'statistic', id });
  };
  const handleDeleteStatistic = async (id: number) => {
    const updatedStatistics = clientData.statistics.filter(s => s.id !== id);
    await saveClientData({ ...clientData, statistics: updatedStatistics });
    setShowDeleteConfirm(null);
  };

  const handleAddStatistic = async () => {
    const newId = Math.max(...clientData.statistics.map(s => s.id), 0) + 1;
    const statisticToAdd: Statistic = { ...newStatistic, id: newId };
    const updatedStatistics = [...clientData.statistics, statisticToAdd];
    await saveClientData({ ...clientData, statistics: updatedStatistics });
    setNewStatistic({ value: 0, label: '', icon: '', suffix: '' });
    setShowAddModal(false);
  };

  // Testimonial management functions
  const handleEditTestimonial = (testimonial: ClientTestimonial) => {
    setEditingTestimonial({ ...testimonial });
  };

  const handleSaveTestimonial = async () => {
    if (editingTestimonial) {
      const updatedTestimonials = clientData.featuredTestimonials.map(t =>
        t.id === editingTestimonial.id ? editingTestimonial : t
      );
      await saveClientData({ ...clientData, featuredTestimonials: updatedTestimonials });
      setEditingTestimonial(null);
    }
  };

  const confirmDeleteTestimonial = (id: number) => {
    setShowDeleteConfirm({ type: 'testimonial', id });
  };
  const handleDeleteTestimonial = async (id: number) => {
    const updatedTestimonials = clientData.featuredTestimonials.filter(t => t.id !== id);
    await saveClientData({ ...clientData, featuredTestimonials: updatedTestimonials });
    setShowDeleteConfirm(null);
  };
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  const handleAddTestimonial = async () => {
    const newId = Math.max(...clientData.featuredTestimonials.map(t => t.id), 0) + 1;
    const testimonialToAdd: ClientTestimonial = { ...newTestimonial, id: newId };
    const updatedTestimonials = [...clientData.featuredTestimonials, testimonialToAdd];
    await saveClientData({ ...clientData, featuredTestimonials: updatedTestimonials });
    setNewTestimonial({
      clientName: '',
      clientLogo: '',
      testimonial: '',
      clientTitle: '',
      clientCompany: '',
      rating: 5,
    });
    setShowAddModal(false);
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

  const renderClientsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Client Logos</h3>
        <button
          onClick={() => {
            setActiveSection('clients');
            setShowAddModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add Client
        </button>
      </div>

      <div className="grid gap-4">
        {clientData.clients.map(client => (
          <div key={client.id} className="border dark:border-gray-700 rounded-lg p-4">
            {editingClient && editingClient.id === client.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editingClient.name}
                      onChange={e => setEditingClient({ ...editingClient, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={editingClient.industry}
                      onChange={e =>
                        setEditingClient({ ...editingClient, industry: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={editingClient.website}
                    onChange={e => setEditingClient({ ...editingClient, website: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Logo (SVG Data URL)
                  </label>
                  <textarea
                    value={editingClient.logo}
                    onChange={e => setEditingClient({ ...editingClient, logo: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveClient}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingClient(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-16 h-10 object-contain"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {client.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {client.industry} • {client.website}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClient(client)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteClient(client.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatisticsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Statistics</h3>
        <button
          onClick={() => {
            setActiveSection('statistics');
            setShowAddModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add Statistic
        </button>
      </div>

      <div className="grid gap-4">
        {clientData.statistics.map(statistic => (
          <div key={statistic.id} className="border dark:border-gray-700 rounded-lg p-4">
            {editingStatistic && editingStatistic.id === statistic.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Value
                    </label>
                    <input
                      type="number"
                      value={editingStatistic.value}
                      onChange={e =>
                        setEditingStatistic({
                          ...editingStatistic,
                          value: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={editingStatistic.label}
                      onChange={e =>
                        setEditingStatistic({ ...editingStatistic, label: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={editingStatistic.icon}
                      onChange={e =>
                        setEditingStatistic({ ...editingStatistic, icon: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="📊"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Suffix (optional)
                  </label>
                  <input
                    type="text"
                    value={editingStatistic.suffix || ''}
                    onChange={e =>
                      setEditingStatistic({ ...editingStatistic, suffix: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="+ or /7"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveStatistic}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingStatistic(null)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{statistic.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {statistic.value}
                      {statistic.suffix}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">{statistic.label}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditStatistic(statistic)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDeleteStatistic(statistic.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Featured Testimonials
        </h3>
        <button
          onClick={() => {
            setActiveSection('testimonials');
            setShowAddModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add Testimonial
        </button>
      </div>

      <div className="grid gap-4">
        {clientData.featuredTestimonials.map(testimonial => (
          <div key={testimonial.id} className="border dark:border-gray-700 rounded-lg p-4">
            {editingTestimonial && editingTestimonial.id === testimonial.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.clientName}
                      onChange={e =>
                        setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial.clientTitle}
                      onChange={e =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          clientTitle: e.target.value,
                        })
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
                      value={editingTestimonial.clientCompany}
                      onChange={e =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          clientCompany: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client Logo (SVG Data URL)
                  </label>
                  <textarea
                    value={editingTestimonial.clientLogo}
                    onChange={e =>
                      setEditingTestimonial({ ...editingTestimonial, clientLogo: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Testimonial
                  </label>
                  <textarea
                    value={editingTestimonial.testimonial}
                    onChange={e =>
                      setEditingTestimonial({ ...editingTestimonial, testimonial: e.target.value })
                    }
                    rows={3}
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
                    onClick={handleSaveTestimonial}
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
                    <img
                      src={testimonial.clientLogo}
                      alt={`${testimonial.clientCompany} logo`}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.clientName}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonial.clientTitle} at {testimonial.clientCompany}
                      </p>
                      <div className="flex items-center mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDeleteTestimonial(testimonial.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.testimonial}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Client Section Management
        </h2>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'clients', name: 'Client Logos', icon: '🏢' },
          { id: 'statistics', name: 'Statistics', icon: '📊' },
          { id: 'testimonials', name: 'Testimonials', icon: '💬' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              activeSection === tab.id
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Section Content */}
      {activeSection === 'clients' && renderClientsSection()}
      {activeSection === 'statistics' && renderStatisticsSection()}
      {activeSection === 'testimonials' && renderTestimonialsSection()}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Add New{' '}
              {activeSection === 'clients'
                ? 'Client'
                : activeSection === 'statistics'
                  ? 'Statistic'
                  : 'Testimonial'}
            </h3>

            {activeSection === 'clients' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={newClient.industry}
                      onChange={e => setNewClient({ ...newClient, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    value={newClient.website}
                    onChange={e => setNewClient({ ...newClient, website: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Logo (SVG Data URL)
                  </label>
                  <textarea
                    value={newClient.logo}
                    onChange={e => setNewClient({ ...newClient, logo: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {activeSection === 'statistics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Value
                    </label>
                    <input
                      type="number"
                      value={newStatistic.value}
                      onChange={e =>
                        setNewStatistic({ ...newStatistic, value: parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={newStatistic.label}
                      onChange={e => setNewStatistic({ ...newStatistic, label: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={newStatistic.icon}
                      onChange={e => setNewStatistic({ ...newStatistic, icon: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="📊"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Suffix (optional)
                  </label>
                  <input
                    type="text"
                    value={newStatistic.suffix || ''}
                    onChange={e => setNewStatistic({ ...newStatistic, suffix: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="+ or /7"
                  />
                </div>
              </div>
            )}

            {activeSection === 'testimonials' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={newTestimonial.clientName}
                      onChange={e =>
                        setNewTestimonial({ ...newTestimonial, clientName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newTestimonial.clientTitle}
                      onChange={e =>
                        setNewTestimonial({ ...newTestimonial, clientTitle: e.target.value })
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
                      value={newTestimonial.clientCompany}
                      onChange={e =>
                        setNewTestimonial({ ...newTestimonial, clientCompany: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Client Logo (SVG Data URL)
                  </label>
                  <textarea
                    value={newTestimonial.clientLogo}
                    onChange={e =>
                      setNewTestimonial({ ...newTestimonial, clientLogo: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Testimonial
                  </label>
                  <textarea
                    value={newTestimonial.testimonial}
                    onChange={e =>
                      setNewTestimonial({ ...newTestimonial, testimonial: e.target.value })
                    }
                    rows={3}
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
            )}

            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (activeSection === 'clients') handleAddClient();
                  else if (activeSection === 'statistics') handleAddStatistic();
                  else if (activeSection === 'testimonials') handleAddTestimonial();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                Add{' '}
                {activeSection === 'clients'
                  ? 'Client'
                  : activeSection === 'statistics'
                    ? 'Statistic'
                    : 'Testimonial'}
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
              Are you sure you want to delete this {showDeleteConfirm.type}? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showDeleteConfirm.type === 'client') {
                    handleDeleteClient(showDeleteConfirm.id);
                  } else if (showDeleteConfirm.type === 'statistic') {
                    handleDeleteStatistic(showDeleteConfirm.id);
                  } else if (showDeleteConfirm.type === 'testimonial') {
                    handleDeleteTestimonial(showDeleteConfirm.id);
                  }
                }}
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

export default ClientTab;
