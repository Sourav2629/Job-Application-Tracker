import React, { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import JobContext from '../context/job/jobContext';
import AuthContext from '../context/auth/authContext';
import Spinner from '../components/layout/Spinner';

const JobDetail = () => {
  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);

  const { getJob, current, loading, deleteJob, clearCurrent } = jobContext;
  const { loadUser } = authContext;
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    getJob(id);
    // eslint-disable-next-line
  }, []);

  const onDelete = () => {
    deleteJob(id);
    clearCurrent();
    toast.success('Job deleted successfully');
    navigate('/dashboard');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading || !current) {
    return <Spinner />;
  }

  const { companyName, role, status, appliedDate, location, salary, notes } = current;
  const statusClass = status.toLowerCase();

  return (
    <div className='job-detail'>
      <Link to='/dashboard' className='btn btn-light'>
        <FaArrowLeft /> Back to Dashboard
      </Link>
      
      <div className='card'>
        <div className='job-detail-header'>
          <h2>{companyName}</h2>
          <span className={`job-item-status ${statusClass}`}>{status}</span>
        </div>
        
        <div className='job-detail-content'>
          <div className='job-detail-section'>
            <h3>Role</h3>
            <p>{role}</p>
          </div>
          
          {location && (
            <div className='job-detail-section'>
              <h3>Location</h3>
              <p>{location}</p>
            </div>
          )}
          
          <div className='job-detail-section'>
            <h3>Applied Date</h3>
            <p>{formatDate(appliedDate)}</p>
          </div>
          
          {salary && (
            <div className='job-detail-section'>
              <h3>Salary</h3>
              <p>{salary}</p>
            </div>
          )}
          
          {notes && (
            <div className='job-detail-section'>
              <h3>Notes</h3>
              <p>{notes}</p>
            </div>
          )}
        </div>
        
        <div className='job-detail-actions'>
          <Link to={`/jobs/edit/${id}`} className='btn btn-primary'>
            <FaEdit /> Edit
          </Link>
          <button className='btn btn-danger' onClick={onDelete}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail; 