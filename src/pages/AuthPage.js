
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
  const [userType, setUserType] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: ''
  });
  const navigate = useNavigate();

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', { userType, isLogin, formData });
    
    // Navigate to appropriate dashboard based on user type
    if (userType === 'applicant') {
      navigate('/candidate-dashboard');
    } else {
      navigate('/employer-dashboard');
    }
  };

  const resetForm = () => {
    setUserType('');
    setIsLogin(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      companyName: ''
    });
  };

  if (!userType) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome to Harper & Whitman</h1>
            <p>Choose your account type to get started</p>
          </div>
          
          <div className="user-type-selection">
            <div 
              className="user-type-card applicant-card"
              onClick={() => handleUserTypeSelect('applicant')}
            >
              <div className="user-type-icon">👤</div>
              <h3>Job Seeker</h3>
              <p>Find your dream job and advance your career</p>
              <ul>
                <li>Browse thousands of job opportunities</li>
                <li>Create professional profile</li>
                <li>Track applications</li>
                <li>Get matched with employers</li>
              </ul>
            </div>
            
            <div 
              className="user-type-card employer-card"
              onClick={() => handleUserTypeSelect('employer')}
            >
              <div className="user-type-icon">🏢</div>
              <h3>Employer</h3>
              <p>Find top talent for your organization</p>
              <ul>
                <li>Post job openings</li>
                <li>Access candidate database</li>
                <li>Manage applications</li>
                <li>Build your company profile</li>
              </ul>
            </div>
          </div>
          
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card auth-form-card">
        <div className="auth-header">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {userType === 'applicant' ? 'Job Seeker' : 'Employer'} • 
            {isLogin ? ' Sign in to continue' : ' Join our platform today'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="fullName">
                {userType === 'applicant' ? 'Full Name' : 'Contact Person'}
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}
          
          {!isLogin && userType === 'employer' && (
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                placeholder="Enter your company name"
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          )}
          
          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              className="toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        
        <div className="auth-actions">
          <button className="back-btn" onClick={resetForm}>
            ← Choose Different Account Type
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
