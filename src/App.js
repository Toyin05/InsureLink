import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import Education from './components/Education';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/education" element={<EducationCenter />} /> */}
          {/* <Route path="/chat" element={<AIChatInterface />} /> */}
          {/* <Route path="/plans" element={<InsurancePlans />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}


           <Route path="/education" element={<Education />} />

          {/* Catch all route - redirect to landing */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
