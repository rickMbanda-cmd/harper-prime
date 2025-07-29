import React from 'react';
import './Home.css';
import heroImg from '../assets/hero.jpg';
import logo from '../assets/whitlog.png';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="hero-section"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Harper & Whitman Global Solutions
          </h1>
          <p className="hero-subtitle">
            Discover top opportunities and connect with leading employers on Harper & Whitman Global Solutions.
          </p>
          <button className="hero-button">
            Get Started
          </button>
        </div>
      </section>

      {/* Job Search Bar */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search jobs by title, location, or category..."
          className="search-input"
        />
        <button className="search-button">
          Search
        </button>
      </section>

      {/* Featured Jobs */}
      <section className="section section-featured">
        <h2 className="section-title">Featured Jobs</h2>
        <div className="grid-container">
          {[1,2,3].map((job) => (
            <div key={job} className="job-card">
              <div>
                <h3 className="job-title">Job Title {job}</h3>
                <div className="job-company">
                  <span className="company-name">Company Name</span>
                  <span className="company-location">| Location</span>
                </div>
                <p className="job-description">Short job description goes here. Highlight key responsibilities or perks.</p>
              </div>
              <button className="job-button">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="grid-container-small">
          {[
            { label: 'Register', icon: '📝', desc: 'Create your free account and set up your profile.' },
            { label: 'Search', icon: '🔍', desc: 'Browse thousands of jobs tailored to your skills.' },
            { label: 'Apply/Post', icon: '📤', desc: 'Apply for jobs or post openings as an employer.' },
            { label: 'Connect', icon: '🤝', desc: 'Engage with top companies and candidates.' }
          ].map((step, idx) => (
            <div key={step.label} className="step-card">
              <div className="step-icon">
                {step.icon}
              </div>
              <span className="step-label">{idx+1}. {step.label}</span>
              <p className="step-description">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits/Features */}
      <section className="section section-benefits">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="grid-container-small">
          {[
            { label: 'Easy Application', icon: '⚡', desc: 'Apply for jobs quickly with a streamlined process.' },
            { label: 'Verified Employers', icon: '✔️', desc: 'Work with trusted and vetted companies only.' },
            { label: 'Secure Payments', icon: '🔒', desc: 'Enjoy safe and reliable payment options.' },
            { label: 'Responsive Support', icon: '💬', desc: 'Get help whenever you need it from our team.' }
          ].map((benefit) => (
            <div key={benefit.label} className="benefit-card">
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h4 className="benefit-title">{benefit.label}</h4>
              <p className="benefit-description">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-testimonials">
        <h2 className="section-title testimonials-title">Testimonials</h2>
        <div className="testimonials-container">
          {[{name:'Jane Doe',text:'This platform helped me land my dream job!'}, {name:'John Smith',text:'Great experience for employers and candidates.'}].map((testimonial) => (
            <div key={testimonial.name} className="testimonial-card">
              <p className="testimonial-text">
                "{testimonial.text}"
              </p>
              <span className="testimonial-author">{testimonial.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Company Logos */}
      <section className="section-companies">
        <h2 className="section-title companies-title">Companies Hiring</h2>
        <div className="companies-container">
          {[1,2,3,4].map((logo) => (
            <div key={logo} className="company-logo">
              Logo {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <img src={logo} alt="Company Logo" className="footer-logo" />
          &copy; {new Date().getFullYear()} Harper & Whitman Global Solutions. All rights reserved.
        </div>
        <div className="footer-links">
          <a href="/about" className="footer-link">About Us</a>
          <a href="/contact" className="footer-link">Contact Us</a>
          <a href="/privacy" className="footer-link footer-link-muted">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;