import React, { useReducer } from 'react';
import axios from 'axios';
import JobContext from './jobContext';
import jobReducer from './jobReducer';
import {
  GET_JOBS,
  GET_JOB,
  ADD_JOB,
  DELETE_JOB,
  UPDATE_JOB,
  JOB_ERROR,
  CLEAR_JOBS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_JOBS,
  CLEAR_FILTER,
  SET_LOADING
} from '../types';

const JobState = props => {
  const initialState = {
    jobs: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(jobReducer, initialState);

  // Get Jobs
  const getJobs = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/jobs');

      dispatch({
        type: GET_JOBS,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Get Job
  const getJob = async id => {
    try {
      setLoading();
      const res = await axios.get(`/api/jobs/${id}`);

      dispatch({
        type: GET_JOB,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Add Job
  const addJob = async job => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      setLoading();
      const res = await axios.post('/api/jobs', job, config);

      dispatch({
        type: ADD_JOB,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Delete Job
  const deleteJob = async id => {
    try {
      setLoading();
      await axios.delete(`/api/jobs/${id}`);

      dispatch({
        type: DELETE_JOB,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: JOB_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Update Job
 // Update Job
const updateJob = async job => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    setLoading();
    const res = await axios.put(`/api/jobs/${job._id}`, job, config);

    dispatch({
      type: UPDATE_JOB,
      payload: res.data.data
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: JOB_ERROR,
      payload: err.response?.data?.message || 'Update failed'
    });

    // 🔥 THIS LINE IS THE KEY
    throw err;
  }
};


  // Clear Jobs
  const clearJobs = () => {
    dispatch({ type: CLEAR_JOBS });
  };

  // Set Current Job
  const setCurrent = job => {
    dispatch({ type: SET_CURRENT, payload: job });
  };

  // Clear Current Job
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Jobs
  const filterJobs = text => {
    dispatch({ type: FILTER_JOBS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <JobContext.Provider
      value={{
        jobs: state.jobs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getJobs,
        getJob,
        addJob,
        deleteJob,
        updateJob,
        clearJobs,
        setCurrent,
        clearCurrent,
        filterJobs,
        clearFilter
      }}
    >
      {props.children}
    </JobContext.Provider>
  );
};

export default JobState; 
