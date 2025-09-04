import React, { useState, useEffect } from 'react';
import { isDevelopment } from '../utilities/app.utilities';
// import { apiURL } from '../utilities/app.utilities';
// import axios from 'axios';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bulletPoints: string[];
}

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slides, setSlides] = useState<SlideData[]>([]);
  const [loading, setLoading] = useState(true);

  // Default slides data - can be replaced with API call
  const defaultSlides: SlideData[] = [
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
    {
      id: 3,
      title: 'Digital Transformation',
      subtitle: 'Future-Ready Technology',
      description:
        'Modernize your business processes with our comprehensive digital transformation services.',
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23F59E0B;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23D97706;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23grad3)'/%3E%3Cg fill='white' opacity='0.2'%3E%3Cpolygon points='200,100 300,150 250,250 150,200'/%3E%3Cpolygon points='500,180 600,220 570,320 470,280'/%3E%3Cpolygon points='800,120 920,160 890,280 770,240'/%3E%3Cpolygon points='1000,200 1100,240 1080,360 980,320'/%3E%3C/g%3E%3Ctext x='600' y='280' text-anchor='middle' fill='white' font-size='48' font-weight='bold'%3EDigital Future%3C/text%3E%3Ctext x='600' y='340' text-anchor='middle' fill='white' font-size='24' opacity='0.9'%3ETransformation Excellence%3C/text%3E%3C/svg%3E",
      bulletPoints: [
        'Process Automation',
        'Data Analytics & Insights',
        'Mobile-First Approach',
        'Agile Development',
      ],
    },
    {
      id: 4,
      title: 'Expert Consulting',
      subtitle: 'Strategic Technology Guidance',
      description:
        'Leverage our expertise to make informed technology decisions and accelerate your digital journey.',
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2310B981;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23059669;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23grad4)'/%3E%3Cg fill='white' opacity='0.15'%3E%3Cpath d='M200,200 L300,150 L400,200 L350,300 L250,300 Z'/%3E%3Cpath d='M500,180 L600,130 L700,180 L650,280 L550,280 Z'/%3E%3Cpath d='M800,220 L900,170 L1000,220 L950,320 L850,320 Z'/%3E%3C/g%3E%3Ctext x='600' y='280' text-anchor='middle' fill='white' font-size='48' font-weight='bold'%3EExpert Guidance%3C/text%3E%3Ctext x='600' y='340' text-anchor='middle' fill='white' font-size='24' opacity='0.9'%3EStrategic Technology Consulting%3C/text%3E%3C/svg%3E",
      bulletPoints: [
        'Technology Strategy',
        'Architecture Review',
        'Best Practices Implementation',
        'Team Training & Support',
      ],
    },
  ];

  // Fetch slides data - replace URL with your API endpoint
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual API endpoint
        // const response = await axios.get(`${apiURL}/hero-slider/`);
        // setSlides(response.data.data);

        // For now, using default slides
        setSlides(defaultSlides);
      } catch (error) {
        if(isDevelopment){
          console.error('Error fetching slides:', error);
        }
        // Fallback to default slides on error
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Show loading state while fetching slides
  if (loading) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render if no slides available
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">No slides available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900 dark:bg-gray-950">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-black dark:bg-opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="text-white dark:text-gray-100 space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-sm font-semibold text-blue-300 dark:text-blue-400 uppercase tracking-wide">
                        {slide.subtitle}
                      </h2>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-gray-200 dark:text-gray-300 max-w-2xl">
                        {slide.description}
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="space-y-3">
                      {slide.bulletPoints.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-200 dark:text-gray-300 font-medium">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                        Get Started
                      </button>
                      <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                        Learn More
                      </button>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-600/30 dark:to-purple-700/30 rounded-2xl backdrop-blur-sm border border-white/10 dark:border-white/20">
                        <div className="absolute inset-4 bg-white/5 dark:bg-white/10 rounded-xl flex items-center justify-center">
                          <div className="text-center text-white dark:text-gray-100">
                            <div className="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                            <p className="text-gray-300 dark:text-gray-400">
                              Enterprise-grade solutions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 dark:bg-white/20 dark:hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 dark:bg-white/20 dark:hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors duration-200"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Bullet Point Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white dark:bg-gray-200 scale-125'
                  : 'bg-white/50 hover:bg-white/75 dark:bg-white/60 dark:hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 dark:bg-white/30 z-20">
        <div
          className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 bg-black/30 dark:bg-black/50 text-white dark:text-gray-200 px-4 py-2 rounded-full backdrop-blur-sm">
        <span className="text-sm font-medium">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
};

export default HeroSlider;
