import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    const success = await register(name, email, password, role);
    if (success) {
      navigate('/');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-background-overlay"></div>
      <div className="auth-container">
        <div className="auth-card register-card">
          <h1 className="auth-title">Create Your Account</h1>
          
          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="input-group">
              <label className="input-label">FULL NAME</label>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">EMAIL ADDRESS</label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="input-group half-width">
                <label className="input-label">PASSWORD</label>
                <input
                  type="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group half-width">
                <label className="input-label">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  className="input-field"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">I WANT TO BE A</label>
              <div className="role-toggle">
                <button 
                  type="button"
                  className={`role-btn ${role === 'customer' ? 'active' : ''}`}
                  onClick={() => setRole('customer')}
                >
                  <span className="role-icon">🛒</span> Customer
                </button>
                <button 
                  type="button"
                  className={`role-btn ${role === 'seller' ? 'active' : ''}`}
                  onClick={() => setRole('seller')}
                >
                  <span className="role-icon">🏪</span> Seller
                </button>
              </div>
            </div>

            <div className="auth-actions register-actions">
              <button 
                type="submit" 
                className="btn btn-primary btn-large"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
            
            <div className="terms-text">
              By creating an account, you agree to the GameVault Subscriber Agreement and Privacy Policy.
            </div>
            
            <div className="login-prompt">
              Already have an account? <Link to="/login">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
