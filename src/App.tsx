import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { Contact } from './pages/Contact';
import { ResearchPage } from './pages/ResearchPage'; 
import { About } from './pages/About'; // Import your About component
import { Header } from './components/Layout/Headers';
import { Footer } from './components/Layout/Footers';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/About" element={<About />} /> {/* Fixed: Use <About /> component */}
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;