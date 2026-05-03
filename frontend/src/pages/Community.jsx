import './Community.css';

const Community = () => {
  const discussions = [
    { id: 1, title: "Is Cyberpunk 2077 finally fixed?", author: "V_Nomad", replies: 124, tag: "Discussion" },
    { id: 2, title: "Upcoming Sale: Summer Vault 2024", author: "GameVault_Team", replies: 890, tag: "Announcement" },
    { id: 3, title: "Best indie games under $10", author: "PixelLover", replies: 45, tag: "Recommendations" },
    { id: 4, title: "Looking for a squad in Apex Legends", author: "WraithMain99", replies: 12, tag: "Social" },
  ];

  return (
    <div className="community-page">
      <div className="community-header">
        <div className="container">
          <h1 className="neon-title">COMMUNITY HUB</h1>
          <p className="subtitle">Connect. Share. Play.</p>
        </div>
      </div>

      <div className="community-grid container">
        <aside className="community-sidebar">
          <div className="glass-card sidebar-card">
            <h3>TRENDING GROUPS</h3>
            <ul className="group-list">
              <li><span>#</span> FPS Legends</li>
              <li><span>#</span> RPG Explorers</li>
              <li><span>#</span> Speedrunners</li>
              <li><span>#</span> Dev Corner</li>
            </ul>
          </div>
          
          <div className="glass-card sidebar-card join-card">
            <h3>BECOME A CONTRIBUTOR</h3>
            <p>Earn unique badges and early access to sales.</p>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </aside>

        <main className="community-main">
          <div className="feed-header">
            <h2>TOP DISCUSSIONS</h2>
            <button className="btn btn-primary">Start Discussion</button>
          </div>

          <div className="discussion-list">
            {discussions.map(disc => (
              <div key={disc.id} className="discussion-item glass-card">
                <div className="disc-meta">
                  <span className={`tag tag-${disc.tag.toLowerCase()}`}>{disc.tag}</span>
                  <span className="author">Posted by {disc.author}</span>
                </div>
                <h3>{disc.title}</h3>
                <div className="disc-footer">
                  <span className="replies">{disc.replies} Replies</span>
                  <button className="join-disc">Join Discussion →</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;
