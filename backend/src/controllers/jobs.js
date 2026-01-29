const Job = require('../models/Job');

// @desc    Get all jobs for the logged in user
// @route   GET /api/jobs
// @access  Private
exports.getJobs = async (req, res) => {
  try {
    // Find jobs that belong to the logged in user
    const jobs = await Job.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Private
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: `Job not found with id of ${req.params.id}`
      });
    }

    // Make sure user owns the job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to view this job`
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
exports.createJob = async (req, res) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: `Job not found with id of ${req.params.id}`
      });
    }

    // Make sure user owns the job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this job`
      });
    }

    // ✅ ADD THIS BLOCK (STATUS VALIDATION)
    const STATUS_ORDER = {
      Applied: 1,
      Interview: 2,
      Offer: 3,
      Accepted: 4,
      Rejected: 4
    };

    const currentStatus = job.status;
    const newStatus = req.body.status;

    // Prevent backward status change
    if (
      newStatus &&
      STATUS_ORDER[newStatus] < STATUS_ORDER[currentStatus]
    ) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${currentStatus} back to ${newStatus}`
      });
    }

    // Proceed with update
    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: job
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: `Job not found with id of ${req.params.id}`
      });
    }

    // Make sure user owns the job
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this job`
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}; 
