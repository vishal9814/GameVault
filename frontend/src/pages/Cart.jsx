import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal } = useCart();
  const { checkout, user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    const success = await checkout(cartItems);
    if (success) {
      clearCart();
      navigate('/profile');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-state container">
        <div className="empty-content glass-card">
          <ShoppingBag size={80} className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Go to the store and find some epic games to fill it up!</p>
          <Link to="/" className="btn btn-primary btn-glow">Browse Store</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="cart-title">YOUR SHOPPING CART</h1>
      
      <div className="cart-layout">
        <div className="cart-items-section">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item glass-card">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <div className="cart-item-tags">
                  {item.tags?.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              <div className="cart-item-price">
                <span className="price">${(item.newPrice || item.price).toFixed(2)}</span>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
          
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>Clear All Items</button>
            <Link to="/" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
        
        <aside className="cart-summary-section">
          <div className="summary-card glass-card">
            <h3>ORDER SUMMARY</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (estimated)</span>
              <span>$0.00</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
              PROCEED TO CHECKOUT <ArrowRight size={18} />
            </button>
            
            <p className="checkout-note">
              Transactions are secure and encrypted.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
