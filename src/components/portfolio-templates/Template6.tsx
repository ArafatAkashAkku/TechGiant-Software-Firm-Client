import React from 'react';
import { TeamMemberDetail } from '../../pages/PortfolioDetail.page';

interface Template6Props {
  member: TeamMemberDetail;
  activeTab: 'projects' | 'about' | 'experience';
  setActiveTab: React.Dispatch<React.SetStateAction<'projects' | 'about' | 'experience'>>;
}

const Template6: React.FC<Template6Props> = ({ member, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Magazine-style Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 border border-white transform rotate-45"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 border border-white transform -rotate-12"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white transform rotate-12"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <div className="mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                  Portfolio
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-none">
                <span className="block">{member.name.split(' ')[0]}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {member.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <p className="text-2xl font-light text-gray-300 mb-8 max-w-2xl">{member.position}</p>
              <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-3xl">{member.bio}</p>
              <div className="flex flex-wrap gap-6">
                {member.socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105 border border-white border-opacity-20"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="font-semibold">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-3xl blur opacity-30"></div>
                <div className="relative bg-black rounded-3xl p-2">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-6 py-3 rounded-2xl font-bold text-lg shadow-2xl">
                  Creative Professional
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Navigation */}
      <div className="bg-black bg-opacity-50 backdrop-blur-lg border-t border-white border-opacity-10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex justify-center">
            {['projects', 'about', 'experience'].map((tab, index) => {
              const gradients = [
                'from-cyan-400 to-blue-400',
                'from-purple-400 to-pink-400',
                'from-green-400 to-teal-400',
              ];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative py-6 px-8 font-bold text-lg uppercase tracking-wider transition-all duration-300 ${
                    activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeTab === tab && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${gradients[index]} opacity-20 rounded-lg`}
                    ></div>
                  )}
                  <span className="relative z-10">{tab}</span>
                  {activeTab === tab && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r ${gradients[index]} rounded-full`}
                    ></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {activeTab === 'projects' && (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6">
                Featured{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Projects
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Innovative solutions and creative implementations
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {member.projects.map((project, index) => {
                const gradients = [
                  'from-cyan-500 to-blue-500',
                  'from-purple-500 to-pink-500',
                  'from-green-500 to-teal-500',
                  'from-orange-500 to-red-500',
                  'from-indigo-500 to-purple-500',
                  'from-pink-500 to-rose-500',
                ];
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[index % gradients.length]} p-1 hover:scale-105 transition-all duration-500`}
                  >
                    <div className="bg-black rounded-3xl p-8 h-full">
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl flex items-center justify-center`}
                        >
                          <span className="text-2xl font-bold text-black">{index + 1}</span>
                        </div>
                        <div className="text-right">
                          <div
                            className={`w-3 h-3 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-full mb-2`}
                          ></div>
                          <div className="w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-white bg-opacity-10 text-white px-3 py-1 rounded-full text-sm font-medium border border-white border-opacity-20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center bg-gradient-to-r ${gradients[index % gradients.length]} text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105`}
                      >
                        Explore Project
                        <svg
                          className="w-5 h-5 ml-3"
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
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Me
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Skills, expertise, and achievements that define my professional journey
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 border border-purple-500 border-opacity-30">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold">Technical Arsenal</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {member.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-black bg-opacity-50 rounded-2xl p-4 border border-purple-400 border-opacity-20 hover:border-opacity-50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                          <span className="text-white font-semibold">{skill}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-green-900 to-teal-900 rounded-3xl p-8 border border-green-500 border-opacity-30">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold">Achievements</h3>
                  </div>
                  <div className="space-y-6">
                    {member.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-sm">✓</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6">
                Professional{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  Journey
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Career milestones and educational foundation
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                      />
                    </svg>
                  </div>
                  Work Experience
                </h3>
                <div className="space-y-8">
                  {member.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                      <div className="ml-8 bg-gradient-to-br from-blue-900 to-cyan-900 rounded-2xl p-6 border border-blue-400 border-opacity-30">
                        <div className="absolute -left-2 top-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-4 border-black"></div>
                        <h4 className="text-2xl font-bold mb-2">{exp.position}</h4>
                        <p className="text-blue-300 font-semibold text-lg mb-2">{exp.company}</p>
                        <p className="text-gray-400 text-sm mb-4">{exp.duration}</p>
                        <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  Education
                </h3>
                <div className="space-y-8">
                  {member.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-green-900 to-teal-900 rounded-2xl p-6 border border-green-400 border-opacity-30 hover:border-opacity-50 transition-all duration-300"
                    >
                      <h4 className="text-2xl font-bold mb-2">{edu.degree}</h4>
                      <p className="text-green-300 font-semibold text-lg mb-2">{edu.institution}</p>
                      <p className="text-gray-400">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template6;
