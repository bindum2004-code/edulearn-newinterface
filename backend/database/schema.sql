-- Create database (run this first in psql)
CREATE DATABASE edulearn;

-- Connect to edulearn database then run:

-- Users table (for admin)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  level VARCHAR(50),
  price DECIMAL(10,2),
  category VARCHAR(100),
  image_url VARCHAR(500),
  features TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team table
CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  bio TEXT,
  photo_url VARCHAR(500),
  social_links JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research table
-- Research table
CREATE TABLE research (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  lead_researcher VARCHAR(200) NOT NULL,
  research_team TEXT[],
  duration VARCHAR(100),
  status VARCHAR(50) DEFAULT 'ongoing',
  category VARCHAR(200),
  tags TEXT[],
  publications TEXT[],
  funding_source VARCHAR(300),
  budget DECIMAL(15,2),
  start_date DATE,
  end_date DATE,
  image_url VARCHAR(500),
  project_link VARCHAR(500),
  findings TEXT,
  impact TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample research data (use the data from fallbackResearch above)

-- Contact messages table
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stats table
CREATE TABLE stats (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  value INTEGER NOT NULL,
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Research Categories table (optional)
CREATE TABLE research_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  research_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert research categories
INSERT INTO research_categories (name, description, research_count) VALUES
('All', 'All research projects', 6),
('Artificial Intelligence', 'AI and machine learning applications in education', 1),
('Blockchain & Security', 'Secure systems and credential verification', 1),
('Immersive Learning', 'VR, AR and immersive technologies', 1),
('Learning Psychology', 'Cognitive science and learning behaviors', 1),
('Data Science', 'Analytics and data-driven insights', 1),
('Accessibility', 'Inclusive and accessible education technology', 1);
-- Insert sample data
INSERT INTO courses (title, description, duration, level, price, category, image_url, features) VALUES
('Full Stack Web Development', 'Learn modern web development with React, Node.js, and PostgreSQL', '12 weeks', 'Beginner', 299.99, 'Development', '/images/course-webdev.jpg', '{"Hands-on Projects", "Mentor Support", "Career Guidance"}'),
('AI & Machine Learning', 'Master AI concepts and build intelligent applications', '16 weeks', 'Advanced', 499.99, 'AI', '/images/course-ai.jpg', '{"Real-world Projects", "Industry Experts", "Certification"}');

INSERT INTO testimonials (name, role, message, rating, photo_url) VALUES
('Sarah Johnson', 'Web Developer', 'EduLearn transformed my career! The courses are comprehensive and practical.', 5, '/images/testimonial1.jpg'),
('Mike Chen', 'Data Scientist', 'The AI course gave me the skills I needed to land my dream job. Highly recommended!', 5, '/images/testimonial2.jpg');

INSERT INTO team (name, role, bio, photo_url) VALUES
('Dr. Emily Parker', 'Lead Instructor', '10+ years experience in web development and education', '/images/team1.jpg'),
('Prof. James Wilson', 'AI Research Lead', 'PhD in Computer Science with focus on Machine Learning', '/images/team2.jpg');

-- Insert sample research data
INSERT INTO research (
  title, 
  summary, 
  description, 
  lead_researcher, 
  research_team, 
  duration, 
  status, 
  category, 
  tags, 
  publications, 
  funding_source, 
  budget, 
  start_date, 
  end_date, 
  image_url, 
  project_link, 
  findings, 
  impact
) VALUES 
(
  'AI-Powered Personalized Learning Pathways',
  'Developing adaptive learning algorithms that create personalized educational journeys for students.',
  'This research focuses on creating intelligent systems that can analyze student performance, learning styles, and goals to generate customized learning paths. Our approach combines machine learning with educational psychology to optimize knowledge retention and skill development.',
  'Dr. Sarah Chen',
  ARRAY['Dr. Mike Zhang', 'Prof. Emily Wong', 'Dr. James Kumar'],
  '24 months',
  'ongoing',
  'Artificial Intelligence',
  ARRAY['Machine Learning', 'Adaptive Learning', 'Educational Technology'],
  ARRAY[
    'Chen, S. et al. (2024). Adaptive Learning Systems in Modern Education. Journal of Educational Technology.',
    'International Conference on AI in Education 2023'
  ],
  'National Science Foundation',
  500000.00,
  '2024-01-15',
  '2025-12-15',
  '/images/research-ai.jpg',
  '/research/ai-learning-pathways',
  'Preliminary results show 35% improvement in learning outcomes compared to traditional methods.',
  'Potential to revolutionize how educational content is delivered and personalized globally.'
),
(
  'Blockchain for Academic Credential Verification',
  'Creating a decentralized system for secure and transparent verification of academic credentials.',
  'This project explores the application of blockchain technology to create tamper-proof digital credentials. We''re developing a system that allows instant verification of degrees, certificates, and learning achievements while maintaining student privacy and data security.',
  'Prof. Marcus Rodriguez',
  ARRAY['Dr. Lisa Thompson', 'Alex Johnson, PhD Candidate'],
  '18 months',
  'completed',
  'Blockchain & Security',
  ARRAY['Blockchain', 'Digital Credentials', 'Data Security'],
  ARRAY[
    'Rodriguez, M. (2024). Blockchain in Education: A Security Perspective. IEEE Security & Privacy.',
    'Blockchain Education Summit 2024 - Best Paper Award'
  ],
  'Department of Education Innovation Grant',
  350000.00,
  '2023-06-01',
  '2024-11-30',
  '/images/research-blockchain.jpg',
  '/research/blockchain-credentials',
  'Successfully implemented a prototype handling 10,000+ credentials with zero security breaches.',
  'Could eliminate degree fraud and streamline hiring processes for employers worldwide.'
),
(
  'Virtual Reality in STEM Education',
  'Investigating the effectiveness of VR technology in teaching complex scientific concepts.',
  'This research examines how immersive virtual reality experiences can enhance understanding and retention of complex STEM subjects. We''re developing VR modules for physics, chemistry, and biology that allow students to interact with molecular structures, planetary systems, and biological processes in 3D space.',
  'Dr. Emily Watson',
  ARRAY['Dr. Robert Kim', 'Sarah Martinez, MSc', 'David Chen, PhD Candidate'],
  '36 months',
  'ongoing',
  'Immersive Learning',
  ARRAY['Virtual Reality', 'STEM Education', 'Immersive Technology'],
  ARRAY[
    'Watson, E. et al. (2024). VR in Science Education: Early Findings. Journal of Educational Technology Research.',
    'International STEM Education Conference 2024'
  ],
  'Tech Innovation Grant & Corporate Partnerships',
  750000.00,
  '2024-03-01',
  '2026-02-28',
  '/images/research-vr.jpg',
  '/research/vr-stem',
  'Students using VR modules show 45% better retention of complex concepts compared to traditional methods.',
  'Making STEM education more accessible and engaging for diverse learning styles.'
),
(
  'Gamification in Language Learning',
  'Studying how game mechanics can accelerate foreign language acquisition.',
  'This project investigates the impact of gamification elements on motivation and progress in language learning. We''re developing a framework that incorporates points, badges, leaderboards, and narrative elements into language learning platforms to increase engagement and persistence.',
  'Dr. Anna Kowalski',
  ARRAY['Dr. Carlos Mendez', 'Maria Schmidt, PhD Candidate'],
  '20 months',
  'upcoming',
  'Learning Psychology',
  ARRAY['Gamification', 'Language Learning', 'Motivation'],
  ARRAY[],
  'Language Learning Research Foundation',
  280000.00,
  '2024-11-01',
  '2026-06-30',
  '/images/research-gamification.jpg',
  '/research/gamification-language',
  'Pilot studies show 60% increase in daily practice time with gamified approaches.',
  'Could make language learning more accessible and enjoyable for millions of learners.'
),
(
  'Data Analytics for Early Intervention in Student Performance',
  'Using predictive analytics to identify at-risk students and provide timely support.',
  'This research develops machine learning models that can predict student performance challenges before they become critical. By analyzing engagement patterns, assignment submissions, and assessment results, we can trigger early interventions to support struggling students.',
  'Dr. Benjamin Carter',
  ARRAY['Dr. Olivia Park', 'Thomas Wright, Data Scientist'],
  '16 months',
  'completed',
  'Data Science',
  ARRAY['Predictive Analytics', 'Student Success', 'Early Intervention'],
  ARRAY[
    'Carter, B. et al. (2024). Predictive Models in Education: Ethics and Efficacy. Data & Society Journal.',
    'Educational Data Mining Conference 2024'
  ],
  'University Research Grant',
  420000.00,
  '2023-09-01',
  '2024-12-31',
  '/images/research-analytics.jpg',
  '/research/early-intervention',
  'Model achieves 85% accuracy in predicting students who will need additional support.',
  'Significantly reduces dropout rates and improves overall student success metrics.'
),
(
  'Accessible Education Technology for Students with Disabilities',
  'Developing inclusive educational tools that accommodate various learning disabilities.',
  'This initiative focuses on creating educational technology that is accessible to students with visual, auditory, motor, and cognitive disabilities. We''re working on voice-controlled interfaces, screen reader compatibility, alternative input methods, and customizable learning interfaces.',
  'Dr. Rachel Green',
  ARRAY['Dr. Michael Brown', 'Accessibility Specialists', 'User Experience Researchers'],
  '30 months',
  'ongoing',
  'Accessibility',
  ARRAY['Inclusive Design', 'Accessibility', 'Universal Learning'],
  ARRAY[
    'Green, R. (2024). Beyond Compliance: True Accessibility in EdTech. Journal of Inclusive Education.',
    'Accessibility in Education Symposium 2024'
  ],
  'Disability Rights Foundation & Tech Grants',
  600000.00,
  '2024-02-01',
  '2026-07-31',
  '/images/research-accessibility.jpg',
  '/research/accessible-edtech',
  'Prototype tools show 90% satisfaction rate among students with various disabilities.',
  'Making quality education truly accessible to all learners regardless of physical or cognitive abilities.'
);
INSERT INTO stats (label, value, icon) VALUES
('Students Enrolled', 10000, 'users'),
('Success Rate', 95, 'trending-up'),
('Expert Instructors', 50, 'award'),
('Countries Reached', 30, 'globe');

INSERT INTO contact_messages (name, email, phone, subject, message) VALUES
('John Doe', 'john@example.com', '+1234567890', 'Course Inquiry', 'I would like to know more about the AI course.');