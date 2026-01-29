import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBuilding, FaBriefcase, FaClipboardList, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaStickyNote, FaSave, FaTimes, FaArrowLeft } from 'react-icons/fa';
import JobContext from '../context/job/jobContext';
import AuthContext from '../context/auth/authContext';

const JobForm = () => {
  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);

  const { addJob, updateJob, current, clearCurrent, getJob, loading } = jobContext;
  const { loadUser } = authContext;
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [job, setJob] = useState({
    companyName: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    location: '',
    salary: '',
    notes: ''
  });

  const { companyName, role, status, appliedDate, location, salary, notes } = job;

  useEffect(() => {
    loadUser();
    
    if (isEditMode) {
      getJob(id);
    } else {
      clearCurrent();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (current && isEditMode) {
      setJob({
        ...current,
        appliedDate: current.appliedDate ? new Date(current.appliedDate).toISOString().split('T')[0] : ''
      });
    }
  }, [current, isEditMode]);

  const onChange = e => setJob({ ...job, [e.target.name]: e.target.value });

  const onSubmit = async e => {
  e.preventDefault();

  if (companyName === '' || role === '') {
    toast.error('Please fill in company name and role');
    return;
  }

  try {
    if (isEditMode) {
      await updateJob(job); // ⬅️ WAIT for backend
      toast.success('Job updated successfully');
    } else {
      await addJob(job);
      toast.success('Job added successfully');
    }

    clearForm();
    navigate('/dashboard');
  } catch (err) {
    // ⬅️ backend error message (like invalid status transition)
    toast.error(err?.response?.data?.message || 'Something went wrong');
  }
};

  const clearForm = () => {
    clearCurrent();
    setJob({
      companyName: '',
      role: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      location: '',
      salary: '',
      notes: ''
    });
  };

  return (
    <div className='form-container'>
      <Link to='/dashboard' className='btn btn-light back-btn'>
        <FaArrowLeft /> Back to Dashboard
      </Link>
      
      <h1>{isEditMode ? 'Edit Job' : 'Add Job'}</h1>
      
      <form onSubmit={onSubmit} className='form'>
        <div className='form-grid'>
          <div className='form-group'>
            <label htmlFor='companyName'>
              <FaBuilding /> Company Name
            </label>
            <div className='input-group'>
              <span className='input-icon'><FaBuilding /></span>
              <input
                type='text'
                placeholder='Company Name'
                name='companyName'
                value={companyName}
                onChange={onChange}
                required
                className='form-control'
              />
            </div>
          </div>
          
          <div className='form-group'>
            <label htmlFor='role'>
              <FaBriefcase /> Job Role
            </label>
            <div className='input-group'>
              <span className='input-icon'><FaBriefcase /></span>
              <input
                type='text'
                placeholder='Job Role'
                name='role'
                value={role}
                onChange={onChange}
                required
                className='form-control'
              />
            </div>
          </div>
        </div>
        
        <div className='form-grid'>
          <div className='form-group'>
            <label htmlFor='status'>
              <FaClipboardList /> Status
            </label>
            <select name='status' value={status} onChange={onChange} className='form-control'>
              <option value='Applied'>Applied</option>
              <option value='Interview'>Interview</option>
              <option value='Offer'>Offer</option>
              <option value='Rejected'>Rejected</option>
              <option value='Accepted'>Accepted</option>
            </select>
          </div>
          
          <div className='form-group'>
            <label htmlFor='appliedDate'>
              <FaCalendarAlt /> Applied Date
            </label>
            <div className='input-group'>
              <span className='input-icon'><FaCalendarAlt /></span>
              <input
                type='date'
                name='appliedDate'
                value={appliedDate}
                onChange={onChange}
                className='form-control'
              />
            </div>
          </div>
        </div>
        
        <div className='form-grid'>
          <div className='form-group'>
            <label htmlFor='location'>
              <FaMapMarkerAlt /> Location
            </label>
            <div className='input-group'>
              <span className='input-icon'><FaMapMarkerAlt /></span>
              <input
                type='text'
                placeholder='Location'
                name='location'
                value={location}
                onChange={onChange}
                className='form-control'
              />
            </div>
          </div>
          
          <div className='form-group'>
            <label htmlFor='salary'>
              <FaDollarSign /> Salary
            </label>
            <div className='input-group'>
              <span className='input-icon'><FaDollarSign /></span>
              <input
                type='text'
                placeholder='Salary'
                name='salary'
                value={salary}
                onChange={onChange}
                className='form-control'
              />
            </div>
          </div>
        </div>
        
        <div className='form-group'>
          <label htmlFor='notes'>
            <FaStickyNote /> Notes
          </label>
          <textarea
            name='notes'
            placeholder='Notes about this job application'
            value={notes}
            onChange={onChange}
            className='form-control'
            rows={3}
          />
        </div>
        
        <div className='form-actions'>
          <button
            type='submit'
            className='btn btn-primary'
          >
            <FaSave /> {isEditMode ? 'Update Job' : 'Add Job'}
          </button>
          
          {isEditMode && (
            <button
              type='button'
              className='btn btn-light'
              onClick={() => {
                clearForm();
                navigate('/dashboard');
              }}
            >
              <FaTimes /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobForm; 
