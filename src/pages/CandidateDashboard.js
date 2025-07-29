
import React, { useState, useEffect } from 'react';
import './CandidateDashboard.css';
import authService from '../services/authService';

function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);

      // Load jobs
      const jobsResponse = await authService.makeAuthenticatedRequest('/jobs');
      setJobs(jobsResponse.jobs || []);

      // Load applications
      const applicationsResponse = await authService.makeAuthenticatedRequest('/applications/applicant');
      setApplications(applicationsResponse.applications || []);

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const handleApplyForJob = async (jobId) => {
    try {
      await authService.makeAuthenticatedRequest(`/jobs/${jobId}/apply`, {
        method: 'POST',
        body: JSON.stringify({
          coverLetter: 'I am interested in this position and would love to contribute to your team.',
        }),
      });

      alert('Application submitted successfully!');
      loadDashboardData(); // Reload data
    } catch (error) {
      console.error('Error applying for job:', error);
      alert(error.message || 'Failed to submit application');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{applications.length}</h3>
            <p>Applications Submitted</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-info">
            <h3>{applications.filter(app => app.status === 'under-review').length}</h3>
            <p>Under Review</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{applications.filter(app => app.status === 'interview-scheduled').length}</h3>
            <p>Interviews Scheduled</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{applications.filter(app => app.status === 'offered').length}</h3>
            <p>Job Offers</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section recent-applications">
          <div className="section-header">
            <h3>Recent Applications</h3>
            <button className="view-all-btn" onClick={() => setActiveTab('applications')}>View All</button>
          </div>
          <div className="applications-list">
            {applications.slice(0, 5).map(app => (
              <div key={app._id} className="application-item">
                <div className="job-info">
                  <div className="company-avatar">
                    {app.jobId?.company?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h4>{app.jobId?.title}</h4>
                    <p>{app.jobId?.company} • {app.jobId?.location}</p>
                  </div>
                </div>
                <div className="application-details">
                  <span className="applied-date">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                  <span className={`status status-${app.status}`}>
                    {app.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <p className="no-data">No applications yet. Start applying to jobs!</p>
            )}
          </div>
        </div>

        <div className="section quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary" onClick={() => setActiveTab('jobs')}>
              <span className="btn-icon">🔍</span>
              Browse Jobs
            </button>
            <button className="action-btn secondary" onClick={() => setActiveTab('profile')}>
              <span className="btn-icon">👤</span>
              Update Profile
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">📄</span>
              Upload Resume
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">⚙️</span>
              Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="dashboard-content">
      <div className="section-header">
        <h2>Available Jobs</h2>
        <div className="search-filters">
          <input type="text" placeholder="Search jobs..." className="search-input" />
          <select className="filter-select">
            <option>All Locations</option>
            <option>Remote</option>
            <option>New York</option>
            <option>San Francisco</option>
          </select>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <div className="job-header">
              <h3>{job.title}</h3>
              <div className="company-info">
                <span className="company-name">{job.company}</span>
                <span className="job-location">{job.location}</span>
              </div>
            </div>
            <div className="job-details">
              <span className="job-type">{job.type}</span>
              <span className="job-department">{job.department}</span>
            </div>
            <p className="job-description">
              {job.description?.substring(0, 150)}...
            </p>
            <div className="job-actions">
              <button 
                className="apply-btn"
                onClick={() => handleApplyForJob(job._id)}
                disabled={applications.some(app => app.jobId?._id === job._id)}
              >
                {applications.some(app => app.jobId?._id === job._id) ? 'Applied' : 'Apply Now'}
              </button>
              <button className="save-btn">Save Job</button>
            </div>
          </div>
        ))}
        {jobs.length === 0 && (
          <p className="no-data">No jobs available at the moment.</p>
        )}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="dashboard-content">
      <div className="section-header">
        <h2>My Applications</h2>
        <div className="filters">
          <select className="filter-select">
            <option>All Status</option>
            <option>New</option>
            <option>Under Review</option>
            <option>Interview Scheduled</option>
            <option>Offered</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="applications-table">
        <div className="table-header">
          <div>Job Title</div>
          <div>Company</div>
          <div>Applied Date</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {applications.map(app => (
          <div key={app._id} className="table-row">
            <div className="job-title-cell">
              <h4>{app.jobId?.title}</h4>
              <p>{app.jobId?.type} • {app.jobId?.location}</p>
            </div>
            <div>{app.jobId?.company}</div>
            <div>{new Date(app.appliedAt).toLocaleDateString()}</div>
            <div>
              <span className={`status status-${app.status}`}>
                {app.status.replace('-', ' ')}
              </span>
            </div>
            <div className="actions-cell">
              <button className="action-btn-small">View</button>
              <button className="action-btn-small">Withdraw</button>
            </div>
          </div>
        ))}
        {applications.length === 0 && (
          <p className="no-data">No applications yet.</p>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="dashboard-content">
      <div className="section-header">
        <h2>My Profile</h2>
        <button className="primary-btn">Edit Profile</button>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Full Name</label>
              <p>{user?.fullName}</p>
            </div>
            <div className="profile-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="profile-item">
              <label>Phone Number</label>
              <p>{user?.phoneNumber || 'Not provided'}</p>
            </div>
            <div className="profile-item">
              <label>Member Since</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Professional Details</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Current Status</label>
              <p>Job Seeker</p>
            </div>
            <div className="profile-item">
              <label>Experience Level</label>
              <p>Not specified</p>
            </div>
            <div className="profile-item">
              <label>Preferred Location</label>
              <p>Not specified</p>
            </div>
            <div className="profile-item">
              <label>Skills</label>
              <p>Not specified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="candidate-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Candidate Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">{user?.fullName?.charAt(0) || 'U'}</div>
            <div>
              <h3>{user?.fullName}</h3>
              <p>Job Seeker</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <span className="nav-icon">📊</span>
          Overview
        </button>
        <button 
          className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          <span className="nav-icon">💼</span>
          Jobs
        </button>
        <button 
          className={`nav-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          <span className="nav-icon">📋</span>
          Applications
        </button>
        <button 
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <span className="nav-icon">👤</span>
          Profile
        </button>
      </div>

      <div className="dashboard-body">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'jobs' && renderJobs()}
        {activeTab === 'applications' && renderApplications()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
}

export default CandidateDashboard;
