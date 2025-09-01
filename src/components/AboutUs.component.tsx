import React, { useState, useEffect, useRef } from 'react';

interface Statistic {
  id: number;
  value: number;
  label: string;
  icon: string;
  suffix?: string;
}

const AboutUs: React.FC = () => {
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const animateCounter = (targetValue: number, index: number) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, targetValue);
      
      setCounters(prev => {
        const newCounters = [...prev];
        newCounters[index] = Math.floor(current);
        return newCounters;
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Start animations for each counter
          animateCounter(500, 0);
          animateCounter(50, 1);
          animateCounter(10, 2);
          animateCounter(24, 3); // For 24/7
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);
  const statistics: Statistic[] = [
    {
      id: 1,
      value: 500,
      label: "Projects Completed",
      icon: "📊",
      suffix: "+"
    },
    {
      id: 2,
      value: 50,
      label: "Happy Clients",
      icon: "😊",
      suffix: "+"
    },
    {
      id: 3,
      value: 10,
      label: "Years Experience",
      icon: "🏆",
      suffix: "+"
    },
    {
      id: 4,
      value: 24,
      label: "Support Available",
      icon: "🛠️",
      suffix: "/7"
    }
  ];



  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-blue-600 dark:text-blue-400">TechGiant</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We are a forward-thinking software development company dedicated to transforming 
              businesses through innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Our Services
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-900 dark:bg-gray-950" ref={statsRef}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={stat.id} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-2">
                  {counters[index]}{stat.suffix}
                </div>
                <div className="text-gray-300 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2014, TechGiant began as a small team of passionate developers 
                  with a vision to bridge the gap between complex technology and business needs. 
                  What started as a startup has grown into a trusted partner for companies 
                  worldwide.
                </p>
                <p>
                  Over the years, we've evolved from a local development shop to a full-service 
                  technology consultancy, helping businesses of all sizes navigate their digital 
                  transformation journey with confidence and success.
                </p>
                <p>
                  Today, we continue to push boundaries, embrace emerging technologies, and 
                  deliver solutions that not only meet current needs but anticipate future 
                  challenges.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-2xl p-8 text-white dark:text-gray-100">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed mb-6">
                  To empower businesses with innovative software solutions that drive growth, 
                  efficiency, and competitive advantage in the digital age.
                </p>
                <div className="bg-white/10 dark:bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                  <h4 className="font-semibold mb-2">Our Vision</h4>
                  <p className="text-sm opacity-90">
                    To be the leading technology partner that transforms ideas into 
                    reality and helps businesses thrive in tomorrow's digital landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default AboutUs;