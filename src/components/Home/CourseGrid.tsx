import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

export const CourseGrid: React.FC = () => {
  const courses: Course[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and PostgreSQL. Build real-world applications and launch your career.",
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
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-primary-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="text-4xl">🚀</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Discover our most popular courses designed to catapult your career to new heights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="card p-6 group cursor-pointer"
            >
              {/* Course Image/Icon */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-full h-48 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden"
              >
                <div className="text-6xl text-white">📚</div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
              </motion.div>
              
              {/* Course Content */}
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                    {course.title}
                  </h3>
                  <span className="text-sm font-medium bg-primary-500/20 text-primary-200 px-2 py-1 rounded-full">
                    {course.category}
                  </span>
                </div>
                
                <p className="text-purple-200 mb-4 line-clamp-3 group-hover:text-purple-100 transition-colors duration-300">
                  {course.description}
                </p>
                
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
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold gradient-text">${course.price}</span>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:shadow-2xl">
                      Enroll Now
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link to="/courses">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-12 py-4"
            >
              <span className="flex items-center gap-3">
                View All Courses 
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};