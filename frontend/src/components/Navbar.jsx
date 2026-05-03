import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User as UserIcon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            GAME<span>VAULT</span>
          </Link>
          <nav className="navbar-links">
            <Link to="/">STORE</Link>
            <Link to="/community">COMMUNITY</Link>
            <Link to="/about">ABOUT</Link>
          </nav>
        </div>

        <div className="navbar-right">
          {!user ? (
            <div className="auth-buttons">
              <Link to="/login" className="nav-btn">Login</Link>
              <span className="divider">|</span>
              <Link to="/register" className="nav-btn">Register</Link>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/cart" className="cart-icon">
                <ShoppingCart size={20} />
                <span className="cart-badge">0</span>
              </Link>
              
              <div className="avatar-dropdown">
                <div className="avatar-circle">
                  <UserIcon size={18} />
                </div>
                <span className="username">{user.name} ▾</span>
                <div className="dropdown-content">
                  <Link to="/profile">Profile</Link>
                  <Link to="/library">My Library</Link>
                  <button onClick={logout} className="logout-btn">Sign Out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
