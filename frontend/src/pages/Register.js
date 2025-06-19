import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaBriefcase } from 'react-icons/fa';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;
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
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
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
        <h1>Create Account</h1>
        <p className='auth-subtitle'>Sign up to get started</p>
        
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <div className='input-group'>
              <span className='input-icon'>
                <FaUser />
              </span>
              <input
                id='name'
                type='text'
                name='name'
                placeholder='Full Name'
                value={name}
                onChange={onChange}
                required
                autoComplete='name'
              />
            </div>
          </div>
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
                minLength='6'
                autoComplete='new-password'
              />
            </div>
          </div>
          <div className='form-group'>
            <div className='input-group'>
              <span className='input-icon'>
                <FaLock />
              </span>
              <input
                id='password2'
                type='password'
                name='password2'
                placeholder='Confirm Password'
                value={password2}
                onChange={onChange}
                required
                minLength='6'
                autoComplete='new-password'
              />
            </div>
          </div>
          <button
            type='submit'
            className='btn btn-primary btn-block auth-btn'
          >
            <FaUserPlus /> Register
          </button>
        </form>
        <p className='auth-redirect'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 