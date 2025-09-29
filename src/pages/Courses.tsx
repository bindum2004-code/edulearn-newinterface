import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: number;
  category: string;
  image_url: string;
  features: string[];
}

export const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const courses: Course[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Learn modern web development with React, Node.js, and PostgreSQL. Build real-world applications and master the latest technologies.",
      duration: "12 weeks",
      level: "Beginner",
      price: 299.99,
      category: "Development",
      image_url: "/images/course-webdev.jpg",
      features: ["Hands-on Projects", "Mentor Support", "Career Guidance", "Certificate"]
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      description: "Dive into artificial intelligence and machine learning. Create intelligent applications with Python and TensorFlow.",
      duration: "16 weeks",
      level: "Advanced",
      price: 499.99,
      category: "AI",
      image_url: "/images/course-ai.jpg",
      features: ["Real-world Projects", "Industry Experts", "Certification", "Portfolio"]
    },
    {
      id: 3,
      title: "DevOps Engineering",
      description: "Learn CI/CD, containerization, and cloud deployment. Master Docker, Kubernetes, and cloud platforms.",
      duration: "10 weeks",
      level: "Intermediate",
      price: 399.99,
      category: "DevOps",
      image_url: "/images/course-devops.jpg",
      features: ["AWS/Azure Labs", "Docker & Kubernetes", "Monitoring Tools", "CI/CD Pipelines"]
    },
    {
      id: 4,
      title: "Cybersecurity Fundamentals",
      description: "Protect systems and networks from digital attacks. Learn ethical hacking and security best practices.",
      duration: "14 weeks",
      level: "Intermediate",
      price: 449.99,
      category: "Security",
      image_url: "/images/course-security.jpg",
      features: ["Ethical Hacking", "Network Security", "Incident Response", "Certification"]
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications with React Native. Launch your apps on iOS and Android.",
      duration: "11 weeks",
      level: "Intermediate",
      price: 379.99,
      category: "Mobile",
      image_url: "/images/course-mobile.jpg",
      features: ["React Native", "App Store Deployment", "UI/UX Design", "Real Projects"]
    },
    {
      id: 6,
      title: "Data Science & Analytics",
      description: "Master data analysis, visualization, and machine learning. Work with real datasets and build insights.",
      duration: "15 weeks",
      level: "Advanced",
      price: 529.99,
      category: "Data Science",
      image_url: "/images/course-data.jpg",
      features: ["Python & R", "Data Visualization", "ML Algorithms", "Portfolio Projects"]
    }
  ];

  // Fix: Get unique categories without Set iteration
  const categories = ['All'];
  const uniqueCategories = new Set(courses.map(course => course.category));
  uniqueCategories.forEach(category => categories.push(category));

  // Alternative method: Use Array.from (also works)
  // const categories = ['All', ...Array.from(new Set(courses.map(course => course.category)))];

  // Filter courses
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-primary-900 to-indigo-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-purple-200">Courses</span>
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Explore our comprehensive curriculum designed to equip you with in-demand skills for the modern workforce.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all duration-300"
            >
              {/* Course Image */}
              <div className="h-48 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <div className="text-6xl text-white">
                  {course.category === 'Development' && '💻'}
                  {course.category === 'AI' && '🤖'}
                  {course.category === 'DevOps' && '⚙️'}
                  {course.category === 'Security' && '🔒'}
                  {course.category === 'Mobile' && '📱'}
                  {course.category === 'Data Science' && '📊'}
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white flex-1 pr-2">
                    {course.title}
                  </h3>
                  <span className="text-sm font-medium bg-primary-500/20 text-primary-200 px-3 py-1 rounded-full whitespace-nowrap">
                    {course.category}
                  </span>
                </div>
                
                <p className="text-purple-200 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                {/* Course Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Duration</span>
                    <span className="text-primary-200 font-semibold">{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Level</span>
                    <span className="text-primary-200 font-semibold">{course.level}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-300">Features</span>
                    <span className="text-primary-200 font-semibold">{course.features.length} modules</span>
                  </div>
                </div>
                
                {/* Price and Enroll Button */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-200 to-purple-200">
                    ${course.price}
                  </div>
                  <button className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-purple-200">Try selecting a different category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};