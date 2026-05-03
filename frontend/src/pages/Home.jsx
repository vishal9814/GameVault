import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const games = [
    { id: 101, title: "Elden Ring", price: 59.99, image: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/aajm8sYvSByBy9onUvGubU9w.png", tags: ["Action", "RPG"] },
    { id: 102, title: "Cyberpunk 2077", price: 59.99, newPrice: 29.99, image: "https://static-cdn.jtvnw.net/ttv-boxart/21393_IGDB-272x380.jpg", tags: ["RPG", "Open World"], sale: true },
    { id: 103, title: "God of War Ragnarok", price: 69.99, image: "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4YpY7V7vD9u0X0vXvXvXvXvX.png", tags: ["Action", "Adventure"] },
    { id: 104, title: "Hades II", price: 29.99, image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/header.jpg", tags: ["Roguelike", "Action"] },
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to GameVault</h1>
          <p className="hero-description">Discover the most immersive digital experiences in the multiverse.</p>
          {!user && (
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-glow">Join GameVault</Link>
            </div>
          )}
        </div>
      </div>
      
      <div className="featured-section container">
        <div className="section-header">
          <h2 className="neon-text">FEATURED & RECOMMENDED</h2>
        </div>
        
        <div className="featured-grid">
          {games.map((game) => (
            <div key={game.id} className="game-card glass-card">
              <div className="game-image-container">
                <img src={game.image} alt={game.title} className="game-image" />
                {game.sale && <span className="sale-badge">SALE</span>}
              </div>
              <div className="game-info">
                <h3>{game.title}</h3>
                <div className="game-tags">
                  {game.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
                <div className="game-footer">
                  <div className="game-price-row">
                    {game.newPrice ? (
                      <div className="price-tag sale">
                        <span className="sale-pct">-{Math.round((1 - game.newPrice/game.price)*100)}%</span>
                        <div className="price-col">
                          <span className="old-price">${game.price}</span>
                          <span className="new-price">${game.newPrice}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="price-tag normal">
                        <span>${game.price}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(game)}
                  >
                    Add to Cart
                  </button>
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
