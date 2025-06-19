import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaChartLine, 
  FaUserShield, 
  FaCheckCircle, 
  FaSearch,
  FaBell,
  FaLaptop
} from 'react-icons/fa';
import AuthContext from '../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className='home-container'>
      <section className='home-hero'>
        <div className='hero-content'>
          <h1>Streamline Your Job Search</h1>
          <p className='hero-subtitle'>
            Organize, track, and optimize your job applications in one powerful platform
          </p>
          <div className='home-buttons'>
            <Link to='/register' className='btn btn-primary'>
              Get Started
            </Link>
            <Link to='/login' className='btn btn-light'>
              Sign In
            </Link>
          </div>
          <div className='hero-stats'>
            <div className='stat'>
              <span className='stat-number'>1000+</span>
              <span className='stat-label'>Job Seekers</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>10k+</span>
              <span className='stat-label'>Applications Tracked</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>89%</span>
              <span className='stat-label'>Success Rate</span>
            </div>
          </div>
        </div>
        <div className='hero-image'>
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=500&q=80" alt="Job Tracker Dashboard" />
        </div>
      </section>

      <section className='home-features'>
        <h2 className='section-title'>Everything You Need to Land Your Dream Job</h2>
        <div className='features-grid'>
          <div className='feature'>
            <div className='feature-icon'>
              <FaBriefcase />
            </div>
            <h3>Application Tracking</h3>
            <p>
              Keep all your job applications organized in one place with status updates and important details.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaChartLine />
            </div>
            <h3>Progress Analytics</h3>
            <p>
              Visualize your job search progress with detailed statistics and insights to optimize your strategy.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaUserShield />
            </div>
            <h3>Secure & Private</h3>
            <p>
              Your data is protected with industry-standard security measures and user authentication.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaBell />
            </div>
            <h3>Deadline Reminders</h3>
            <p>
              Never miss an interview or follow-up with timely notifications and reminders.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaSearch />
            </div>
            <h3>Advanced Search</h3>
            <p>
              Quickly find applications with powerful filtering and search capabilities.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaLaptop />
            </div>
            <h3>Works Everywhere</h3>
            <p>
              Access your job tracker from any device - desktop, tablet, or mobile.
            </p>
          </div>
        </div>
      </section>

      <section className='home-cta'>
        <div className='cta-content'>
          <h2>Ready to Organize Your Job Search?</h2>
          <p>Join thousands of job seekers who have streamlined their application process</p>
          <Link to='/register' className='btn btn-primary btn-lg'>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 