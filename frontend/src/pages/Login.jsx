import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css'; // Shared CSS for Login/Register

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-background-overlay"></div>
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Sign In</h1>
          
          <div className="auth-content">
            <div className="auth-form-section">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label">SIGN IN WITH ACCOUNT NAME OR EMAIL</label>
                  <input
                    type="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="input-group">
                  <label className="input-label">PASSWORD</label>
                  <input
                    type="password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-actions">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </button>
                </div>
                
                <div className="auth-help">
                  <Link to="#">Help, I can't sign in</Link>
                </div>
              </form>
            </div>
            
            <div className="auth-divider">
              <span>OR</span>
            </div>
            
            <div className="auth-social-section">
              <div className="social-login-text">SIGN IN WITH</div>
              <button className="btn-social google-placeholder" type="button">
                Sign in with Google
              </button>
              
              <div className="create-account-prompt">
                Not a member?
                <Link to="/register" className="join-link">Join GameVault</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
