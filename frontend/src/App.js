import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobForm from './pages/JobForm';
import JobDetail from './pages/JobDetail';

// Context
import AuthState from './context/auth/AuthState';
import JobState from './context/job/JobState';
import AlertState from './context/alert/AlertState';

// Utils
import setAuthToken from './utils/setAuthToken';

// Check for token in localStorage and set global headers
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <JobState>
        <AlertState>
          <Router>
            <AppContent />
          </Router>
        </AlertState>
      </JobState>
    </AuthState>
  );
};

// Separate component to use context
const AppContent = () => {
  const authContext = React.useContext(require('./context/auth/authContext').default);
  const { loadUser } = authContext;

  // Load user when app first loads
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/jobs/new" element={<PrivateRoute><JobForm /></PrivateRoute>} />
          <Route path="/jobs/edit/:id" element={<PrivateRoute><JobForm /></PrivateRoute>} />
          <Route path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} />
        </Routes>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App; 