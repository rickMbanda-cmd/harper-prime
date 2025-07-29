
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

function AuthPage() {
  const [userType, setUserType] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Account Info
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    companyName: '',
    
    // Company Profile
    industry: '',
    companyLocation: '',
    companyDescription: '',
    
    // Terms acceptance
    acceptTerms: false
  });
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });
  
  const navigate = useNavigate();

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Construction', 'Hospitality', 'Transportation', 'Real Estate',
    'Marketing & Advertising', 'Consulting', 'Non-Profit', 'Government', 'Other'
  ];

  const handleUserTypeSelect = (type) => {
    setUserType(type);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Check password strength if password field
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 0:
      case 1:
        feedback = 'Very Weak';
        break;
      case 2:
        feedback = 'Weak';
        break;
      case 3:
        feedback = 'Fair';
        break;
      case 4:
        feedback = 'Good';
        break;
      case 5:
        feedback = 'Strong';
        break;
      default:
        feedback = '';
    }

    setPasswordStrength({ score, feedback });
  };

  const validateCurrentStep = () => {
    if (userType === 'employer' && !isLogin) {
      switch (currentStep) {
        case 1:
          return formData.fullName && formData.companyName && formData.email && formData.phoneNumber;
        case 2:
          return formData.password && formData.confirmPassword && 
                 formData.password === formData.confirmPassword && 
                 passwordStrength.score >= 3 && formData.acceptTerms;
        case 3:
          return formData.industry && formData.companyLocation && formData.companyDescription;
        default:
          return true;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const authService = (await import('../services/authService')).default;
      
      if (isLogin) {
        // Login logic
        const credentials = {
          email: formData.email,
          password: formData.password
        };
        
        const response = await authService.login(credentials);
        console.log('Login successful:', response);
        
        // Navigate to appropriate dashboard based on user type
        if (response.user.userType === 'applicant') {
          navigate('/candidate-dashboard');
        } else {
          navigate('/employer-dashboard');
        }
      } else {
        // Registration logic
        const userData = {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          userType: userType
        };
        
        // Add employer-specific fields if userType is employer
        if (userType === 'employer') {
          userData.companyName = formData.companyName;
          userData.industry = formData.industry;
          userData.companyLocation = formData.companyLocation;
          userData.companyDescription = formData.companyDescription;
        }
        
        const response = await authService.register(userData);
        console.log('Registration successful:', response);
        
        // Navigate to appropriate dashboard based on user type
        if (userType === 'applicant') {
          navigate('/candidate-dashboard');
        } else {
          navigate('/employer-dashboard');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error.message || 'Authentication failed. Please try again.');
    }
  };

  const resetForm = () => {
    setUserType('');
    setIsLogin(false);
    setCurrentStep(1);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phoneNumber: '',
      companyName: '',
      industry: '',
      companyLocation: '',
      companyDescription: '',
      acceptTerms: false
    });
    setPasswordStrength({ score: 0, feedback: '' });
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

  // Render employer multi-step signup
  if (userType === 'employer' && !isLogin) {
    return (
      <div className="auth-container">
        <div className="auth-card auth-form-card employer-signup">
          <div className="auth-header">
            <h1>Create Employer Account</h1>
            <p>Step {currentStep} of 3 • Build your company presence</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {currentStep === 1 && (
              <div className="step-content">
                <h3>Basic Account Information</h3>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name *</label>
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
                
                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
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
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your business email"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number *</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h3>Account Credentials</h3>
                <div className="form-group">
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Create a strong password"
                  />
                  {formData.password && (
                    <div className={`password-strength strength-${passwordStrength.score}`}>
                      <div className="strength-bar">
                        <div className="strength-fill" style={{ width: `${(passwordStrength.score / 5) * 100}%` }}></div>
                      </div>
                      <span className="strength-text">{passwordStrength.feedback}</span>
                    </div>
                  )}
                  <div className="password-requirements">
                    <small>Password must contain at least 8 characters, uppercase, lowercase, number, and special character</small>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm your password"
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <div className="error-message">Passwords do not match</div>
                  )}
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleInputChange}
                      required
                    />
                    <span className="checkmark"></span>
                    I accept the <a href="/terms" target="_blank">Terms & Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h3>Company Profile</h3>
                <div className="form-group">
                  <label htmlFor="industry">Industry Category *</label>
                  <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyLocation">Company Location *</label>
                  <input
                    type="text"
                    id="companyLocation"
                    name="companyLocation"
                    value={formData.companyLocation}
                    onChange={handleInputChange}
                    required
                    placeholder="City, State/Country"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="companyDescription">Company Description *</label>
                  <textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your company, culture, and what makes you unique..."
                    rows="4"
                  />
                </div>
              </div>
            )}
            
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="prev-btn" onClick={handlePrevious}>
                  ← Previous
                </button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  type="button" 
                  className="next-btn" 
                  onClick={handleNext}
                  disabled={!validateCurrentStep()}
                >
                  Next →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="auth-submit-btn"
                  disabled={!validateCurrentStep()}
                >
                  Create Account
                </button>
              )}
            </div>
          </form>
          
          <div className="auth-toggle">
            <p>
              Already have an account?
              <button 
                type="button" 
                className="toggle-btn"
                onClick={() => setIsLogin(true)}
              >
                Sign In
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

  // Regular login/signup form for applicants or employer login
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
          {!isLogin && userType === 'applicant' && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
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
          
          {!isLogin && userType === 'applicant' && (
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
