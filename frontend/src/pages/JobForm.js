import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBuilding, FaBriefcase, FaClipboardList, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign, FaStickyNote, FaSave, FaTimes, FaArrowLeft, FaMagic } from 'react-icons/fa';
import JobContext from '../context/job/jobContext';
import AuthContext from '../context/auth/authContext';
import api from '../utils/api';

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

  // --- AI auto-fill state (new) ---
  const [description, setDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

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

  // --- AI auto-fill handler (new) ---
  // Calls the backend, then MERGES the result into the form. It only fills a
  // field when the AI actually found something, so nothing you typed is lost.
  const onAutofill = async () => {
    if (description.trim().length < 20) {
      toast.error('Paste a bit more of the job description first.');
      return;
    }

    setAiLoading(true);
    try {
      const res = await api.post('/ai/parse-job', { description });
      const data = res.data.data;

      setJob(prev => ({
        ...prev,
        companyName: data.companyName || prev.companyName,
        role: data.role || prev.role,
        location: data.location || prev.location,
        salary: data.salary || prev.salary,
        notes: data.notes || prev.notes
      }));

      toast.success('Filled from the description. Review and edit anything before saving.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not analyse the description.');
    } finally {
      setAiLoading(false);
    }
  };

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

      {/* ---------- AI auto-fill (new) ---------- */}
      <div className='ai-assist'>
        <div className='ai-assist-header'>
          <span className='ai-badge'><FaMagic /> AI</span>
          <div>
            <h3>Auto-fill from a job description</h3>
            <p>Paste a posting and let AI fill in the details below. You can edit everything after.</p>
          </div>
        </div>
        <textarea
          className='form-control ai-textarea'
          placeholder='Paste the full job description here...'
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={5}
        />
        <button
          type='button'
          className='btn btn-primary ai-fill-btn'
          onClick={onAutofill}
          disabled={aiLoading}
        >
          <FaMagic /> {aiLoading ? 'Analysing…' : 'Auto-fill with AI'}
        </button>
      </div>

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
