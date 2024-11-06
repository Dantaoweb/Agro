import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Custom CSS for styling

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="home-link">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;