import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to GameVault</h1>
          <p>Your ultimate destination for discovering and playing the best games.</p>
          {!user && (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">Join GameVault</Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="featured-section container">
        <div className="section-header">
          <h2>FEATURED & RECOMMENDED</h2>
        </div>
        
        <div className="featured-grid">
          {/* Mock Featured Games */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="game-card">
              <div className="game-image-placeholder">
                <span className="placeholder-text">Game Image</span>
              </div>
              <div className="game-info">
                <h3>Awesome Game {i}</h3>
                <div className="game-tags">
                  <span className="tag">Action</span>
                  <span className="tag">Adventure</span>
                </div>
                <div className="game-price-row">
                  {i % 2 === 0 ? (
                    <div className="price-tag sale">
                      <span className="sale-pct">-50%</span>
                      <div className="price-col">
                        <span className="old-price">$59.99</span>
                        <span className="new-price">$29.99</span>
                      </div>
                    </div>
                  ) : (
                    <div className="price-tag normal">
                      <span>$39.99</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
