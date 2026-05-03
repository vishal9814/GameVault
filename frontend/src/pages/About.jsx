import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-glow"></div>
        <div className="hero-container">
          <h1 className="glitch-text" data-text="GAMEVAULT">GAMEVAULT</h1>
          <p className="hero-subtitle">The Future of Gaming Commerce</p>
        </div>
      </div>

      <div className="about-content container">
        <section className="about-section glass-card">
          <h2>OUR MISSION</h2>
          <p>
            GameVault was founded with a single vision: to create a decentralized, 
            fair, and visually stunning marketplace for gamers by gamers. We believe 
            that the digital gaming experience should be as immersive outside the 
            game as it is inside.
          </p>
          <div className="mission-grid">
            <div className="mission-item">
              <span className="mission-icon">🚀</span>
              <h3>Innovation</h3>
              <p>Pushing the boundaries of web design and user experience.</p>
            </div>
            <div className="mission-item">
              <span className="mission-icon">🛡️</span>
              <h3>Security</h3>
              <p>Top-tier encryption and real authentication for every transaction.</p>
            </div>
            <div className="mission-item">
              <span className="mission-icon">👥</span>
              <h3>Community</h3>
              <p>Built on the feedback and passion of millions of players.</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card glass-card">
            <span className="stat-value">5M+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="stat-card glass-card">
            <span className="stat-value">50K+</span>
            <span className="stat-label">Games Listed</span>
          </div>
          <div className="stat-card glass-card">
            <span className="stat-value">24/7</span>
            <span className="stat-label">Premium Support</span>
          </div>
        </section>

        <section className="story-section glass-card">
          <h2>OUR STORY</h2>
          <div className="story-content">
            <p>
              Started in 2024 as a small project to fix the cluttered interfaces of 
              traditional game stores, GameVault evolved into a "Cyber-Aurora" hub. 
              We've integrated state-of-the-art backend systems with a front-end 
              aesthetic that feels like it's from the year 2077.
            </p>
            <div className="aurora-visual"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
