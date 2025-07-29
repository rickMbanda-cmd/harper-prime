import React, { useState, useEffect } from 'react';
import './CandidateDashboard.css';
import authService from '../services/authService';

function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

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

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = !typeFilter || job.type === typeFilter;

    return matchesSearch && matchesLocation && matchesType;
  });

  const getApplicationStatus = (jobId) => {
    const application = applications.find(app => app.jobId._id === jobId);
    return application ? application.status : null;
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.fullName}!</h1>
        <p>Find your next opportunity</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Browse Jobs
        </button>
        <button 
          className={`tab ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          My Applications
        </button>
        <button 
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{applications.length}</h3>
                <p>Applications Submitted</p>
              </div>
              <div className="stat-card">
                <h3>{applications.filter(app => app.status === 'under-review').length}</h3>
                <p>Under Review</p>
              </div>
              <div className="stat-card">
                <h3>{applications.filter(app => app.status === 'interview-scheduled').length}</h3>
                <p>Interviews Scheduled</p>
              </div>
              <div className="stat-card">
                <h3>{jobs.length}</h3>
                <p>Available Jobs</p>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Applications</h3>
              {applications.slice(0, 5).map(application => (
                <div key={application._id} className="activity-item">
                  <div className="activity-info">
                    <h4>{application.jobId.title}</h4>
                    <p>{application.jobId.company}</p>
                    <span className={`status-badge ${application.status}`}>
                      {application.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="activity-date">
                    {new Date(application.appliedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-section">
            <div className="jobs-filters">
              <div className="filter-group">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              <div className="filter-group">
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="jobs-grid">
              {filteredJobs.map(job => (
                <div key={job._id} className="job-card">
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <div className="job-company">
                    <p>{job.company}</p>
                    <p className="job-location">{job.location}</p>
                  </div>
                  <div className="job-description">
                    {job.description.substring(0, 150)}...
                  </div>
                  {job.salary && (
                    <div className="job-salary">
                      ${job.salary.min?.toLocaleString()} - ${job.salary.max?.toLocaleString()}
                    </div>
                  )}
                  <div className="job-actions">
                    {getApplicationStatus(job._id) ? (
                      <span className={`status-badge ${getApplicationStatus(job._id)}`}>
                        {getApplicationStatus(job._id).replace('-', ' ')}
                      </span>
                    ) : (
                      <button 
                        className="apply-btn"
                        onClick={() => handleApplyForJob(job._id)}
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h3>My Applications ({applications.length})</h3>
            <div className="applications-list">
              {applications.map(application => (
                <div key={application._id} className="application-card">
                  <div className="application-info">
                    <h4>{application.jobId.title}</h4>
                    <p>{application.jobId.company} • {application.jobId.location}</p>
                    <div className="application-meta">
                      <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
                      <span className={`status-badge ${application.status}`}>
                        {application.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-card">
              <h3>Profile Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={user?.fullName || ''} readOnly />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={user?.email || ''} readOnly />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={user?.phoneNumber || ''} readOnly />
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateDashboard;