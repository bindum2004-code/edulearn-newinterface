import React from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { AboutContent, TeamMember } from '../types';
import { apiService } from '../services/api';

export const About: React.FC = () => {
  const { data: aboutContent, loading: aboutLoading } = useApi(() => apiService.getAboutContent());
  const { data: teamMembers, loading: teamLoading } = useApi(() => apiService.getTeam());

  // Fallback data
  const fallbackAboutContent: AboutContent[] = [
    {
      id: 1,
      section: 'mission',
      title: 'Our Mission',
      content: 'To democratize education through innovative technology and personalized learning experiences that empower individuals to achieve their full potential.',
      image_url: '/images/mission.jpg',
      order: 1
    },
    {
      id: 2,
      section: 'vision',
      title: 'Our Vision',
      content: 'A world where anyone, anywhere can transform their life through accessible, high-quality education tailored to their unique needs and aspirations.',
      image_url: '/images/vision.jpg',
      order: 2
    },
    {
      id: 3,
      section: 'values',
      title: 'Our Values',
      content: 'Innovation, Excellence, Accessibility, Community, and Lifelong Learning guide everything we do at EduLearn.',
      image_url: '/images/values.jpg',
      order: 3
    }
  ];

  const fallbackTeam: TeamMember[] = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      role: 'Chief Learning Officer',
      bio: 'Former Stanford professor with 15+ years in educational technology and curriculum design.',
      photo_url: '/images/team1.jpg',
      social_links: { twitter: '#', linkedin: '#' }
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Head of Technology',
      bio: 'Tech industry veteran passionate about building scalable learning platforms that make education accessible.',
      photo_url: '/images/team2.jpg',
      social_links: { twitter: '#', linkedin: '#' }
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      role: 'Research Director',
      bio: 'Cognitive scientist specializing in learning methodologies and educational psychology.',
      photo_url: '/images/team3.jpg',
      social_links: { twitter: '#', linkedin: '#' }
    }
  ];

  const displayAboutContent = aboutContent && aboutContent.length > 0 ? aboutContent : fallbackAboutContent;
  const displayTeam = teamMembers && teamMembers.length > 0 ? teamMembers : fallbackTeam;

  if (aboutLoading || teamLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 pt-20 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="gradient-text">EduLearn</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Transforming education through innovation, technology, and a passion for lifelong learning.
          </p>
        </motion.div>

        {/* About Content Sections */}
        <div className="space-y-16 mb-20">
          {displayAboutContent.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass p-8 rounded-2xl"
            >
              <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8`}>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">{section.title}</h2>
                  <p className="text-lg text-white/80 leading-relaxed">{section.content}</p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl text-white">
                      {section.section === 'mission' && '🎯'}
                      {section.section === 'vision' && '🔭'}
                      {section.section === 'values' && '💎'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Passionate educators, innovators, and technologists dedicated to your learning journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTeam.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-6 rounded-2xl text-center hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-secondary-200 font-semibold mb-3">{member.role}</p>
              <p className="text-white/70 text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};