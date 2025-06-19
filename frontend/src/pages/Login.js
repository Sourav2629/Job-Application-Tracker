import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock, FaSignInAlt, FaBriefcase } from 'react-icons/fa';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const Login = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    if (error) {
      toast.error(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-logo'>
          <FaBriefcase size={40} />
          <h2>Job Tracker</h2>
        </div>
        <h1>
          Welcome Back
        </h1>
        <p className='auth-subtitle'>Sign in to your account</p>
        
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <div className='input-group'>
              <span className='input-icon'>
                <FaEnvelope />
              </span>
              <input
                id='email'
                type='email'
                name='email'
                placeholder='Email Address'
                value={email}
                onChange={onChange}
                required
                autoComplete='email'
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <span className='input-icon'>
                <FaLock />
              </span>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Password'
                value={password}
                onChange={onChange}
                required
                autoComplete='current-password'
                minLength='6'
              />
            </div>
          </div>
          <button
            type='submit'
            className='btn btn-primary btn-block auth-btn'
          >
            <FaSignInAlt /> Login
          </button>
        </form>
        <p className='auth-redirect'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 