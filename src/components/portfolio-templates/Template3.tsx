import React from 'react';
import { TeamMemberDetail } from '../../pages/PortfolioDetail.page';

interface Template3Props {
  member: TeamMemberDetail;
  activeTab: 'projects' | 'about' | 'experience';
  setActiveTab: React.Dispatch<React.SetStateAction<'projects' | 'about' | 'experience'>>;
}

const Template3: React.FC<Template3Props> = ({ member, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimalist Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center">
            <img
              src={member.avatar}
              alt={member.name}
              className="w-24 h-24 rounded-full mb-6 border border-gray-200 shadow-sm"
            />
            <h1 className="text-3xl font-light text-gray-900 mb-2">{member.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{member.position}</p>
            <p className="text-gray-500 max-w-2xl leading-relaxed mb-6">{member.bio}</p>
            <div className="flex gap-6">
              {member.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title={social.platform}
                >
                  <span className="text-2xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simple Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex justify-center space-x-12">
            {['projects', 'about', 'experience'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-medium uppercase tracking-wide transition-colors duration-200 ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Clean Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {activeTab === 'projects' && (
          <div className="space-y-12">
            {member.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-light text-gray-900">{project.name}</h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-8">Skills</h2>
              <div className="space-y-3">
                {member.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-8">Recognition</h2>
              <div className="space-y-4">
                {member.achievements.map((achievement, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <p className="text-gray-600 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-8">Experience</h2>
              <div className="space-y-8">
                {member.experience.map((exp, index) => (
                  <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-gray-500">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600 font-medium mb-3">{exp.company}</p>
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-8">Education</h2>
              <div className="space-y-6">
                {member.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.year}</span>
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

export default Template3;
