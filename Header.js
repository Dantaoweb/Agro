import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions'; // Example of an auth action for logout
import './Header.css'; // Styles for the header

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assume user is the logged-in user's data from the Redux store
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleUploadMedia = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Logic to upload file to the server
      console.log("Media uploaded:", file.name);
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src="/images/logo.png" alt="Platform Logo" />
        </Link>
      </div>

      <nav className="header-nav">
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          
          {user?.role === 'Farmer' && <li><Link to="/farmer/projects">My Projects</Link></li>}
          {user?.role === 'Investor' && <li><Link to="/investor/investments">Investments</Link></li>}
          {user?.role === 'Validator' && <li><Link to="/validator/tasks">Validation Tasks</Link></li>}
          {user?.role === 'Consultant' && <li><Link to="/consultant/reviews">Consultations</Link></li>}
          {user?.role === 'Admin' && <li><Link to="/admin/panel">Admin Panel</Link></li>}

          {/* Partner specific navigation */}
          {user?.role === 'Partner' && (
            <>
              <li><Link to="/partner/overview">Partner Overview</Link></li>
              <li><Link to="/partner/reports">Partner Reports</Link></li>
            </>
          )}
          
          {/* Buyer specific navigation */}
          {user?.role === 'Buyer' && <li><Link to="/buyer/orders">My Orders</Link></li>}
          
          {/* Guard/Worker specific navigation */}
          {user?.role === 'Guard' && <li><Link to="/guard/tasks">Guard Tasks</Link></li>}
          {user?.role === 'Worker' && <li><Link to="/worker/tasks">Worker Tasks</Link></li>}
        </ul>
      </nav>

      <div className="header-actions">
        <label htmlFor="mediaUpload" className="media-upload-btn">
          <span>Upload Media</span>
          <input
            type="file"
            id="mediaUpload"
            style={{ display: 'none' }}
            accept="image/*,video/*"
            onChange={handleUploadMedia}
          />
        </label>

        <div className="profile-section">
          <Link to="/profile">
            <img
              src={user?.profileImage || '/images/default-avatar.png'}
              alt="Profile"
              className="profile-icon"
            />
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;