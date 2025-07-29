import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/whitlog.png';

function Navbar() {
  return (
    <nav style={{
      padding: '0.75rem 2rem',
      background: 'linear-gradient(90deg, #e2e8ee 60%, #cbd5e1 100%)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      borderBottom: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logo} alt="Logo" style={{ height: '96px', width: 'auto', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }} />
      </Link>
      <ul style={{
        display: 'flex',
        gap: '2rem',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        fontSize: '1.15rem',
        fontWeight: 500
      }}>
        <li><Link to="/" style={navLinkStyle}>Home</Link></li>
        <li><Link to="/jobs" style={navLinkStyle}>Job Listings</Link></li>
        <li><Link to="/company-profile" style={navLinkStyle}>Company Profile</Link></li>
        <li><Link to="/about" style={navLinkStyle}>About Us</Link></li>
        <li><Link to="/contact" style={navLinkStyle}>Contact Us</Link></li>
      </ul>
    </nav>
  );
}

const navLinkStyle = {
  color: '#2d3748',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'background 0.2s, color 0.2s',
  fontWeight: 500,
  fontFamily: 'inherit',
  display: 'inline-block',
};

// Add hover effect using a style tag
const style = document.createElement('style');
style.innerHTML = `
  .navbar-link:hover {
    background: #e2e8f0;
    color: #2563eb;
    text-decoration: none;
  }
`;
document.head.appendChild(style);

export default Navbar;
