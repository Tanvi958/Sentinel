import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onDashboardClick={() => setShowDashboard(!showDashboard)} />
      {showDashboard ? (
        <Dashboard />
      ) : (
        <>
          <Hero />
          <Features />
        </>
      )}
      <Chatbot />
    </div>
  );
}

export default App;