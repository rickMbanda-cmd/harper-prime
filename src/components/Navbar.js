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
        <li><Link to="/" style={navLinkStyle} className="navbar-link">Home</Link></li>
        <li><Link to="/jobs" style={navLinkStyle} className="navbar-link">Job Listings</Link></li>
        <li><Link to="/company-profile" style={navLinkStyle} className="navbar-link">Company Profile</Link></li>
        <li><Link to="/about" style={navLinkStyle} className="navbar-link">About Us</Link></li>
        <li><Link to="/contact" style={navLinkStyle} className="navbar-link">Contact Us</Link></li>
      </ul>
    </nav>
  );
}

const navLinkStyle = {
  color: '#2d3748',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  fontWeight: 500,
  fontFamily: 'inherit',
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
};

// Add hover effect using a style tag
const style = document.createElement('style');
style.innerHTML = `
  .navbar-link {
    position: relative;
    overflow: hidden;
  }

  .navbar-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .navbar-link:hover {
    background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    color: #2563eb;
    text-decoration: none;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
  }

  .navbar-link:hover::before {
    left: 100%;
  }

  .navbar-link:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

export default Navbar;