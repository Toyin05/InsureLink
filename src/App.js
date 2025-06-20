import React from 'react';
import InsureLinkLanding from './components/InsureLinkLanding';
import './App.css';

function App() {
  return (
    <div className="App">
      <InsureLinkLanding />
    </div>
  );
}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
}

export default App;
