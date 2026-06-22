import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaBriefcase,
  FaChartLine,
  FaUserShield,
  FaCheckCircle,
  FaSearch,
  FaMagic,
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
          <h1>Track Every Job Application in One Place</h1>
          <p className='hero-subtitle'>
            CareerFlow keeps all your job applications organized — log each one,
            follow it from Applied to Offer, and skip the manual typing by letting
            AI fill in the details from any job posting.
          </p>
          <div className='home-buttons'>
            <Link to='/register' className='btn btn-primary'>
              Get Started — It's Free
            </Link>
            <Link to='/login' className='btn btn-light'>
              Sign In
            </Link>
          </div>
          <div className='hero-stats'>
            <div className='stat'>
              <span className='stat-number'>AI</span>
              <span className='stat-label'>Auto-Fill from a Job Post</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>5</span>
              <span className='stat-label'>Application Stages</span>
            </div>
            <div className='stat'>
              <span className='stat-number'>100%</span>
              <span className='stat-label'>Private to You</span>
            </div>
          </div>
        </div>
        <div className='hero-image'>
          <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=500&q=80" alt="Job application tracker dashboard" />
        </div>
      </section>

      <section className='home-features'>
        <h2 className='section-title'>Everything You Need to Stay on Top of Your Job Search</h2>
        <div className='features-grid'>
          <div className='feature'>
            <div className='feature-icon'>
              <FaBriefcase />
            </div>
            <h3>Application Tracking</h3>
            <p>
              Save every application with its company, role, location, salary, date,
              and notes — all in one organized dashboard.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaMagic />
            </div>
            <h3>AI Auto-Fill</h3>
            <p>
              Paste a job description and AI pulls out the company, role, location,
              salary, and a short summary in seconds — then you just review and save.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaChartLine />
            </div>
            <h3>Status at a Glance</h3>
            <p>
              Track each application through five stages — Applied, Interview, Offer,
              Accepted, and Rejected — and see how many sit at each stage.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaSearch />
            </div>
            <h3>Search, Filter &amp; Sort</h3>
            <p>
              Instantly search by company or role, filter by status, and sort by date
              to find any application without scrolling.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaUserShield />
            </div>
            <h3>Secure &amp; Private</h3>
            <p>
              Accounts are protected with JWT authentication and hashed passwords, and
              your applications are visible only to you.
            </p>
          </div>

          <div className='feature'>
            <div className='feature-icon'>
              <FaLaptop />
            </div>
            <h3>Works on Any Device</h3>
            <p>
              A responsive interface that adapts cleanly to desktop, tablet, and mobile.
            </p>
          </div>
        </div>
      </section>

      <section className='home-cta'>
        <div className='cta-content'>
          <h2>Ready to Organize Your Job Search?</h2>
          <p>Create a free account and start tracking your applications in minutes.</p>
          <Link to='/register' className='btn btn-primary btn-lg'>
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
