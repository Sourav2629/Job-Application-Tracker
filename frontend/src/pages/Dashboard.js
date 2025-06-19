import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaSort, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaListAlt, 
  FaChartBar, 
  FaRegClock,
  FaCheckCircle,
  FaRegFileAlt
} from 'react-icons/fa';
import JobContext from '../context/job/jobContext';
import AuthContext from '../context/auth/authContext';
import JobItem from '../components/jobs/JobItem';
import Spinner from '../components/layout/Spinner';

const Dashboard = () => {
  const jobContext = useContext(JobContext);
  const authContext = useContext(AuthContext);

  const { jobs, getJobs, loading, filtered, filterJobs, clearFilter } = jobContext;
  const { loadUser } = authContext;

  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadUser();
    getJobs();
    // eslint-disable-next-line
  }, []);

  const onSearch = e => {
    setSearchText(e.target.value);
    if (e.target.value !== '') {
      filterJobs(e.target.value);
    } else {
      clearFilter();
    }
  };

  const filteredJobs = () => {
    let filteredList = filtered || jobs;

    if (statusFilter !== 'all') {
      filteredList = filteredList.filter(job => job.status === statusFilter);
    }

    if (sortBy === 'newest') {
      return [...filteredList].sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else {
      return [...filteredList].sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
    }
  };
  
  const getStatusCount = (status) => {
    return jobs ? jobs.filter(job => job.status === status).length : 0;
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='dashboard'>
      <div className='dashboard-sidebar'>
        <h3><FaBriefcase /> Job Tracker</h3>
        <div className='dashboard-sidebar-btn-container'>
          <Link to='/jobs/new' className='btn btn-primary btn-block'>
            <FaPlus /> Add New Job
          </Link>
        </div>
        
        <div className='dashboard-sidebar-scroll'>
          <div className='filter-group'>
            <h4><FaFilter /> Filter by Status</h4>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className='filter-select'
            >
              <option value='all'>All Jobs</option>
              <option value='Applied'>Applied</option>
              <option value='Interview'>Interview</option>
              <option value='Offer'>Offer</option>
              <option value='Rejected'>Rejected</option>
              <option value='Accepted'>Accepted</option>
            </select>
          </div>

          <div className='filter-group'>
            <h4><FaSort /> Sort by Date</h4>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='filter-select'
            >
              <option value='newest'>Newest First</option>
              <option value='oldest'>Oldest First</option>
            </select>
          </div>

          <div className='filter-group'>
            <h4><FaChartBar /> Job Stats</h4>
            <div className='job-stats'>
              <div className='stat-item'>
                <span className='stat-label'>Total Jobs</span>
                <span className='stat-value'>{jobs ? jobs.length : 0}</span>
              </div>
              <div className='stat-item'>
                <span className='stat-label'>Applied</span>
                <span className='stat-value'>{getStatusCount('Applied')}</span>
              </div>
              <div className='stat-item'>
                <span className='stat-label'>Interviews</span>
                <span className='stat-value'>{getStatusCount('Interview')}</span>
              </div>
              <div className='stat-item'>
                <span className='stat-label'>Offers</span>
                <span className='stat-value'>{getStatusCount('Offer')}</span>
              </div>
              <div className='stat-item'>
                <span className='stat-label'>Active Applications</span>
                <span className='stat-value'>
                  {jobs ? jobs.filter(job => job.status !== 'Rejected' && job.status !== 'Accepted').length : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='dashboard-content'>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search jobs by company or role...'
            value={searchText}
            onChange={onSearch}
            className='search-input'
          />
          <FaSearch className='search-icon' />
        </div>

        {jobs && jobs.length === 0 ? (
          <div className='no-jobs-message'>
            <FaBriefcase size={48} />
            <div>
              <h3>No jobs found</h3>
              <p>Add a job to get started tracking your applications!</p>
            </div>
            <Link to='/jobs/new' className='btn btn-primary'>
              <FaPlus /> Add Your First Job
            </Link>
          </div>
        ) : (
          <div className='job-list-container'>
            <div className='job-list-header'>
              <div className='job-list-title'>
                <FaListAlt /> Your Applications
              </div>
              <div className='job-count'>
                Showing {filteredJobs().length} of {jobs.length} jobs
              </div>
            </div>
            <div className='job-list-scrollable'>
              {filteredJobs().length === 0 ? (
                <div className='no-jobs-message' style={{ boxShadow: 'none' }}>
                  <FaRegFileAlt size={36} />
                  <p>No jobs match your current filters</p>
                  <button onClick={() => {
                    setStatusFilter('all');
                    setSearchText('');
                    clearFilter();
                  }} className='btn btn-primary'>
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className='job-list'>
                  {filteredJobs().map(job => (
                    <JobItem key={job._id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 