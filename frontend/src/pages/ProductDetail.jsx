import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../assets/bdc.jpeg';

const mockProducts = [
  {
    id: 1,
    name: 'Nike Mercurial Superfly 9 Elite',
    category: 'boots',
    price: 299.99,
    sizes: ['7','8','9','10','11'],
    stock: 20,
    image_url: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Experience unparalleled speed and agility with the Nike Mercurial Superfly 9 Elite. Designed for elite players who demand the best in performance and style.'
  },
  {
    id: 2,
    name: 'Adidas Predator Accuracy+',
    category: 'boots',
    price: 249.99,
    sizes: ['7','8','9','10','11'],
    stock: 15,
    image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Control the game with precision. The Adidas Predator Accuracy+ features innovative technology for superior ball control and power.'
  },
  {
    id: 3,
    name: 'Puma Future Z 1.4',
    category: 'boots',
    price: 229.99,
    sizes: ['7','8','9','10','11'],
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Step into the future of football with Puma Future Z 1.4. Lightweight and responsive for the modern player.'
  },
  {
    id: 4,
    name: 'Barcelona Home Jersey 2024',
    category: 'jerseys',
    price: 89.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 25,
    image_url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Show your support for FC Barcelona with the official 2024 home jersey. Classic stripes and premium quality.'
  },
  {
    id: 5,
    name: 'Real Madrid Away Jersey 2024',
    category: 'jerseys',
    price: 94.99,
    sizes: ['S','M','L','XL','XXL'],
    stock: 22,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Represent Real Madrid in style with the 2024 away jersey. Sleek design and comfortable fit.'
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://backdoor-cleats.onrender.com/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => {
        console.error(error);
        // Use mock data if API fails
        const mockProduct = mockProducts.find(p => p.id === parseInt(id));
        setProduct(mockProduct);
      });
  }, [id]);

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        quantity,
        image_url: product.image_url
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  if (!product) return <div className="text-center py-8 text-white">Loading...</div>;

  return (
    <div 
      className="min-h-screen bg-gray-900 bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%'
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-8 text-white">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img src={product.image_url} alt={product.name} className="w-full h-96 object-cover" />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-4xl font-bold mb-4 text-black">{product.name}</h1>
                <p className="text-3xl font-semibold mb-4 text-gray-700">${product.price}</p>
                <p className="mb-6 text-gray-600">{product.description}</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-green">
                    <option value="">Select Size</option>
                    {product.sizes.map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} min="1" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neon-green" />
                </div>
                <button onClick={addToCart} className="w-full bg-neon-green text-black py-3 px-6 rounded-md font-bold text-lg hover:bg-green-400 transition">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;