import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaBriefcase, 
  FaBuilding, 
  FaClock,
  FaStickyNote
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import JobContext from '../../context/job/jobContext';

const JobItem = ({ job }) => {
  const jobContext = useContext(JobContext);
  const { deleteJob, setCurrent, clearCurrent } = jobContext;

  const { _id, companyName, role, status, appliedDate, location, notes } = job;

  const onDelete = () => {
    deleteJob(_id);
    clearCurrent();
    toast.success('Job deleted successfully');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statusClass = status.toLowerCase();
  
  // Calculate days since application
  const daysSinceApplied = () => {
    const applied = new Date(appliedDate);
    const today = new Date();
    const diffTime = Math.abs(today - applied);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get appropriate status icon
  const getStatusIcon = () => {
    switch(status) {
      case 'Applied':
        return <FaCalendarAlt />;
      case 'Interview':
        return <FaClock />;
      case 'Offer':
        return <FaEdit />;
      case 'Rejected':
        return <FaTrash />;
      case 'Accepted':
        return <FaEye />;
      default:
        return <FaCalendarAlt />;
    }
  };

  return (
    <div className={`job-item ${statusClass}`}>
      <div className='job-item-header'>
        <div>
          <div className='job-item-company'><FaBuilding /> {companyName}</div>
          <div className='job-item-role'><FaBriefcase /> {role}</div>
          {location && <div className='job-item-location'><FaMapMarkerAlt /> {location}</div>}
        </div>
        <span className={`job-item-status ${statusClass}`}>
          {getStatusIcon()} {status}
        </span>
      </div>
      
      <div className='job-item-content'>
        <div className='job-item-date'><FaCalendarAlt /> {formatDate(appliedDate)}</div>
        <div className='job-item-days'><FaClock /> {daysSinceApplied()} days</div>
        
        {notes && notes.length > 0 && (
          <div className='job-item-notes'>
            <FaStickyNote />
            <span>{notes.length > 80 ? `${notes.substring(0, 80)}...` : notes}</span>
          </div>
        )}
      </div>
      
      <div className='job-item-actions'>
        <Link to={`/jobs/${_id}`} className='btn btn-dark btn-sm'>
          <FaEye /> View
        </Link>
        <Link to={`/jobs/edit/${_id}`} className='btn btn-primary btn-sm'>
          <FaEdit /> Edit
        </Link>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

JobItem.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobItem; 