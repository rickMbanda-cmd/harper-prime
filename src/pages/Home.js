import React from 'react';

import heroImg from '../assets/hero.jpg';
import logo from '../assets/whitlog.png';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          width: '100%',
          minHeight: '100vh',
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          position: 'relative',
        }}
      >
        <div style={{
          background: 'rgba(0,0,0,0.5)',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '600px',
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>
            Welcome to Harper & Whitman Global Solutions
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
            Discover top opportunities and connect with leading employers on Harper & Whitman Global Solutions.
          </p>
          <button style={{
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '8px',
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
          }}>
            Get Started
          </button>
        </div>
      </section>

      {/* Job Search Bar */}
      <section style={{
        padding: '2rem 0',
        background: 'linear-gradient(90deg, #e3f0ff 60%, #b6d0f7 100%)', // soft blue gradient
        textAlign: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <input
          type="text"
          placeholder="Search jobs by title, location, or category..."
          style={{
            width: '60%',
            maxWidth: '500px',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid #cbd5e1',
            fontSize: '1rem',
            marginRight: '1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}
        />
        <button style={{
          padding: '1rem 2rem',
          borderRadius: '12px',
          border: 'none',
          background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
        }}>
          Search
        </button>
      </section>

      {/* Featured Jobs */}
      <section style={{
        padding: '2.5rem 0',
        background: 'linear-gradient(90deg, #dbeafe 60%, #93c5fd 100%)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 700, color: '#2563eb', letterSpacing: '1px', fontSize: '2rem' }}>Featured Jobs</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {[1,2,3].map((job) => (
            <div key={job} style={{
              background: 'linear-gradient(135deg, #e0e7ef 60%, #f7fafc 100%)',
              borderRadius: '20px',
              padding: '2rem',
              minHeight: '260px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              border: '1px solid #e0e7ef',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.10)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
            }}
            >
              <div>
                <h3 style={{ marginBottom: '0.75rem', color: '#1e40af', fontWeight: 700, fontSize: '1.25rem' }}>Job Title {job}</h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', gap: '0.5rem' }}>
                  <span style={{ color: '#2563eb', fontWeight: 500 }}>Company Name</span>
                  <span style={{ color: '#64748b', fontSize: '0.95rem' }}>| Location</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1.25rem' }}>Short job description goes here. Highlight key responsibilities or perks.</p>
              </div>
              <button style={{
                padding: '0.65rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                alignSelf: 'flex-end',
              }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{
        padding: '2.5rem 0',
        background: 'linear-gradient(90deg, #e0e7ef 60%, #c7d2fe 100%)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        borderBottom: '1px solid #e2e8f0',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 700, color: '#2563eb', letterSpacing: '1px', fontSize: '2rem' }}>How It Works</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {[
            { label: 'Register', icon: '📝', desc: 'Create your free account and set up your profile.' },
            { label: 'Search', icon: '🔍', desc: 'Browse thousands of jobs tailored to your skills.' },
            { label: 'Apply/Post', icon: '📤', desc: 'Apply for jobs or post openings as an employer.' },
            { label: 'Connect', icon: '🤝', desc: 'Engage with top companies and candidates.' }
          ].map((step, idx) => (
            <div key={step.label} style={{
              background: 'linear-gradient(135deg, #fff 60%, #e0e7ef 100%)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              minHeight: '220px',
              boxShadow: '0 4px 16px rgba(37,99,235,0.08)',
              textAlign: 'center',
              marginBottom: '1rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid #e0e7ef',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.12)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.08)';
            }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #c7d2fe 60%, #e0e7ef 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1rem auto',
                boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              }}>
                {step.icon}
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2563eb', letterSpacing: '1px' }}>{idx+1}. {step.label}</span>
              <p style={{ margin: '1rem 0 0.5rem 0', color: '#64748b', fontSize: '0.98rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits/Features */}
      <section style={{ padding: '2.5rem 0', background: 'linear-gradient(90deg, #e0f2fe 60%, #bae6fd 100%)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontWeight: 700, fontSize: '2rem', color: '#2563eb', letterSpacing: '1px' }}>Why Choose Us?</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'stretch',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {[
            { label: 'Easy Application', icon: '⚡', desc: 'Apply for jobs quickly with a streamlined process.' },
            { label: 'Verified Employers', icon: '✔️', desc: 'Work with trusted and vetted companies only.' },
            { label: 'Secure Payments', icon: '🔒', desc: 'Enjoy safe and reliable payment options.' },
            { label: 'Responsive Support', icon: '💬', desc: 'Get help whenever you need it from our team.' }
          ].map((benefit) => (
            <div key={benefit.label} style={{
              background: 'linear-gradient(135deg, #fff 60%, #e0e7ef 100%)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              minHeight: '180px',
              boxShadow: '0 4px 16px rgba(37,99,235,0.08)',
              textAlign: 'center',
              marginBottom: '1rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid #e0e7ef',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.04)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.12)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.08)';
            }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #bae6fd 60%, #e0e7ef 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.7rem',
                margin: '0 auto 1rem auto',
                boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              }}>
                {benefit.icon}
              </div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2563eb', fontWeight: 700 }}>{benefit.label}</h4>
              <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: 0 }}>{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '2rem 0', background: 'linear-gradient(90deg, #f1f5f9 60%, #dbeafe 100%)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 700 }}>Testimonials</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[{name:'Jane Doe',text:'This platform helped me land my dream job!'}, {name:'John Smith',text:'Great experience for employers and candidates.'}].map((testimonial) => (
            <div key={testimonial.name} style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              minWidth: '250px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              textAlign: 'center',
              marginBottom: '1rem',
            }}>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "{testimonial.text}"
              </p>
              <span style={{ fontWeight: 700 }}>{testimonial.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Company Logos */}
      <section style={{ padding: '2rem 0', background: 'linear-gradient(90deg, #e0e7ef 60%, #93c5fd 100%)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontWeight: 700 }}>Companies Hiring</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[1,2,3,4].map((logo) => (
            <div key={logo} style={{
              background: '#f1f5f9',
              borderRadius: '12px',
              padding: '2rem',
              minWidth: '120px',
              minHeight: '80px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              textAlign: 'center',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: '#64748b'
            }}>
              Logo {logo}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#e2e8f0', color: '#222', padding: '2rem 0', textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="Company Logo" style={{ height: '48px', marginBottom: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
          &copy; {new Date().getFullYear()} Harper & Whitman Global Solutions. All rights reserved.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/about" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>About Us</a>
          <a href="/contact" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 500 }}>Contact Us</a>
          <a href="#" style={{ color: '#a0aec0', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
