import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import JobContext from '../../context/job/jobContext';
import { FaBriefcase, FaSignOutAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const jobContext = useContext(JobContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearJobs } = jobContext;

  const onLogout = () => {
    logout();
    clearJobs();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
      <li>
        <Link to='/dashboard'>
          <FaBriefcase /> Dashboard
        </Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <FaSignOutAlt /> <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>
          <FaUserPlus /> Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <FaSignInAlt /> Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar'>
      <h1 className='logo'>
        <Link to='/'>
          <FaBriefcase /> Job Tracker
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar; 