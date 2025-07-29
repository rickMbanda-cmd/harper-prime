
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/harperwhitman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ['employer', 'applicant'] },
  fullName: { type: String, required: true },
  phoneNumber: { type: String },
  
  // Employer specific fields
  companyName: { type: String },
  industry: { type: String },
  companyLocation: { type: String },
  companyDescription: { type: String },
  
  // Profile fields
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
});

const User = mongoose.model('User', userSchema);

// Job Schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  department: { type: String },
  description: { type: String, required: true },
  requirements: [String],
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' }
  },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'paused', 'closed'], default: 'active' },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

// Application Schema
const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['new', 'under-review', 'interview-scheduled', 'offered', 'rejected'], 
    default: 'new' 
  },
  coverLetter: String,
  resume: String,
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model('Application', applicationSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Registration endpoint
app.post('/api/auth/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/),
  body('fullName').notEmpty().trim(),
  body('userType').isIn(['employer', 'applicant']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      email, 
      password, 
      fullName, 
      phoneNumber, 
      userType,
      companyName,
      industry,
      companyLocation,
      companyDescription 
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const userData = {
      email,
      password: hashedPassword,
      fullName,
      phoneNumber,
      userType,
    };

    // Add employer-specific fields if userType is employer
    if (userType === 'employer') {
      userData.companyName = companyName;
      userData.industry = industry;
      userData.companyLocation = companyLocation;
      userData.companyDescription = companyDescription;
    }

    const newUser = new User(userData);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        email: newUser.email, 
        userType: newUser.userType 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data (without password)
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      userType: newUser.userType,
      phoneNumber: newUser.phoneNumber,
      companyName: newUser.companyName,
      industry: newUser.industry,
      companyLocation: newUser.companyLocation,
      companyDescription: newUser.companyDescription,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login endpoint
app.post('/api/auth/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        userType: user.userType 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return user data (without password)
    const userResponse = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      userType: user.userType,
      phoneNumber: user.phoneNumber,
      companyName: user.companyName,
      industry: user.industry,
      companyLocation: user.companyLocation,
      companyDescription: user.companyDescription,
      lastLogin: user.lastLogin
    };

    res.json({
      message: 'Login successful',
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const allowedUpdates = ['fullName', 'phoneNumber', 'companyName', 'industry', 'companyLocation', 'companyDescription'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Job management endpoints
app.post('/api/jobs', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs' });
    }

    const employer = await User.findById(req.user.userId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    const jobData = {
      ...req.body,
      company: employer.companyName,
      employerId: req.user.userId
    };

    const newJob = new Job(jobData);
    await newJob.save();

    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get jobs for employer
app.get('/api/jobs/employer', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const jobs = await Job.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs (for job seekers)
app.get('/api/jobs', async (req, res) => {
  try {
    const { page = 1, limit = 10, location, type, search } = req.query;
    const query = { status: 'active' };

    if (location) query.location = new RegExp(location, 'i');
    if (type) query.type = type;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') }
      ];
    }

    const jobs = await Job.find(query)
      .populate('employerId', 'companyName companyLocation')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Apply for job
app.post('/api/jobs/:jobId/apply', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'applicant') {
      return res.status(403).json({ message: 'Only job seekers can apply for jobs' });
    }

    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId: req.params.jobId,
      applicantId: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      jobId: req.params.jobId,
      applicantId: req.user.userId,
      employerId: job.employerId,
      coverLetter: req.body.coverLetter,
      resume: req.body.resume
    });

    await application.save();

    // Add application to job
    job.applications.push(application._id);
    await job.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for employer
app.get('/api/applications/employer', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find({ employerId: req.user.userId })
      .populate('applicantId', 'fullName email phoneNumber')
      .populate('jobId', 'title department location')
      .sort({ appliedAt: -1 });

    res.json({ applications });
  } catch (error) {
    console.error('Applications fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for job seeker
app.get('/api/applications/applicant', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'applicant') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const applications = await Application.find({ applicantId: req.user.userId })
      .populate('jobId', 'title company location type')
      .populate('employerId', 'companyName')
      .sort({ appliedAt: -1 });

    res.json({ applications });
  } catch (error) {
    console.error('Applications fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (employer only)
app.put('/api/applications/:applicationId/status', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Only employers can update application status' });
    }

    const { status } = req.body;
    const validStatuses = ['new', 'under-review', 'interview-scheduled', 'offered', 'rejected'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findOneAndUpdate(
      { _id: req.params.applicationId, employerId: req.user.userId },
      { status, updatedAt: new Date() },
      { new: true }
    ).populate('applicantId', 'fullName email')
     .populate('jobId', 'title');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard stats for employer
app.get('/api/dashboard/employer/stats', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const activeJobs = await Job.countDocuments({ employerId: req.user.userId, status: 'active' });
    const totalApplications = await Application.countDocuments({ employerId: req.user.userId });
    const interviewsScheduled = await Application.countDocuments({ 
      employerId: req.user.userId, 
      status: 'interview-scheduled' 
    });
    const offersExtended = await Application.countDocuments({ 
      employerId: req.user.userId, 
      status: 'offered' 
    });

    res.json({
      activeJobs,
      totalApplications,
      interviewsScheduled,
      offersExtended
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
