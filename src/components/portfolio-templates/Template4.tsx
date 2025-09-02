import React from 'react';
import { TeamMemberDetail } from '../../pages/PortfolioDetail.page';

interface Template4Props {
  member: TeamMemberDetail;
  activeTab: 'projects' | 'about' | 'experience';
  setActiveTab: React.Dispatch<React.SetStateAction<'projects' | 'about' | 'experience'>>;
}

const Template4: React.FC<Template4Props> = ({ member, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Creative Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative">
              <div className="w-48 h-48 bg-white rounded-3xl p-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                ⭐ Pro
              </div>
            </div>
            <div className="text-center lg:text-left text-white">
              <h1 className="text-5xl font-bold mb-4">{member.name}</h1>
              <p className="text-2xl font-light mb-6 text-orange-100">{member.position}</p>
              <p className="text-lg leading-relaxed mb-8 max-w-2xl text-orange-50">{member.bio}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {member.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <span className="font-medium">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful Navigation */}
      <div className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex justify-center space-x-8">
            {['projects', 'about', 'experience'].map((tab, index) => {
              const activeColors = [
                'text-orange-600 border-orange-500',
                'text-red-600 border-red-500',
                'text-pink-600 border-pink-500',
              ];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-6 px-8 font-bold text-lg uppercase tracking-wide transition-all duration-300 border-b-4 ${
                    activeTab === tab
                      ? activeColors[index]
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {member.projects.map((project, index) => {
              const gradients = [
                'from-orange-400 to-red-500',
                'from-red-400 to-pink-500',
                'from-pink-400 to-purple-500',
                'from-purple-400 to-indigo-500',
                'from-indigo-400 to-blue-500',
                'from-blue-400 to-cyan-500',
              ];
              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${gradients[index % gradients.length]} relative`}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center bg-gradient-to-r ${gradients[index % gradients.length]} text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    >
                      View Project
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🚀</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Skills & Technologies</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {member.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-4 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                      <span className="text-gray-800 font-semibold">{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🏆</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Achievements</h2>
              </div>
              <div className="space-y-6">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">✨</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">💼</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Work Experience</h2>
              </div>
              <div className="space-y-8">
                {member.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{exp.position}</h3>
                        <p className="text-pink-600 font-semibold text-lg mb-2">{exp.company}</p>
                        <p className="text-gray-500 mb-4">{exp.duration}</p>
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">🎓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Education</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {member.education.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{edu.degree}</h3>
                    <p className="text-purple-600 font-semibold mb-2">{edu.institution}</p>
                    <p className="text-gray-500">{edu.year}</p>
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

export default Template4;
