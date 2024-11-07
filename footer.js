// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import styles for the footer component

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Quick Links */}
        <div className="footer-section quick-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
        
        {/* Social Media Links */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        
        {/* Contact Information */}
        <div className="footer-section contact-info">
          <h3>Contact Us</h3>
          <p>Email: support@platform.com</p>
          <p>Phone: +1 234 567 8900</p>
        </div>
        
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AgroCash. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;