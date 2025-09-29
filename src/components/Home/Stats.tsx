import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../Shared/AnimatedCounter';

interface Stat {
  id: number;
  label: string;
  value: number;
  icon: string;
}

export const Stats: React.FC = () => {
  const stats: Stat[] = [
    {
      id: 1,
      label: 'Students Enrolled',
      value: 10000,
      icon: '👨‍🎓'
    },
    {
      id: 2,
      label: 'Success Rate',
      value: 95,
      icon: '📈'
    },
    {
      id: 3,
      label: 'Expert Instructors',
      value: 50,
      icon: '🏆'
    },
    {
      id: 4,
      label: 'Countries Reached',
      value: 30,
      icon: '🌎'
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-primary-900 to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers with EduLearn
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card p-8 text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-4xl mb-4 gradient-text"
              >
                {stat.icon}
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-3xl lg:text-4xl font-bold gradient-text mb-2"
              >
                <AnimatedCounter value={stat.value} />
                {stat.label.includes('%') && '%'}
              </motion.div>
              
              <div className="text-purple-200 font-medium text-lg">
                {stat.label}
              </div>
              
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '50%' }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="h-1 bg-gradient-to-r from-primary-400 to-purple-400 mx-auto mt-4 rounded-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};