import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// Types for client data
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

const Client: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [featuredTestimonials, setFeaturedTestimonials] = useState<ClientTestimonial[]>([]);
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);

  // Default client logos array for easy API integration
  const defaultClients: Client[] = [
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
    {
      id: 3,
      name: 'Amazon',
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23FF9900'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3EAmazon%3C/text%3E%3C/svg%3E",
      website: 'https://amazon.com',
      industry: 'E-commerce',
    },
    {
      id: 4,
      name: 'Apple',
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23000000'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='18' font-weight='bold' text-anchor='middle' fill='white'%3EApple%3C/text%3E%3C/svg%3E",
      website: 'https://apple.com',
      industry: 'Technology',
    },
    {
      id: 5,
      name: 'Netflix',
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23E50914'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3ENetflix%3C/text%3E%3C/svg%3E",
      website: 'https://netflix.com',
      industry: 'Entertainment',
    },
    {
      id: 6,
      name: 'Tesla',
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23CC0000'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='18' font-weight='bold' text-anchor='middle' fill='white'%3ETesla%3C/text%3E%3C/svg%3E",
      website: 'https://tesla.com',
      industry: 'Automotive',
    },
    {
      id: 7,
      name: 'Spotify',
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%231DB954'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3ESpotify%3C/text%3E%3C/svg%3E",
      website: 'https://spotify.com',
      industry: 'Music',
    },
    {
      id: 8,
      name: 'Airbnb',
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='80' viewBox='0 0 150 80'%3E%3Crect width='150' height='80' fill='%23FF5A5F'/%3E%3Ctext x='75' y='45' font-family='Arial, sans-serif' font-size='16' font-weight='bold' text-anchor='middle' fill='white'%3EAirbnb%3C/text%3E%3C/svg%3E",
      website: 'https://airbnb.com',
      industry: 'Travel',
    },
  ];

  // Default featured client testimonials for easy API integration
  const defaultFeaturedTestimonials: ClientTestimonial[] = [
    {
      id: 1,
      clientName: 'Sarah Johnson',
      clientLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%234285F4'/%3E%3Ctext x='30' y='38' font-family='Arial, sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='white'%3EG%3C/text%3E%3C/svg%3E",
      testimonial:
        'TechGiant delivered exceptional results for our cloud migration project. Their expertise and professionalism exceeded our expectations.',
      clientTitle: 'CTO',
      clientCompany: 'Google',
      rating: 5,
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      clientLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%230078D4'/%3E%3Ctext x='30' y='38' font-family='Arial, sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='white'%3EM%3C/text%3E%3C/svg%3E",
      testimonial:
        'The AI solution developed by TechGiant transformed our business operations and increased efficiency by 40%.',
      clientTitle: 'VP of Engineering',
      clientCompany: 'Microsoft',
      rating: 5,
    },
    {
      id: 3,
      clientName: 'Emily Rodriguez',
      clientLogo:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='30' fill='%23FF9900'/%3E%3Ctext x='30' y='38' font-family='Arial, sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='white'%3EA%3C/text%3E%3C/svg%3E",
      testimonial:
        'Outstanding mobile app development. The teams attention to detail and user experience design was remarkable.',
      clientTitle: 'Product Manager',
      clientCompany: 'Amazon',
      rating: 5,
    },
  ];

  // Default statistics data for easy API integration
  const defaultStatistics: Statistic[] = [
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
    {
      id: 3,
      value: 10,
      label: 'Years Experience',
      icon: '🏆',
      suffix: '+',
    },
    {
      id: 4,
      value: 24,
      label: 'Support Available',
      icon: '🛠️',
      suffix: '/7',
    },
  ];

  // Fetch clients and testimonials data - replace URLs with your API endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace these URLs with your actual API endpoints
        // const clientsResponse = await axios.get('/api/clients');
        // const testimonialsResponse = await axios.get('/api/testimonials');
        // const statisticsResponse = await axios.get('/api/statistics');
        // setClients(clientsResponse.data);
        // setFeaturedTestimonials(testimonialsResponse.data);
        // setStatistics(statisticsResponse.data);

        // For now, using default data
        setClients(defaultClients);
        setFeaturedTestimonials(defaultFeaturedTestimonials);
        setStatistics(defaultStatistics);
      } catch (error) {
        console.error('Error fetching client data:', error);
        // Fallback to default data on error
        setClients(defaultClients);
        setFeaturedTestimonials(defaultFeaturedTestimonials);
        setStatistics(defaultStatistics);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render star rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400 text-xl">Loading...</div>
      </section>
    );
  }

  // Don't render if no data available
  if (clients.length === 0 && featuredTestimonials.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400 text-xl">No client data available</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're proud to partner with innovative companies across various industries, delivering
            cutting-edge solutions that drive growth and success.
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center">
            {clients.map(client => (
              <div
                key={client.id}
                className="group flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-12 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {statistics.map(stat => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTestimonials.map(testimonial => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* Rating */}
                <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.clientLogo}
                    alt={`${testimonial.clientCompany} logo`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.clientName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.clientTitle}, {testimonial.clientCompany}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-lg mb-6 opacity-90">
              Let's discuss how we can help transform your business with innovative technology
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Client;
