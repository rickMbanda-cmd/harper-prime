
import React, { useState } from 'react';
import './EmployerDashboard.css';

function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      posted: '2024-01-15',
      applications: 24,
      status: 'Active'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      posted: '2024-01-12',
      applications: 18,
      status: 'Active'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Contract',
      posted: '2024-01-10',
      applications: 31,
      status: 'Paused'
    }
  ]);

  const [recentApplications] = useState([
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      appliedDate: '2024-01-16',
      status: 'Under Review',
      experience: '5 years'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      position: 'Product Manager',
      appliedDate: '2024-01-16',
      status: 'Interview Scheduled',
      experience: '7 years'
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      position: 'UX Designer',
      appliedDate: '2024-01-15',
      status: 'New',
      experience: '3 years'
    }
  ]);

  const renderOverview = () => (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>3</h3>
            <p>Active Job Posts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>73</h3>
            <p>Total Applications</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Interviews Scheduled</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>8</h3>
            <p>Offers Extended</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="section recent-applications">
          <div className="section-header">
            <h3>Recent Applications</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="applications-list">
            {recentApplications.map(app => (
              <div key={app.id} className="application-item">
                <div className="candidate-info">
                  <div className="candidate-avatar">{app.candidateName.charAt(0)}</div>
                  <div>
                    <h4>{app.candidateName}</h4>
                    <p>{app.position}</p>
                  </div>
                </div>
                <div className="application-details">
                  <span className="experience">{app.experience}</span>
                  <span className={`status status-${app.status.toLowerCase().replace(' ', '-')}`}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span className="btn-icon">➕</span>
              Post New Job
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">👥</span>
              Browse Candidates
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">📊</span>
              View Analytics
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">⚙️</span>
              Company Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="dashboard-content">
      <div className="section-header">
        <h2>Job Management</h2>
        <button className="primary-btn">
          <span className="btn-icon">➕</span>
          Post New Job
        </button>
      </div>
      
      <div className="jobs-table">
        <div className="table-header">
          <div>Job Title</div>
          <div>Department</div>
          <div>Location</div>
          <div>Applications</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {jobs.map(job => (
          <div key={job.id} className="table-row">
            <div className="job-title-cell">
              <h4>{job.title}</h4>
              <p>{job.type} • Posted {new Date(job.posted).toLocaleDateString()}</p>
            </div>
            <div>{job.department}</div>
            <div>{job.location}</div>
            <div className="applications-count">{job.applications}</div>
            <div>
              <span className={`status status-${job.status.toLowerCase()}`}>
                {job.status}
              </span>
            </div>
            <div className="actions-cell">
              <button className="action-btn-small">Edit</button>
              <button className="action-btn-small">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApplications = () => (
    <div className="dashboard-content">
      <div className="section-header">
        <h2>Applications Management</h2>
        <div className="filters">
          <select className="filter-select">
            <option>All Positions</option>
            <option>Senior Software Engineer</option>
            <option>Product Manager</option>
            <option>UX Designer</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>New</option>
            <option>Under Review</option>
            <option>Interview Scheduled</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="applications-grid">
        {recentApplications.map(app => (
          <div key={app.id} className="application-card">
            <div className="candidate-header">
              <div className="candidate-avatar large">{app.candidateName.charAt(0)}</div>
              <div className="candidate-details">
                <h3>{app.candidateName}</h3>
                <p>{app.position}</p>
                <span className="applied-date">Applied {new Date(app.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="candidate-summary">
              <div className="experience-badge">{app.experience} experience</div>
              <span className={`status status-${app.status.toLowerCase().replace(' ', '-')}`}>
                {app.status}
              </span>
            </div>
            <div className="candidate-actions">
              <button className="action-btn secondary">View Profile</button>
              <button className="action-btn primary">Schedule Interview</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompany = () => (
    <div className="dashboard-content">
      <div className="section-header">
        <h2>Company Profile</h2>
        <button className="primary-btn">Edit Profile</button>
      </div>

      <div className="company-profile">
        <div className="profile-section">
          <h3>Company Information</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Company Name</label>
              <p>Tech Solutions Inc.</p>
            </div>
            <div className="profile-item">
              <label>Industry</label>
              <p>Technology</p>
            </div>
            <div className="profile-item">
              <label>Location</label>
              <p>San Francisco, CA</p>
            </div>
            <div className="profile-item">
              <label>Company Size</label>
              <p>50-100 employees</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Company Description</h3>
          <p>We are a leading technology company focused on creating innovative solutions that transform businesses and improve lives. Our team of dedicated professionals works collaboratively to deliver exceptional results for our clients worldwide.</p>
        </div>

        <div className="profile-section">
          <h3>Contact Information</h3>
          <div className="profile-grid">
            <div className="profile-item">
              <label>Email</label>
              <p>contact@techsolutions.com</p>
            </div>
            <div className="profile-item">
              <label>Phone</label>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="profile-item">
              <label>Website</label>
              <p>www.techsolutions.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="employer-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Employer Dashboard</h1>
          <div className="user-info">
            <div className="user-avatar">J</div>
            <div>
              <h3>John Smith</h3>
              <p>Tech Solutions Inc.</p>
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
          className={`nav-btn ${activeTab === 'company' ? 'active' : ''}`}
          onClick={() => setActiveTab('company')}
        >
          <span className="nav-icon">🏢</span>
          Company
        </button>
      </div>

      <div className="dashboard-body">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'jobs' && renderJobs()}
        {activeTab === 'applications' && renderApplications()}
        {activeTab === 'company' && renderCompany()}
      </div>
    </div>
  );
}

export default EmployerDashboard;
