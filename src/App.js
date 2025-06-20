import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Education from './components/Education';
import AIChatPage from './components/AIChatPage';
import InsurancePlans from './components/InsurancePlans';
import ProfilePage from './components/ProfilePage'; // ← Add this line

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/education" element={<Education />} />
          <Route path="/chat" element={<AIChatPage />} />
          <Route path="/plans" element={<InsurancePlans />} />
          <Route path="/profile" element={<ProfilePage />} /> 
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
