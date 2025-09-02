import React from 'react';
import { TeamMemberDetail } from '../../pages/PortfolioDetail.page';

interface Template2Props {
  member: TeamMemberDetail;
  activeTab: 'projects' | 'about' | 'experience';
  setActiveTab: React.Dispatch<React.SetStateAction<'projects' | 'about' | 'experience'>>;
}

const Template2: React.FC<Template2Props> = ({ member, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="relative inline-block mb-8">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-40 h-40 rounded-full border-4 border-purple-400 shadow-2xl mx-auto"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 opacity-20"></div>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {member.name}
            </h1>
            <p className="text-2xl text-purple-300 font-light mb-6">{member.position}</p>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
              {member.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {member.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="text-white font-medium">{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex justify-center space-x-12">
            {['projects', 'about', 'experience'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-6 px-4 font-semibold text-lg uppercase tracking-wider transition-all duration-300 ${
                  activeTab === tab
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {member.projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                <div className="h-56 bg-gradient-to-br from-purple-600 to-blue-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    Explore Project
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-8 text-purple-400">Technical Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {member.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-gray-200 text-lg font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-purple-400">Achievements</h2>
              <div className="space-y-6">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">🏆</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-purple-400">Professional Journey</h2>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-pink-400"></div>
                <div className="space-y-8">
                  {member.experience.map((exp, index) => (
                    <div key={index} className="relative flex items-start gap-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.position}</h3>
                        <p className="text-purple-300 font-semibold text-lg mb-1">{exp.company}</p>
                        <p className="text-gray-400 mb-4">{exp.duration}</p>
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-purple-400">Education</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {member.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-xl p-6 hover:bg-gray-600 transition-colors duration-300"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-purple-300 font-semibold mb-1">{edu.institution}</p>
                    <p className="text-gray-400">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template2;
