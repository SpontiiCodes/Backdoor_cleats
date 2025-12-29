import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/bdc.jpeg';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) return;
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
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
          <h1 className="text-4xl font-bold mb-8 text-white">Shopping Cart</h1>
          {cart.length === 0 ? (
            <p className="text-center text-white">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h2 className="text-xl text-white">{item.name}</h2>
                        <p className="text-white">Size: {item.size}</p>
                        <p className="text-white">R{item.price}</p>
                        <input type="number" value={item.quantity} onChange={(e) => updateQuantity(index, parseInt(e.target.value))} className="bg-gray-700 text-white p-2 rounded w-20" min="1" />
                      </div>
                    </div>
                    <button onClick={() => removeItem(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove</button>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-right">
                <p className="text-2xl text-white">Total: R{total.toFixed(2)}</p>
                <Link to="/checkout" className="bg-neon-green text-black px-6 py-3 rounded font-bold hover:bg-green-400 transition inline-block mt-4">Checkout</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;