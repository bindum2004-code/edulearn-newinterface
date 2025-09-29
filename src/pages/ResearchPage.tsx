import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApi } from '../hooks/useApi';
import { Research, ResearchCategory } from '../types';
import { apiService } from '../services/api';

export const ResearchPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: research, loading: researchLoading } = useApi(() => apiService.getResearch());

  // Use useMemo for fallbackCategories to make it stable
  const fallbackCategories = useMemo((): ResearchCategory[] => [
    { id: 1, name: 'All', description: 'All research projects', research_count: 6 },
    { id: 2, name: 'Artificial Intelligence', description: 'AI and machine learning applications in education', research_count: 1 },
    { id: 3, name: 'Blockchain & Security', description: 'Secure systems and credential verification', research_count: 1 },
    { id: 4, name: 'Immersive Learning', description: 'VR, AR and immersive technologies', research_count: 1 },
    { id: 5, name: 'Learning Psychology', description: 'Cognitive science and learning behaviors', research_count: 1 },
    { id: 6, name: 'Data Science', description: 'Analytics and data-driven insights', research_count: 1 },
    { id: 7, name: 'Accessibility', description: 'Inclusive and accessible education technology', research_count: 1 }
  ], []); // Empty dependency array means this only creates once

  // Use useMemo for fallbackResearch as well
  const fallbackResearch = useMemo((): Research[] => [
    {
      id: 1,
      title: "AI-Powered Personalized Learning Pathways",
      summary: "Developing adaptive learning algorithms that create personalized educational journeys for students.",
      description: "This research focuses on creating intelligent systems that can analyze student performance, learning styles, and goals to generate customized learning paths. Our approach combines machine learning with educational psychology to optimize knowledge retention and skill development.",
      lead_researcher: "Dr. Sarah Chen",
      research_team: ["Dr. Mike Zhang", "Prof. Emily Wong", "Dr. James Kumar"],
      duration: "24 months",
      status: "ongoing",
      category: "Artificial Intelligence",
      tags: ["Machine Learning", "Adaptive Learning", "Educational Technology"],
      publications: [
        "Chen, S. et al. (2024). Adaptive Learning Systems in Modern Education. Journal of Educational Technology.",
        "International Conference on AI in Education 2023"
      ],
      funding_source: "National Science Foundation",
      budget: 500000,
      start_date: "2024-01-15",
      end_date: "2025-12-15",
      image_url: "/images/research-ai.jpg",
      project_link: "/research/ai-learning-pathways",
      findings: "Preliminary results show 35% improvement in learning outcomes compared to traditional methods.",
      impact: "Potential to revolutionize how educational content is delivered and personalized globally.",
      created_at: "2024-01-10",
      updated_at: "2024-09-20"
    },
    {
      id: 2,
      title: "Blockchain for Academic Credential Verification",
      summary: "Creating a decentralized system for secure and transparent verification of academic credentials.",
      description: "This project explores the application of blockchain technology to create tamper-proof digital credentials. We're developing a system that allows instant verification of degrees, certificates, and learning achievements while maintaining student privacy and data security.",
      lead_researcher: "Prof. Marcus Rodriguez",
      research_team: ["Dr. Lisa Thompson", "Alex Johnson, PhD Candidate"],
      duration: "18 months",
      status: "completed",
      category: "Blockchain & Security",
      tags: ["Blockchain", "Digital Credentials", "Data Security"],
      publications: [
        "Rodriguez, M. (2024). Blockchain in Education: A Security Perspective. IEEE Security & Privacy.",
        "Blockchain Education Summit 2024 - Best Paper Award"
      ],
      funding_source: "Department of Education Innovation Grant",
      budget: 350000,
      start_date: "2023-06-01",
      end_date: "2024-11-30",
      image_url: "/images/research-blockchain.jpg",
      project_link: "/research/blockchain-credentials",
      findings: "Successfully implemented a prototype handling 10,000+ credentials with zero security breaches.",
      impact: "Could eliminate degree fraud and streamline hiring processes for employers worldwide.",
      created_at: "2023-05-20",
      updated_at: "2024-11-30"
    },
    // Add the rest of your research projects here...
  ], []); // Empty dependency array means this only creates once

  // Now useMemo has stable dependencies
  const categories = useMemo(() => {
    if (!research || research.length === 0) {
      return fallbackCategories;
    }
    
    const categoryCounts = research.reduce((acc: Record<string, number>, project: Research) => {
      acc[project.category] = (acc[project.category] || 0) + 1;
      return acc;
    }, {});

    const categoryList = Object.entries(categoryCounts).map(([name, count], index) => ({
      id: index + 2,
      name,
      description: `${name} research projects`,
      research_count: count
    }));

    return [
      { id: 1, name: 'All', description: 'All research projects', research_count: research.length },
      ...categoryList
    ];
  }, [research, fallbackCategories]); // Both dependencies are now stable

  const displayResearch = research && research.length > 0 ? research : fallbackResearch;

  // Filter research based on selections
  const filteredResearch = displayResearch.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-500/20 text-blue-300 border-blue-400';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-400';
      case 'upcoming': return 'bg-purple-500/20 text-purple-300 border-purple-400';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing': return '🔄';
      case 'completed': return '✅';
      case 'upcoming': return '📅';
      default: return '📊';
    }
  };

  if (researchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 pt-20 flex items-center justify-center">
        <div className="text-white text-2xl">Loading Research Projects...</div>
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Research & <span className="gradient-text">Innovation</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Exploring the future of education through cutting-edge research and technological innovation.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass p-6 rounded-2xl mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Search Research
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, summary, or tags..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                {categories.map((category: ResearchCategory) => (
                  <option key={category.id} value={category.name}>
                    {category.name} ({category.research_count})
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="All">All Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Research Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filteredResearch.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white flex-1 pr-4">
                    {project.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)} {project.status}
                  </span>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-white/60">Lead Researcher</span>
                    <p className="text-white font-medium">{project.lead_researcher}</p>
                  </div>
                  <div>
                    <span className="text-sm text-white/60">Duration</span>
                    <p className="text-white font-medium">{project.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-white/60">Category</span>
                    <p className="text-white font-medium">{project.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-white/60">Budget</span>
                    <p className="text-white font-medium">${project.budget.toLocaleString()}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-primary-500/20 text-primary-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Findings */}
                {project.findings && (
                  <div className="mb-4">
                    <span className="text-sm text-white/60 block mb-1">Key Findings</span>
                    <p className="text-white/80 text-sm">{project.findings}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                    View Details
                  </button>
                  {project.project_link && (
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20">
                      Learn More
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredResearch.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No research projects found</h3>
            <p className="text-white/80">Try adjusting your search criteria or filters.</p>
          </motion.div>
        )}

        {/* Research Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass p-8 rounded-2xl mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {displayResearch.length}
              </div>
              <div className="text-white/80">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {displayResearch.filter(p => p.status === 'ongoing').length}
              </div>
              <div className="text-white/80">Active Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                ${displayResearch.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
              </div>
              <div className="text-white/80">Total Funding</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {new Set(displayResearch.flatMap(p => p.research_team)).size}
              </div>
              <div className="text-white/80">Researchers</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};