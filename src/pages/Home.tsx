import React from 'react';
import { Hero } from '../components/Home/Hero';
import { Stats } from '../components/Home/Stats';
import { CourseGrid } from '../components/Home/CourseGrid';
import { Testimonials } from '../components/Home/Testimonials';

export const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <CourseGrid />
      <Testimonials />
    </div>
  );
};