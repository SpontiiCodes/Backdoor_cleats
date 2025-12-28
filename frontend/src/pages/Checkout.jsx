import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/bdc.jpeg';

const Checkout = () => {
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    // Create order
    axios.post('http://localhost:5000/orders', { ...form, items: cart }) // Add cart items
      .then(response => {
        localStorage.removeItem('cart'); // Clear cart
        // Redirect to PayFast
        window.location.href = response.data.paymentUrl;
      })
      .catch(error => {
        console.error(error);
        alert('Order failed. Please try again.');
      });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div 
      className="min-h-screen bg-gray-900 bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%'
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 text-white">
          <h1 className="text-4xl font-bold mb-8 text-white">Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl mb-4 text-white">Order Summary</h2>
              {cart.map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded mb-4">
                  <p className="text-white">{item.name} (Size: {item.size}) x {item.quantity}</p>
                  <p className="text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <p className="text-xl font-bold text-white">Total: ${total.toFixed(2)}</p>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="max-w-md">
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full p-2 mb-4 bg-gray-700 text-white rounded" required />
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-2 mb-4 bg-gray-700 text-white rounded" required />
                <textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full p-2 mb-4 bg-gray-700 text-white rounded" required />
                <button type="submit" className="bg-neon-green text-black px-6 py-3 rounded font-bold w-full hover:bg-green-400 transition">Pay with PayFast</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;